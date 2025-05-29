﻿using System;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using System.IO;
using System.Text;
using System.Web;
using Microsoft.Extensions.Configuration;
using BookTour.Dto.Request;

namespace BookTour.Service.Impl
{
    public class EmailService : IEmailService
    {
        private readonly IConfiguration _configuration;

        public EmailService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task SendEmailAsync(string to, string subject, string body, bool isHtml = true)
        {
            var emailConfig = _configuration.GetSection("Email");
            var smtpClient = new SmtpClient
            {
                Host = emailConfig["Host"],
                Port = int.Parse(emailConfig["Port"]),
                EnableSsl = bool.Parse(emailConfig["EnableSsl"]),
                Timeout = int.Parse(emailConfig["Timeout"]),
                Credentials = new NetworkCredential(emailConfig["Username"], emailConfig["Password"])
            };

            var mailMessage = new MailMessage
            {
                From = new MailAddress(emailConfig["Username"], "Book Tour Service"),
                Subject = subject,
                Body = body,
                IsBodyHtml = isHtml
            };

            mailMessage.To.Add(to);

            // Thêm ảnh QR code vào email nếu body có chứa cid:qr-code
            //if (body.Contains("cid:qr-code"))
            if (true)
                {
                try
                {
                    // Đường dẫn tới ảnh QR code
                    string qrCodePath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "wwwroot", "images", "qr-code.png");
                    Console.WriteLine(">>>>>>>>>>>>>>>>>>>>>: " + qrCodePath);
                    // Kiểm tra xem file có tồn tại không
                    if (File.Exists(qrCodePath))
                    {
                        // Đính kèm ảnh QR code vào email
                        var attachment = new Attachment(qrCodePath);
                        attachment.ContentId = "qr-code";
                        attachment.ContentDisposition.Inline = true;
                        attachment.ContentDisposition.DispositionType = "inline";
                        mailMessage.Attachments.Add(attachment);
                        Console.WriteLine("QR code image attached to email");
                    }
                    else
                    {
                        Console.WriteLine($"QR code image not found at path: {qrCodePath}");
                    }
                }
                catch (Exception attachEx)
                {
                    Console.WriteLine($"Error attaching QR code image: {attachEx.Message}");
                    // Tiếp tục gửi email mà không có ảnh QR code
                }
            }

            // Thêm ảnh QR code thanh toán vào email nếu body có chứa cid:payment-qr
            if (body.Contains("cid:payment-qr"))
            {
                try
                {
                    // Đường dẫn tới ảnh QR code thanh toán
                    string paymentQrCodePath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "wwwroot", "images", "payment-qr.svg");

                    // Kiểm tra xem file có tồn tại không
                    if (File.Exists(paymentQrCodePath))
                    {
                        // Đính kèm ảnh QR code thanh toán vào email
                        var attachment = new Attachment(paymentQrCodePath);
                        attachment.ContentId = "payment-qr";
                        attachment.ContentDisposition.Inline = true;
                        attachment.ContentDisposition.DispositionType = "inline";
                        mailMessage.Attachments.Add(attachment);
                        Console.WriteLine("Payment QR code image attached to email");
                    }
                    else
                    {
                        Console.WriteLine($"Payment QR code image not found at path: {paymentQrCodePath}");
                    }
                }
                catch (Exception attachEx)
                {
                    Console.WriteLine($"Error attaching payment QR code image: {attachEx.Message}");
                    // Tiếp tục gửi email mà không có ảnh QR code thanh toán
                }
            }

