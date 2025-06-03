using BookTour.Dto.Common;
using BookTour.Dto.Request;
using BookTour.Dto.Response;
using BookTour.Models;
using BookTour.Repository;
using Microsoft.EntityFrameworkCore;

namespace BookTour.Service.Impl
{
    public class TourService : ITourService
    {
        private readonly ITourRepository _tourRepository;
        private readonly IEmailService _emailService;
        private readonly BookTourContext _context;

        public TourService(ITourRepository tourRepository, IEmailService emailService, BookTourContext context)
        {
            _tourRepository = tourRepository;
            _emailService = emailService;
            _context = context;
        }

        public async Task<ApiResponse<List<TourResponse>>> GetAllToursAsync()
        {
            try
            {
                var tours = await _tourRepository.GetAllToursAsync();
                var response = tours.Select(MapToTourResponse).ToList();
                return ApiResponse<List<TourResponse>>.SuccessResponse(response);
            }
            catch (Exception ex)
            {
                return ApiResponse<List<TourResponse>>.ErrorResponse($"Lỗi khi lấy danh sách tour: {ex.Message}");
            }
        }

        public async Task<ApiResponse<List<TourResponse>>> GetFeaturedToursAsync()
        {
            try
            {
                var tours = await _tourRepository.GetFeaturedToursAsync();
                var response = tours.Select(MapToTourResponse).ToList();
                return ApiResponse<List<TourResponse>>.SuccessResponse(response);
            }
            catch (Exception ex)
            {
                return ApiResponse<List<TourResponse>>.ErrorResponse($"Lỗi khi lấy danh sách tour nổi bật: {ex.Message}");
            }
        }

        public async Task<ApiResponse<TourDetailResponse>> GetTourByIdAsync(int id)
        {
            try
            {
                var tour = await _tourRepository.GetTourByIdAsync(id);
                if (tour == null)
                {
                    return ApiResponse<TourDetailResponse>.ErrorResponse("Tour không tồn tại");
                }

                var response = MapToTourDetailResponse(tour);
                return ApiResponse<TourDetailResponse>.SuccessResponse(response);
            }
            catch (Exception ex)
            {
                return ApiResponse<TourDetailResponse>.ErrorResponse($"Lỗi khi lấy chi tiết tour: {ex.Message}");
            }
        }



        #region Helper Methods
        private TourResponse MapToTourResponse(Tour tour)
        {
            return new TourResponse
            {
                TourId = tour.TourId,
                TourName = tour.TourName,
                Description = tour.Description,
                Duration = tour.Duration,
                Transportation = tour.Transportation,
                AdultPrice = tour.AdultPrice,
                ChildPrice = tour.ChildPrice,
                //IsFeatured = tour.IsFeatured,
                PrimaryImageUrl = tour.TourImages
                    .FirstOrDefault(i => i.IsPrimary)?.ImageUrl ??
                    tour.TourImages.FirstOrDefault()?.ImageUrl
            };
        }

        private TourDetailResponse MapToTourDetailResponse(Tour tour)
        {
            return new TourDetailResponse
            {
                TourId = tour.TourId,
                TourName = tour.TourName,
                Description = tour.Description,
                Duration = tour.Duration,
                Transportation = tour.Transportation,
                AdultPrice = tour.AdultPrice,
                ChildPrice = tour.ChildPrice,
                IsFeatured = tour.IsFeatured,
                imageCover = tour.TourImages.FirstOrDefault()?.ImageUrl,
                Images = tour.TourImages.Select(i => new TourImageResponse
                {
                    ImageId = i.ImageId,
                    ImageUrl = i.ImageUrl,
                    IsPrimary = i.IsPrimary
                }).ToList(),
                Schedules = tour.TourSchedules.OrderBy(s => s.DayNumber).Select(s => new TourScheduleResponse
                {
                    ScheduleId = s.ScheduleId,
                    DayNumber = s.DayNumber,
                    Description = s.Description,
                    Activities = s.Activities
                }).ToList(),
                Destinations = tour.TourDestinations.OrderBy(td => td.OrderNumber).Select(td => new DestinationResponse
                {
                    DestinationId = td.Destination.DestinationId,
                    DestinationName = td.Destination.DestinationName,
                    Description = td.Destination.Description,
                    PrimaryImageUrl = td.Destination.DestinationImages
                        .FirstOrDefault(i => i.IsPrimary)?.ImageUrl ??
                        td.Destination.DestinationImages.FirstOrDefault()?.ImageUrl
                }).ToList(),
                Reviews = tour.Reviews.OrderByDescending(r => r.ReviewDate).Select(r => new ReviewResponse
                {
                    ReviewId = r.ReviewId,
                    UserName = r.User.FullName,
                    Rating = r.Rating,
                    Comment = r.Comment,
                    ReviewDate = r.ReviewDate
                }).ToList()
            };
        }

