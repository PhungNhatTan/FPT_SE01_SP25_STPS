﻿using STPS_REACT.Server.Dto.Common;
using STPS_REACT.Server.Dto.Request;
using STPS_REACT.Server.Dto.Response;
using STPS_REACT.Server.Models;
using STPS_REACT.Server.Repository;
using Microsoft.EntityFrameworkCore;

namespace STPS_REACT.Server.Service.Impl
{
    public class CustomTourService : ICustomTourService
    {
        private readonly ICustomTourRepository _customTourRepository;
        private readonly IDestinationRepository _destinationRepository;
        private readonly IUserRepository _userRepository;

        public CustomTourService(
            ICustomTourRepository customTourRepository,
            IDestinationRepository destinationRepository,
            IUserRepository userRepository)
        {
            _customTourRepository = customTourRepository;
            _destinationRepository = destinationRepository;
            _userRepository = userRepository;
        }

        public async Task<ApiResponse<List<CustomTourResponse>>> GetAllCustomToursAsync()
        {
            try
            {
                var customTours = await _customTourRepository.GetAllCustomToursAsync();
                var response = customTours.Select(MapToCustomTourResponse).ToList();
                return ApiResponse<List<CustomTourResponse>>.SuccessResponse(response);
            }
            catch (Exception ex)
            {
                return ApiResponse<List<CustomTourResponse>>.ErrorResponse($"Lỗi khi lấy danh sách tour tùy chỉnh: {ex.Message}");
            }
        }

        public async Task<ApiResponse<List<CustomTourResponse>>> GetCustomToursByUserIdAsync(int userId)
        {
            try
            {
                var user = await _userRepository.GetUserByIdAsync(userId);
                if (user == null)
                {
                    return ApiResponse<List<CustomTourResponse>>.ErrorResponse("Người dùng không tồn tại");
                }

                var customTours = await _customTourRepository.GetCustomToursByUserIdAsync(userId);
                var response = customTours.Select(MapToCustomTourResponse).ToList();
                return ApiResponse<List<CustomTourResponse>>.SuccessResponse(response);
            }
            catch (Exception ex)
            {
                return ApiResponse<List<CustomTourResponse>>.ErrorResponse($"Lỗi khi lấy danh sách tour tùy chỉnh của người dùng: {ex.Message}");
            }
        }

        public async Task<ApiResponse<CustomTourResponse>> GetCustomTourByIdAsync(int id)
        {
            try
            {
                var customTour = await _customTourRepository.GetCustomTourByIdAsync(id);
                if (customTour == null)
                {
                    return ApiResponse<CustomTourResponse>.ErrorResponse("Tour tùy chỉnh không tồn tại");
                }

                var response = MapToCustomTourResponse(customTour);
                return ApiResponse<CustomTourResponse>.SuccessResponse(response);
            }
            catch (Exception ex)
            {
                return ApiResponse<CustomTourResponse>.ErrorResponse($"Lỗi khi lấy chi tiết tour tùy chỉnh: {ex.Message}");
            }
        }

        // Hàm trích xuất giá từ chuỗi giá vé
        private decimal ExtractPriceFromString(string priceString)
        {
            if (string.IsNullOrEmpty(priceString))
                return 0;

            // Xử lý trường hợp "Miễn phí"
            if (priceString.ToLower().Contains("miễn phí"))
                return 0;

            // Loại bỏ tất cả ký tự không phải số
            string numericValue = new string(priceString.Where(char.IsDigit).ToArray());

            if (string.IsNullOrEmpty(numericValue))
                return 0;

            return decimal.TryParse(numericValue, out decimal result) ? result : 0;
        }

        // Hàm lấy giá vé từ điểm đến
        private async Task<decimal> GetDestinationPriceAsync(int destinationId)
        {
            try
            {
                var destination = await _destinationRepository.GetDestinationByIdAsync(destinationId);
                if (destination == null)
                    return 0;

                // Tìm chi tiết "Giá vé" trong danh sách chi tiết
                var priceDetail = destination.DestinationDetails?
                    .FirstOrDefault(d => d.FeatureType.ToLower().Contains("giá vé"));

                if (priceDetail != null)
                {
                    return ExtractPriceFromString(priceDetail.FeatureValue);
                }

                // Nếu không tìm thấy giá, sử dụng giá mặc định
                return 250000; // Giá mặc định 250.000 VND
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Lỗi khi lấy giá vé từ điểm đến {destinationId}: {ex.Message}");
                return 250000; // Giá mặc định 250.000 VND
            }
        }

