using BookTour.Dto.Common;
using BookTour.Dto.Response;
using BookTour.Dto.Request;
using BookTour.Models;
using BookTour.Repository;
using Microsoft.AspNetCore.Http;
using System.IO;
using BookTour.Repository.Impl;
using Microsoft.AspNetCore.Http.HttpResults;

namespace BookTour.Service.Impl
{
    public class DestinationService : IDestinationService
    {
        private readonly IDestinationRepository _destinationRepository;
        private readonly ICityRepository _cityRepository;

        public DestinationService(IDestinationRepository destinationRepository, ICityRepository cityRepository)
        {
            _destinationRepository = destinationRepository;
            _cityRepository = cityRepository;
        }

        public async Task<ApiResponse<List<DestinationListResponse>>> GetAllDestinationsAsync()
        {
            try
            {
                var destinations = await _destinationRepository.GetAllDestinationsAsync();
                var response = destinations.Select(MapToDestinationListResponse).ToList();
                return ApiResponse<List<DestinationListResponse>>.SuccessResponse(response);
            }
            catch (Exception ex)
            {
                return ApiResponse<List<DestinationListResponse>>.ErrorResponse($"Lỗi khi lấy danh sách điểm đến: {ex.Message}");
            }
        }

        public async Task<ApiResponse<List<DestinationListResponse>>> GetFeaturedDestinationsAsync()
        {
            try
            {
                var destinations = await _destinationRepository.GetFeaturedDestinationsAsync();
                var response = destinations.Select(MapToDestinationListResponse).ToList();
                return ApiResponse<List<DestinationListResponse>>.SuccessResponse(response);
            }
            catch (Exception ex)
            {
                return ApiResponse<List<DestinationListResponse>>.ErrorResponse($"Lỗi khi lấy danh sách điểm đến nổi bật: {ex.Message}");
            }
        }

        public async Task<ApiResponse<DestinationDetailResponse>> GetDestinationByIdAsync(int id)
        {
            try
            {
                var destination = await _destinationRepository.GetDestinationByIdAsync(id);
                if (destination == null)
                {
                    return ApiResponse<DestinationDetailResponse>.ErrorResponse("Điểm đến không tồn tại");
                }

                var response = MapToDestinationDetailResponse(destination);
                return ApiResponse<DestinationDetailResponse>.SuccessResponse(response);
            }
            catch (Exception ex)
            {
                return ApiResponse<DestinationDetailResponse>.ErrorResponse($"Lỗi khi lấy chi tiết điểm đến: {ex.Message}");
            }
        }

        public async Task<ApiResponse<List<DestinationListResponse>>> GetDestinationsByCityIdAsync(int cityId)
        {
            try
            {
                var destinations = await _destinationRepository.GetDestinationsByCityIdAsync(cityId);
                var response = destinations.Select(MapToDestinationListResponse).ToList();
                return ApiResponse<List<DestinationListResponse>>.SuccessResponse(response);
            }
            catch (Exception ex)
            {
                return ApiResponse<List<DestinationListResponse>>.ErrorResponse($"Lỗi khi lấy danh sách điểm đến theo thành phố: {ex.Message}");
            }
        }

        public async Task<ApiResponse<DestinationDetailResponse>> AddDestinationAsync(CreateDestinationRequest request, string imagePathRoot)
        {
            try
            {
                // Validate city exists
                var city = await _cityRepository.GetCityByIdAsync(request.CityId);
                if (city == null)
                {
                    return ApiResponse<DestinationDetailResponse>.ErrorResponse("Thành phố không tồn tại");
                }

                // Create destination
                var destination = new Destination
                {
                    DestinationName = request.DestinationName,
                    Description = request.Description,
                    CityId = request.CityId,
                    IsFeatured = request.IsFeatured,
                    IsActive = true,
                    DestinationImages = new List<DestinationImage>(),
                    DestinationDetails = new List<DestinationDetail>()
                };

                var createdDestination = await _destinationRepository.AddDestinationAsync(destination);

                // Get updated destination with all relations
                var updatedDestination = await _destinationRepository.GetDestinationByIdAsync(createdDestination.DestinationId);
                var response = MapToDestinationDetailResponse(updatedDestination);
                return ApiResponse<DestinationDetailResponse>.SuccessResponse(response, "Thêm điểm đến thành công");
            }
            catch (Exception ex)
            {
                return ApiResponse<DestinationDetailResponse>.ErrorResponse($"Lỗi khi thêm điểm đến: {ex.Message}");
            }
        }