        public async Task<ApiResponse<List<TourResponse>>> SearchToursAsync(SearchTourRequest request)
        {
            try
            {
                var tours = await _tourRepository.SearchToursAsync(
                    request.Destination,
                    request.MinPrice,
                    request.MaxPrice,
                    request.Duration);

                var response = tours.Select(MapToTourResponse).ToList();
                return ApiResponse<List<TourResponse>>.SuccessResponse(response);
            }
            catch (Exception ex)
            {
                return ApiResponse<List<TourResponse>>.ErrorResponse($"Lỗi khi tìm kiếm tour: {ex.Message}");
            }
        }


        public async Task<ApiResponse<BookingResponse>> BookTourAsync(BookTourRequest request)
        {
            try
            {
                // Log thông tin request để debug
                Console.WriteLine($"BookTourAsync - Request: TourId={request.TourId}, UserId={request.UserId}, TourDate={request.TourDate}, AdultCount={request.AdultCount}, ChildCount={request.ChildCount}");

                // Kiểm tra tour có tồn tại không
                var tour = await _tourRepository.GetTourByIdAsync(request.TourId);
                if (tour == null)
                {
                    Console.WriteLine($"Tour không tồn tại: TourId={request.TourId}");
                    return ApiResponse<BookingResponse>.ErrorResponse("Tour không tồn tại");
                }

                // Tính tổng tiền
                decimal adultPrice = request.AdultPrice ?? tour.AdultPrice;
                decimal childPrice = request.ChildPrice ?? tour.ChildPrice;
                decimal totalAmount;

                // Sử dụng tổng giá từ request nếu có, nếu không thì tính toán
                if (request.TotalPrice.HasValue)
                {
                    totalAmount = request.TotalPrice.Value;
                    Console.WriteLine($"Sử dụng tổng tiền từ request: {totalAmount}");
                }
                else
                {
                    totalAmount = (request.AdultCount * adultPrice) + (request.ChildCount * childPrice);
                    Console.WriteLine($"Tổng tiền tính toán: {totalAmount} (Adult: {request.AdultCount} x {adultPrice}, Child: {request.ChildCount} x {childPrice})");
                }

                // Tạo booking mới
                var booking = new Booking
                {
                    UserId = request.UserId,
                    TourId = request.TourId,
                    TourDate = request.TourDate,
                    AdultCount = request.AdultCount,
                    ChildCount = request.ChildCount,
                    TotalAmount = totalAmount,
                    Status = "Đang chờ",
                    PaymentStatus = "Chưa thanh toán",
                    PaymentMethod = request.PaymentMethod ?? "creditCard", // Mặc định là creditCard nếu không có
                    BookingDate = DateTime.Now
                };

                // Lưu booking vào database
                var createdBooking = await _tourRepository.CreateBookingAsync(booking);
                Console.WriteLine($"Đã tạo booking: BookingId={createdBooking.BookingId}");

                // Tạo chi tiết booking nếu có thông tin hành khách
                if (request.Passengers != null && request.Passengers.Count > 0)
                {
                    var bookingDetails = request.Passengers.Select(p => new BookingDetail
                    {
                        BookingId = createdBooking.BookingId,
                        PassengerName = p.PassengerName,
                        PassengerType = p.PassengerType,
                        Price = p.PassengerType.ToLower() == "adult" ? adultPrice : childPrice
                    }).ToList();

                    await _tourRepository.CreateBookingDetailsAsync(bookingDetails);
                    Console.WriteLine($"Đã tạo {bookingDetails.Count} chi tiết booking");
                }
                else
                {
                    // Tạo chi tiết booking mặc định nếu không có thông tin hành khách
                    var defaultBookingDetails = new List<BookingDetail>();

                    // Thêm người lớn
                    for (int i = 0; i < request.AdultCount; i++)
                    {
                        defaultBookingDetails.Add(new BookingDetail
                        {
                            BookingId = createdBooking.BookingId,
                            PassengerName = $"Người lớn {i + 1}",
                            PassengerType = "Adult",
                            Price = adultPrice
                        });
                    }

                    // Thêm trẻ em
                    for (int i = 0; i < request.ChildCount; i++)
                    {
                        defaultBookingDetails.Add(new BookingDetail
                        {
                            BookingId = createdBooking.BookingId,
                            PassengerName = $"Trẻ em {i + 1}",
                            PassengerType = "Child",
                            Price = childPrice
                        });
                    }

                    if (defaultBookingDetails.Count > 0)
                    {
                        await _tourRepository.CreateBookingDetailsAsync(defaultBookingDetails);
                        Console.WriteLine($"Đã tạo {defaultBookingDetails.Count} chi tiết booking mặc định");
                    }
                }

                // Lấy URL ảnh đại diện của tour (nếu có)
                string imageUrl = null;
                var tourImage = tour.TourImages?.FirstOrDefault();
                if (tourImage != null)
                {
                    imageUrl = tourImage.ImageUrl;
                }

                // Tạo response
                var response = new BookingResponse
                {
                    BookingId = createdBooking.BookingId,
                    TourName = tour.TourName,
                    TourDate = createdBooking.TourDate,
                    AdultCount = createdBooking.AdultCount,
                    ChildCount = createdBooking.ChildCount,
                    TotalAmount = createdBooking.TotalAmount,
                    Status = createdBooking.Status,
                    PaymentStatus = createdBooking.PaymentStatus,
                    BookingDate = createdBooking.BookingDate,
                    ImageUrl = imageUrl
                };

                // Gửi email xác nhận đặt tour
                try
                {
                    // Lấy thông tin người dùng
                    var user = await _context.Users.FirstOrDefaultAsync(u => u.UserId == request.UserId);
                    if (user != null && !string.IsNullOrEmpty(user.Email))
                    {
                        // Tạo request gửi email với đầy đủ thông tin giá
                        var emailRequest = new BookingEmailRequest
                        {
                            RecipientEmail = user.Email,
                            RecipientName = user.FullName ?? "Quý khách",
                            Subject = $"Xác nhận đặt tour: {tour.TourName}",
                            TourName = tour.TourName,
                            BookingId = createdBooking.BookingId.ToString(),
                            BookingDate = request.TourDate.ToString("dd/MM/yyyy"),
                            AdultCount = request.AdultCount,
                            ChildCount = request.ChildCount,
                            AdultPrice = adultPrice.ToString("N0") + " VND",
                            ChildPrice = childPrice.ToString("N0") + " VND",
                            TotalPrice = totalAmount.ToString("N0") + " VND",
                            IncludeQRCode = true
                        };

                        // Gửi email với thông tin chi tiết
                        await _emailService.SendBookingConfirmationEmailAsync(emailRequest);
                        Console.WriteLine($"Đã gửi email xác nhận đến: {user.Email}");
                    }
                    else
                    {
                        Console.WriteLine($"Không tìm thấy thông tin email của user: UserId={request.UserId}");
                    }
                }
                catch (Exception emailEx)
                {
                    // Ghi log lỗi nhưng không ảnh hưởng đến việc đặt tour
                    Console.WriteLine($"Lỗi khi gửi email: {emailEx.Message}");
                }

                return ApiResponse<BookingResponse>.SuccessResponse(response, "Đặt tour thành công");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Lỗi khi đặt tour: {ex.Message}");
                Console.WriteLine($"Stack trace: {ex.StackTrace}");
                return ApiResponse<BookingResponse>.ErrorResponse($"Lỗi khi đặt tour: {ex.Message}");
            }
        }