        // Hàm tính tổng giá từ các điểm đến
        private async Task<decimal> CalculateTotalPriceAsync(List<int> destinationIds)
        {
            decimal totalPrice = 0;

            foreach (var destinationId in destinationIds)
            {
                decimal price = await GetDestinationPriceAsync(destinationId);
                totalPrice += price;
                Console.WriteLine($"Điểm đến {destinationId}: {price} VND");
            }

            Console.WriteLine($"Tổng giá: {totalPrice} VND");
            return totalPrice;
        }

        public async Task<ApiResponse<CustomTourResponse>> CreateCustomTourAsync(CreateCustomTourRequest request)
        {
            try
            {
                // Kiểm tra người dùng tồn tại
                var user = await _userRepository.GetUserByIdAsync(request.UserId);
                if (user == null)
                {
                    return ApiResponse<CustomTourResponse>.ErrorResponse("Người dùng không tồn tại");
                }

                // Kiểm tra các điểm đến tồn tại
                foreach (var destinationId in request.DestinationIds)
                {
                    var destination = await _destinationRepository.GetDestinationByIdAsync(destinationId);
                    if (destination == null)
                    {
                        return ApiResponse<CustomTourResponse>.ErrorResponse($"Điểm đến với ID {destinationId} không tồn tại");
                    }
                }

                // Tính tổng giá từ các điểm đến
                decimal totalPrice = await CalculateTotalPriceAsync(request.DestinationIds);

                // Tạo tour tùy chỉnh
                var customTour = new CustomTour
                {
                    UserId = request.UserId,
                    TourName = request.TourName,
                    CreatedDate = DateTime.Now,
                    Status = "Đang tạo",
                    EstimatedPrice = totalPrice // Sử dụng giá tính từ các điểm đến
                };

                var createdTour = await _customTourRepository.CreateCustomTourAsync(customTour);

                // Tạo các điểm đến cho tour
                var customTourDestinations = new List<CustomTourDestination>();
                for (int i = 0; i < request.DestinationIds.Count; i++)
                {
                    customTourDestinations.Add(new CustomTourDestination
                    {
                        CustomTourId = createdTour.CustomTourId,
                        DestinationId = request.DestinationIds[i],
                        OrderNumber = i + 1
                    });
                }

                await _customTourRepository.CreateCustomTourDestinationsAsync(customTourDestinations);

                // Lấy lại tour đã tạo với đầy đủ thông tin
                var loadedTour = await _customTourRepository.GetCustomTourByIdAsync(createdTour.CustomTourId);
                return ApiResponse<CustomTourResponse>.SuccessResponse(MapToCustomTourResponse(loadedTour), "Tạo tour tùy chỉnh thành công");
            }
            catch (Exception ex)
            {
                return ApiResponse<CustomTourResponse>.ErrorResponse($"Lỗi khi tạo tour tùy chỉnh: {ex.Message}");
            }
        }

        public async Task<ApiResponse<CustomTourResponse>> UpdateCustomTourAsync(UpdateCustomTourRequest request)
        {
            try
            {
                var customTour = await _customTourRepository.GetCustomTourByIdAsync(request.CustomTourId);
                if (customTour == null)
                {
                    return ApiResponse<CustomTourResponse>.ErrorResponse("Tour tùy chỉnh không tồn tại");
                }

                // Cập nhật thông tin tour
                if (!string.IsNullOrEmpty(request.TourName))
                {
                    customTour.TourName = request.TourName;
                }

                if (!string.IsNullOrEmpty(request.Status))
                {
                    customTour.Status = request.Status;
                }

                // Cập nhật các điểm đến nếu có
                if (request.DestinationIds != null && request.DestinationIds.Count > 0)
                {
                    // Tính lại tổng giá từ các điểm đến mới
                    decimal totalPrice = await CalculateTotalPriceAsync(request.DestinationIds);
                    customTour.EstimatedPrice = totalPrice;

                    // Xóa các điểm đến cũ
                    await _customTourRepository.DeleteCustomTourDestinationsAsync(customTour.CustomTourId);

                    // Thêm các điểm đến mới
                    var customTourDestinations = new List<CustomTourDestination>();
                    for (int i = 0; i < request.DestinationIds.Count; i++)
                    {
                        customTourDestinations.Add(new CustomTourDestination
                        {
                            CustomTourId = customTour.CustomTourId,
                            DestinationId = request.DestinationIds[i],
                            OrderNumber = i + 1
                        });
                    }

                    await _customTourRepository.CreateCustomTourDestinationsAsync(customTourDestinations);
                }
                else if (request.EstimatedPrice.HasValue)
                {
                    // Nếu không có điểm đến mới nhưng có giá ước tính mới
                    customTour.EstimatedPrice = request.EstimatedPrice;
                }

                var updatedTour = await _customTourRepository.UpdateCustomTourAsync(customTour);

                // Lấy lại tour đã cập nhật với đầy đủ thông tin
                var loadedTour = await _customTourRepository.GetCustomTourByIdAsync(customTour.CustomTourId);
                return ApiResponse<CustomTourResponse>.SuccessResponse(MapToCustomTourResponse(loadedTour), "Cập nhật tour tùy chỉnh thành công");
            }
            catch (Exception ex)
            {
                return ApiResponse<CustomTourResponse>.ErrorResponse($"Lỗi khi cập nhật tour tùy chỉnh: {ex.Message}");
            }
        }