        public async Task<ApiResponse<DestinationDetailResponse>> UpdateDestinationAsync(UpdateDestinationRequest request, string imagePathRoot)
        {
            try
            {
                var destination = await _destinationRepository.GetDestinationByIdAsync(request.DestinationId);
                if (destination == null)
                {
                    return ApiResponse<DestinationDetailResponse>.ErrorResponse("Điểm đến không tồn tại");
                }

                // Validate city exists
                var city = await _cityRepository.GetCityByIdAsync(request.CityId);
                if (city == null)
                {
                    return ApiResponse<DestinationDetailResponse>.ErrorResponse("Thành phố không tồn tại");
                }

                // Update destination
                destination.DestinationName = request.DestinationName;
                destination.Description = request.Description;
                destination.CityId = request.CityId;
                destination.IsFeatured = request.IsFeatured;

                await _destinationRepository.UpdateDestinationAsync(destination);

                // Delete images
                if (request.DeleteImageIds != null)
                {
                    foreach (var imageId in request.DeleteImageIds)
                    {
                        await _destinationRepository.DeleteDestinationImageAsync(imageId);
                    }
                }

                // Add new images
                if (request.NewImages != null && request.NewImages.Any())
                {
                    foreach (var image in request.NewImages)
                    {
                        var fileName = Path.GetFileNameWithoutExtension(image.FileName) + "_" + 
                            Guid.NewGuid().ToString().Substring(0, 8) + Path.GetExtension(image.FileName);
                        var savePath = Path.Combine(imagePathRoot, fileName);
                        using (var stream = new FileStream(savePath, FileMode.Create))
                        {
                            await image.CopyToAsync(stream);
                        }

                        var destinationImage = new DestinationImage
                        {
                            DestinationId = destination.DestinationId,
                            ImageUrl = "/uploads/" + fileName,
                            IsPrimary = !destination.DestinationImages.Any()
                        };

                        await _destinationRepository.AddDestinationImageAsync(destinationImage);
                    }
                }

                // Update details
                if (request.Details != null)
                {
                    // Delete existing details
                    foreach (var detail in destination.DestinationDetails)
                    {
                        await _destinationRepository.DeleteDestinationDetailAsync(detail.DetailId);
                    }

                    // Add new details
                    foreach (var detail in request.Details)
                    {
                        var destinationDetail = new DestinationDetail
                        {
                            DestinationId = destination.DestinationId,
                            FeatureType = detail.FeatureType,
                            FeatureValue = detail.FeatureValue
                        };

                        await _destinationRepository.AddDestinationDetailAsync(destinationDetail);
                    }
                }

                // Get updated destination with all relations
                var updatedDestination = await _destinationRepository.GetDestinationByIdAsync(destination.DestinationId);
                var response = MapToDestinationDetailResponse(updatedDestination);
                return ApiResponse<DestinationDetailResponse>.SuccessResponse(response, "Cập nhật điểm đến thành công");
            }
            catch (Exception ex)
            {
                return ApiResponse<DestinationDetailResponse>.ErrorResponse($"Lỗi khi cập nhật điểm đến: {ex.Message}");
            }
        }

        public async Task<ApiResponse<bool>> DeleteDestinationAsync(int id)
        {
            try
            {
                var result = await _destinationRepository.DeleteDestinationAsync(id);
                if (!result)
                {
                    return ApiResponse<bool>.ErrorResponse("Điểm đến không tồn tại");
                }
                return ApiResponse<bool>.SuccessResponse(true, "Xóa điểm đến thành công");
            }
            catch (Exception ex)
            {
                return ApiResponse<bool>.ErrorResponse($"Lỗi khi xóa điểm đến: {ex.Message}");
            }
        }

        #region Helper Methods
        private DestinationListResponse MapToDestinationListResponse(Destination destination)
        {
            return new DestinationListResponse
            {
                DestinationId = destination.DestinationId,
                DestinationName = destination.DestinationName,
                Description = destination.Description,
                CityId = destination.CityId,
                CityName = destination.City?.CityName ?? string.Empty,
                IsFeatured = destination.IsFeatured,
                PrimaryImageUrl = destination.DestinationImages != null ?
                    (destination.DestinationImages.FirstOrDefault(i => i.IsPrimary)?.ImageUrl ??
                    destination.DestinationImages.FirstOrDefault()?.ImageUrl) : null
            };
        }

        private DestinationDetailResponse MapToDestinationDetailResponse(Destination destination)
        {
            return new DestinationDetailResponse
            {
                DestinationId = destination.DestinationId,
                DestinationName = destination.DestinationName,
                Description = destination.Description,
                CityId = destination.CityId,
                CityName = destination.City?.CityName ?? string.Empty,
                IsFeatured = destination.IsFeatured,
                Images = destination.DestinationImages != null ?
                    destination.DestinationImages.Select(i => new DestinationImageResponse
                    {
                        ImageId = i.ImageId,
                        ImageUrl = i.ImageUrl,
                        IsPrimary = i.IsPrimary
                    }).ToList() : new List<DestinationImageResponse>(),
                imageCover = destination.DestinationImages?.FirstOrDefault()?.ImageUrl,
                Details = destination.DestinationDetails != null ?
                    destination.DestinationDetails.Select(d => new DestinationDetailItemResponse
                    {
                        DetailId = d.DetailId,
                        FeatureType = d.FeatureType,
                        FeatureValue = d.FeatureValue
                    }).ToList() : new List<DestinationDetailItemResponse>(),
                RelatedTours = destination.TourDestinations != null ?
                    destination.TourDestinations
                        .Where(td => td.Tour != null)
                        .Select(td => new TourResponse
                        {
                            TourId = td.Tour.TourId,
                            TourName = td.Tour.TourName,
                            Description = td.Tour.Description,
                            Duration = td.Tour.Duration,
                            Transportation = td.Tour.Transportation,
                            AdultPrice = td.Tour.AdultPrice,
                            ChildPrice = td.Tour.ChildPrice,
                            PrimaryImageUrl = td.Tour.TourImages != null ?
                                (td.Tour.TourImages.FirstOrDefault(i => i.IsPrimary)?.ImageUrl ??
                                 td.Tour.TourImages.FirstOrDefault()?.ImageUrl) : null
                        }).ToList() : new List<TourResponse>()
            };
        }

        #endregion
    }
}