        public async Task<ApiResponse<List<BookingResponse>>> GetBookingHistoryAsync(int userId)
        {
            try
            {
                var bookings = await _tourRepository.GetBookingsByUserIdAsync(userId);

                var response = bookings.Select(b => new BookingResponse
                {
                    BookingId = b.BookingId,
                    TourName = b.Tour.TourName,
                    TourDate = b.TourDate,
                    AdultCount = b.AdultCount,
                    ChildCount = b.ChildCount,
                    TotalAmount = b.TotalAmount,
                    Status = b.Status,
                    PaymentStatus = b.PaymentStatus,
                    BookingDate = b.BookingDate,
                    ImageUrl = b.Tour.TourImages.FirstOrDefault(i => i.IsPrimary)?.ImageUrl ??
                        b.Tour.TourImages.FirstOrDefault()?.ImageUrl
                }).ToList();

                return ApiResponse<List<BookingResponse>>.SuccessResponse(response);
            }
            catch (Exception ex)
            {
                return ApiResponse<List<BookingResponse>>.ErrorResponse($"Lỗi khi lấy lịch sử đặt tour: {ex.Message}");
            }
        }

        public async Task<ApiResponse<List<TourResponse>>> GetToursByCompanyIdAsync(int companyId)
        {
            try
            {
                var tours = await _tourRepository.GetToursByCompanyIdAsync(companyId);
                var response = tours.Select(MapToTourResponse).ToList();
                return ApiResponse<List<TourResponse>>.SuccessResponse(response);
            }
            catch (Exception ex)
            {
                return ApiResponse<List<TourResponse>>.ErrorResponse($"Lỗi khi lấy tour theo công ty: {ex.Message}");
            }
        }