        public async Task<ApiResponse<bool>> DeleteCustomTourAsync(int id)
        {
            try
            {
                var customTour = await _customTourRepository.GetCustomTourByIdAsync(id);
                if (customTour == null)
                {
                    return ApiResponse<bool>.ErrorResponse("Tour tùy chỉnh không tồn tại");
                }

                // Xóa các điểm đến trước
                await _customTourRepository.DeleteCustomTourDestinationsAsync(id);

                // Xóa tour
                var result = await _customTourRepository.DeleteCustomTourAsync(id);
                return ApiResponse<bool>.SuccessResponse(result, "Xóa tour tùy chỉnh thành công");
            }
            catch (Exception ex)
            {
                return ApiResponse<bool>.ErrorResponse($"Lỗi khi xóa tour tùy chỉnh: {ex.Message}");
            }
        }

        #region Helper Methods
        // Hàm định dạng giá tiền
        private string FormatPrice(decimal price)
        {
            return price > 0 ? $"{price.ToString("N0")} VND" : "Miễn phí";
        }

        // Hàm lấy giá vé từ điểm đến (phiên bản đồng bộ)
        private decimal GetDestinationPrice(Destination destination)
        {
            try
            {
                if (destination == null)
                    return 0;

                // Tìm chi tiết "Giá vé" trong danh sách chi tiết
                var priceDetail = destination.DestinationDetails?
                    .FirstOrDefault(d => d.FeatureType.ToLower().Contains("giá vé"));

                if (priceDetail != null)
                {
                    return ExtractPriceFromString(priceDetail.FeatureValue);
                }

                // Nếu không tìm thấy giá, sử dụng giá mặc định
                return 250000; // Giá mặc định 250.000 VND
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Lỗi khi lấy giá vé từ điểm đến: {ex.Message}");
                return 250000; // Giá mặc định 250.000 VND
            }
        }

        private CustomTourResponse MapToCustomTourResponse(CustomTour customTour)
        {
            var destinations = customTour.CustomTourDestinations?
                .OrderBy(ctd => ctd.OrderNumber)
                .Select(ctd =>
                {
                    // Lấy giá của điểm đến
                    decimal price = GetDestinationPrice(ctd.Destination);

                    return new CustomTourDestinationResponse
                    {
                        DestinationId = ctd.DestinationId,
                        DestinationName = ctd.Destination?.DestinationName ?? "Unknown",
                        CityName = ctd.Destination?.City?.CityName ?? "Unknown",
                        OrderNumber = ctd.OrderNumber,
                        Price = price,
                        PriceFormatted = FormatPrice(price)
                    };
                })
                .ToList() ?? new List<CustomTourDestinationResponse>();

            return new CustomTourResponse
            {
                CustomTourId = customTour.CustomTourId,
                UserId = customTour.UserId,
                UserName = customTour.User?.FullName ?? "Unknown",
                TourName = customTour.TourName,
                CreatedDate = customTour.CreatedDate,
                Status = customTour.Status,
                EstimatedPrice = customTour.EstimatedPrice,
                Destinations = destinations
            };
        }
        #endregion
    }
}