            try
            {
                await smtpClient.SendMailAsync(mailMessage);
                Console.WriteLine($"Email sent successfully to {to}");
            }
            catch (Exception ex)
            {
                // Log the exception
                Console.WriteLine($"Error sending email: {ex.Message}");
                throw;
            }
        }

        public async Task SendBookingConfirmationAsync(string to, string customerName, string tourName, DateTime tourDate, int adultCount, int childCount, decimal totalPrice)
        {
            string subject = $"Xác nhận đặt tour: {tourName}";
            //string qrCodeUrl = "https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg";
            string svg = "data:image/png;base64,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";

            string body = $@"
            <html>
            <head>
                <style>
                    body {{ font-family: Arial, sans-serif; line-height: 1.6; }}
                    .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
                    .header {{ background-color: #4CAF50; color: white; padding: 10px; text-align: center; }}
                    .content {{ padding: 20px; border: 1px solid #ddd; }}
                    .footer {{ text-align: center; margin-top: 20px; font-size: 12px; color: #777; }}
                    table {{ width: 100%; border-collapse: collapse; margin: 20px 0; }}
                    th, td {{ padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }}
                    th {{ background-color: #f2f2f2; }}
                </style>
            </head>
            <body>
                <div class='container'>
                    <div class='header'>
                        <h2>Xác nhận đặt tour</h2>
                    </div>
                    <div class='content'>
                        <p>Kính gửi <strong>{customerName}</strong>,</p>
                        <p>Cảm ơn bạn đã đặt tour với chúng tôi. Dưới đây là thông tin chi tiết về tour của bạn:</p>

                        <table>
                            <tr>
                                <th>Thông tin</th>
                                <th>Chi tiết</th>
                            </tr>
                            <tr>
                                <td>Tên tour:</td>
                                <td>{tourName}</td>
                            </tr>
                            <tr>
                                <td>Ngày khởi hành:</td>
                                <td>{tourDate.ToString("dd/MM/yyyy")}</td>
                            </tr>
                            <tr>
                                <td>Số lượng người lớn:</td>
                                <td>{adultCount}</td>
                            </tr>
                            <tr>
                                <td>Số lượng trẻ em:</td>
                                <td>{childCount}</td>
                            </tr>
                            <tr>
                                <td>Tổng tiền:</td>
                                <td>{totalPrice.ToString("N0")} VND</td>
                            </tr>
                        </table>

                        <p>Vui lòng kiểm tra thông tin và liên hệ với chúng tôi nếu có bất kỳ thắc mắc nào.</p>
                        <p>Chúc bạn có một chuyến đi vui vẻ và đáng nhớ!</p>

                        <div class='qr-code'>
                            <h3>Mã QR đặt tour</h3>
                            <p>Vui lòng xuất trình mã QR này khi check-in</p>
                        </div>

                        <p>Trân trọng,<br>Đội ngũ Book Tour</p>
                    </div>
                    <div class='footer'>
                        <p>© 2023 Book Tour Service. All rights reserved.</p>
                    </div>
                </div>
            </body>
            </html>";

            await SendEmailAsync(to, subject, body);
        }

        // Phương thức lấy QR code từ URL
        private string GetQRCodeUrl(string bookingId = null)
        {
            try
            {
                // Đường dẫn tới ảnh QR code trong thư mục assets
                string qrCodePath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "wwwroot", "images", "qr-code.svg");

                // Kiểm tra xem file có tồn tại không
                if (File.Exists(qrCodePath))
                {
                    // Trả về đường dẫn tương đối để sử dụng trong email
                    return "cid:qr-code";
                }

                // Nếu không tìm thấy file, sử dụng Google Chart API để tạo QR code
                if (!string.IsNullOrEmpty(bookingId))
                {
                    string encodedData = System.Web.HttpUtility.UrlEncode($"BookTour-ID:{bookingId}");
                    return $"https://chart.googleapis.com/chart?cht=qr&chl={encodedData}&chs=200x200&chld=L|0";
                }

                // URL mặc định của QR code nếu không có bookingId và không tìm thấy file
                return "https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg";
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error getting QR code URL: {ex.Message}");
                // Fallback URL
                return "https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg";
            }
        }

        // Phương thức lấy QR code thanh toán
        private string GetPaymentQRCodeUrl()
        {
            try
            {
                // Đường dẫn tới ảnh QR code thanh toán trong thư mục assets
                string paymentQrCodePath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "wwwroot", "images", "payment-qr.svg");

                // Kiểm tra xem file có tồn tại không
                if (File.Exists(paymentQrCodePath))
                {
                    // Trả về đường dẫn tương đối để sử dụng trong email
                    return "cid:payment-qr";
                }

                // URL mặc định của QR code nếu không tìm thấy file
                return "https://chart.googleapis.com/chart?cht=qr&chl=BookTour-Payment&chs=200x200&chld=L|0";
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error getting payment QR code URL: {ex.Message}");
                // Fallback URL
                return "https://chart.googleapis.com/chart?cht=qr&chl=BookTour-Payment&chs=200x200&chld=L|0";
            }
        }

        public async Task<bool> SendPasswordResetOtpAsync(string to, string otp)
        {
            try
            {
                string subject = "Mã OTP đặt lại mật khẩu";
                string body = $@"
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset='UTF-8'>
                    <title>Mã OTP đặt lại mật khẩu</title>
                    <style>
                        body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
                        .container {{ max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px; }}
                        .header {{ background-color: #007bff; color: white; padding: 10px; text-align: center; border-radius: 5px 5px 0 0; }}
                        .content {{ padding: 20px; }}
                        .otp-code {{ font-size: 24px; font-weight: bold; text-align: center; margin: 20px 0; padding: 10px; background-color: #f8f9fa; border-radius: 5px; letter-spacing: 5px; }}
                        .footer {{ text-align: center; margin-top: 20px; font-size: 12px; color: #777; }}
                    </style>
                </head>
                <body>
                    <div class='container'>
                        <div class='header'>
                            <h2>Mã OTP đặt lại mật khẩu</h2>
                        </div>
                        <div class='content'>
                            <p>Xin chào,</p>
                            <p>Chúng tôi đã nhận được yêu cầu đặt lại mật khẩu cho tài khoản của bạn. Vui lòng sử dụng mã OTP dưới đây để xác thực:</p>

                            <div class='otp-code'>{otp}</div>

                            <p>Mã OTP này sẽ hết hạn sau 10 phút.</p>
                            <p>Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này hoặc liên hệ với chúng tôi nếu bạn có bất kỳ câu hỏi nào.</p>
                            <p>Trân trọng,<br>Đội ngũ Book Tour</p>
                        </div>
                        <div class='footer'>
                            <p>© {DateTime.Now.Year} Book Tour Service. All rights reserved.</p>
                            <p>Đây là email tự động, vui lòng không trả lời email này.</p>
                        </div>
                    </div>
                </body>
                </html>";

                await SendEmailAsync(to, subject, body);
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error sending password reset OTP: {ex.Message}");
                return false;
            }
        }

        public async Task<bool> SendBookingConfirmationEmailAsync(BookingEmailRequest request)
        {
            try
            {
                // Log request để debug
                Console.WriteLine($"Processing email request in service: {System.Text.Json.JsonSerializer.Serialize(request)}");

                // Kiểm tra request
                if (request == null)
                {
                    Console.WriteLine("Request is null");
                    return false;
                }

                // Đảm bảo các trường bắt buộc
                string subject = request.Subject ?? "Xác nhận đặt tour thành công";

                // Tạo danh sách địa điểm
                string destinationsList = "";
                if (request.Destinations != null && request.Destinations.Count > 0)
                {
                    destinationsList = "<ul>";
                    foreach (var destination in request.Destinations)
                    {
                        destinationsList += $"<li>{destination}</li>";
                    }
                    destinationsList += "</ul>";
                }

                // Lấy URL QR code
                string qrCodeUrl = "";
                string paymentQrCodeUrl = "";

                try
                {
                    if (request.IncludeQRCode)
                    {
                        // Lấy URL QR code với bookingId
                        qrCodeUrl = GetQRCodeUrl(request.BookingId);
                        Console.WriteLine($"QR code URL loaded successfully for booking ID: {request.BookingId}");

                        // Lấy URL QR code thanh toán
                        paymentQrCodeUrl = GetPaymentQRCodeUrl();
                        Console.WriteLine("Payment QR code URL loaded successfully");
                    }
                }
                catch (Exception qrEx)
                {
                    Console.WriteLine($"Error loading QR code URL: {qrEx.Message}");
                    // Không throw lỗi, tiếp tục gửi email không có QR code
                }

                // Tạo nội dung email
                string body = $@"
                <html>
                <head>
                    <style>
                        body {{ font-family: Arial, sans-serif; line-height: 1.6; }}
                        .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
                        .header {{ background-color: #007bff; color: white; padding: 15px; text-align: center; border-radius: 5px 5px 0 0; }}
                        .content {{ padding: 20px; border: 1px solid #ddd; border-radius: 0 0 5px 5px; }}
                        .footer {{ text-align: center; margin-top: 20px; font-size: 12px; color: #777; }}
                        table {{ width: 100%; border-collapse: collapse; margin: 20px 0; }}
                        th, td {{ padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }}
                        th {{ background-color: #f2f2f2; }}
                        .qr-code {{ text-align: center; margin: 20px 0; }}
                        .qr-code img {{ max-width: 200px; }}
                        .destinations {{ margin: 15px 0; }}
                        .booking-id {{ font-weight: bold; color: #007bff; }}
                        .thank-you {{ background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin-top: 20px; }}
                    </style>
                </head>
                <body>
                    <div class='container'>
                        <div class='header'>
                            <h2>Xác nhận đặt tour thành công</h2>
                        </div>
                        <div class='content'>
                            <p>Kính gửi {(string.IsNullOrEmpty(request.RecipientName) ? "Quý khách" : request.RecipientName)},</p>
                            <p>Cảm ơn bạn đã đặt tour với chúng tôi. Dưới đây là thông tin chi tiết về tour của bạn:</p>

                            <p class='booking-id'>Mã đặt tour: {request.BookingId}</p>

                            <table>
                                <tr>
                                    <th>Thông tin</th>
                                    <th>Chi tiết</th>
                                </tr>
                                <tr>
                                    <td>Tên tour:</td>
                                    <td>{request.TourName}</td>
                                </tr>
                                <tr>
                                    <td>Ngày khởi hành:</td>
                                    <td>{request.BookingDate}</td>
                                </tr>
                                <tr>
                                    <td>Số lượng người lớn:</td>
                                    <td>{request.AdultCount}</td>
                                </tr>
                                <tr>
                                    <td>Giá vé người lớn:</td>
                                    <td>{request.AdultPrice}</td>
                                </tr>
                                <tr>
                                    <td>Số lượng trẻ em:</td>
                                    <td>{request.ChildCount}</td>
                                </tr>
                                <tr>
                                    <td>Giá vé trẻ em:</td>
                                    <td>{request.ChildPrice}</td>
                                </tr>
                                <tr>
                                    <td>Tổng tiền:</td>
                                    <td>{request.TotalPrice}</td>
                                </tr>
                            </table>

                            {(string.IsNullOrEmpty(destinationsList) ? "" : $@"
                            <div class='destinations'>
                                <h3>Các địa điểm tham quan:</h3>
                                {destinationsList}
                            </div>")}

                            {(string.IsNullOrEmpty(qrCodeUrl) ? "" : $@"
                            <div class='qr-code'>
                                <h3>Mã QR đặt tour</h3>
                                <p>Vui lòng xuất trình mã QR này khi check-in</p>
                                <img src='{qrCodeUrl}' alt='QR Code' style='max-width: 200px; margin: 0 auto; display: block;' />
                            </div>")}

                            {(string.IsNullOrEmpty(paymentQrCodeUrl) ? "" : $@"
                            <div class='qr-code'>
                                <h3>Mã QR thanh toán</h3>
                                <p>Quét mã QR này để thanh toán cho tour của bạn</p>
                                <img src='{paymentQrCodeUrl}' alt='Payment QR Code' style='max-width: 200px; margin: 0 auto; display: block;' />
                            </div>")}

                            <div class='thank-you'>
                                <p>Vui lòng kiểm tra thông tin và liên hệ với chúng tôi nếu có bất kỳ thắc mắc nào.</p>
                                <p>Chúc bạn có một chuyến đi vui vẻ và đáng nhớ!</p>
                            </div>

                            <p>Trân trọng,<br>Đội ngũ Book Tour</p>
                        </div>
                        <div class='footer'>
                            <p>© 2023 Book Tour Service. All rights reserved.</p>
                            <p>Đây là email tự động, vui lòng không trả lời email này.</p>
                        </div>
                    </div>
                </body>
                </html>";

                try
                {
                    // Log thông tin chi tiết trước khi gửi email
                    Console.WriteLine($"Sending email to: {request.RecipientEmail}");
                    Console.WriteLine($"Email subject: {subject}");
                    Console.WriteLine($"QR Code URL: {qrCodeUrl}");
                    Console.WriteLine($"Payment QR Code URL: {paymentQrCodeUrl}");

                    // Gửi email
                    await SendEmailAsync(request.RecipientEmail, subject, body);
                    Console.WriteLine($"Email sent successfully to {request.RecipientEmail}");
                    return true;
                }
                catch (Exception emailEx)
                {
                    Console.WriteLine($"Error sending email: {emailEx.Message}");
                    Console.WriteLine($"Stack trace: {emailEx.StackTrace}");
                    return false;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in SendBookingConfirmationEmailAsync: {ex.Message}");
                Console.WriteLine($"Stack trace: {ex.StackTrace}");
                return false;
            }
        }
    }
}