        public async Task<ApiResponse<TourResponse>> AddTourAsync(CreateTourRequest request)
        {
            try
            {
                // Validate TourismCompany if provided
                if (request.TourismCompanyId.HasValue)
                {
                    var company = await _context.TourismCompanies
                        .FirstOrDefaultAsync(tc => tc.Id == request.TourismCompanyId.Value);
                    if (company == null)
                    {
                        return ApiResponse<TourResponse>.ErrorResponse("Công ty du lịch không tồn tại");
                    }
                }

                var tour = new Tour
                {
                    TourName = request.TourName,
                    Description = request.Description,
                    Duration = request.Duration,
                    Transportation = request.Transportation,
                    AdultPrice = request.AdultPrice,
                    ChildPrice = request.ChildPrice,
                    IsActive = request.IsActive,
                    IsFeatured = request.IsFeatured,
                    TourismCompanyId = request.TourismCompanyId, // Add TourismCompanyId
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now
                };
                var created = await _tourRepository.AddTourAsync(tour);

                var loadedTour = await _tourRepository.GetTourByIdAsync(created.TourId);

                if (!string.IsNullOrEmpty(request.ImageUrl) && loadedTour != null)
                {
                    var tourImage = new TourImage
                    {
                        TourId = loadedTour.TourId,
                        ImageUrl = request.ImageUrl,
                        IsPrimary = true
                    };
                    await _tourRepository.AddTourImageAsync(tourImage);
                }

                return ApiResponse<TourResponse>.SuccessResponse(MapToTourResponse(loadedTour), "Thêm tour thành công");
            }
            catch (Exception ex)
            {
                return ApiResponse<TourResponse>.ErrorResponse($"Lỗi khi thêm tour: {ex.Message}");
            }
        }

        public async Task<ApiResponse<TourResponse>> UpdateTourAsync(UpdateTourRequest request)
        {
            try
            {
                var tour = await _tourRepository.GetTourByIdAsync(request.TourId);
                if (tour == null)
                    return ApiResponse<TourResponse>.ErrorResponse("Tour không tồn tại");
                tour.TourName = request.TourName;
                tour.Description = request.Description;
                tour.Duration = request.Duration;
                tour.Transportation = request.Transportation;
                tour.AdultPrice = request.AdultPrice;
                tour.ChildPrice = request.ChildPrice;
                tour.IsActive = request.IsActive;
                tour.IsFeatured = request.IsFeatured;
                tour.TourismCompanyId = request.TourismCompanyId; // Add TourismCompanyId
                tour.UpdatedAt = DateTime.Now;
                var updated = await _tourRepository.UpdateTourAsync(tour);

                if (!string.IsNullOrEmpty(request.ImageUrl))
                {
                    var tourImage = new TourImage
                    {
                        TourId = tour.TourId,
                        ImageUrl = request.ImageUrl,
                        IsPrimary = true
                    };
                    await _tourRepository.AddTourImageAsync(tourImage, false);
                }
                return ApiResponse<TourResponse>.SuccessResponse(MapToTourResponse(updated), "Cập nhật tour thành công");
            }
            catch (Exception ex)
            {
                return ApiResponse<TourResponse>.ErrorResponse($"Lỗi khi cập nhật tour: {ex.Message}");
            }
        }

        public async Task<ApiResponse<bool>> DeleteTourAsync(int id)
        {
            try
            {
                var result = await _tourRepository.DeleteTourAsync(id);
                if (!result)
                    return ApiResponse<bool>.ErrorResponse("Tour không tồn tại");
                return ApiResponse<bool>.SuccessResponse(true, "Xóa tour thành công");
            }
            catch (Exception ex)
            {
                return ApiResponse<bool>.ErrorResponse($"Lỗi khi xóa tour: {ex.Message}");
            }
        }

        #endregion
    }
}