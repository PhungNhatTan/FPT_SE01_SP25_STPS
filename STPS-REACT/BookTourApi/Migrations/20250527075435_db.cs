using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace BookTour.Migrations
{
    /// <inheritdoc />
    public partial class db : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Blogs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    image = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Blogs", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Cities",
                columns: table => new
                {
                    CityId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CityName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cities", x => x.CityId);
                });

            migrationBuilder.CreateTable(
                name: "Roles",
                columns: table => new
                {
                    RoleId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RoleName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Roles", x => x.RoleId);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    UserId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Username = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FullName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Phone = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    LastLogin = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.UserId);
                });

            migrationBuilder.CreateTable(
                name: "Voucher",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    VoucherName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    VoucherDetail = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    StartDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EndDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Voucher", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Destinations",
                columns: table => new
                {
                    DestinationId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DestinationName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CityId = table.Column<int>(type: "int", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    IsFeatured = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Destinations", x => x.DestinationId);
                    table.ForeignKey(
                        name: "FK_Destinations_Cities_CityId",
                        column: x => x.CityId,
                        principalTable: "Cities",
                        principalColumn: "CityId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CustomTours",
                columns: table => new
                {
                    CustomTourId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    TourName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    EstimatedPrice = table.Column<decimal>(type: "decimal(18,2)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CustomTours", x => x.CustomTourId);
                    table.ForeignKey(
                        name: "FK_CustomTours_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TourismCompanies",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CompanyName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    RepresentativeName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TaxCode = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TourismCompanies", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TourismCompanies_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserRoles",
                columns: table => new
                {
                    UserId = table.Column<int>(type: "int", nullable: false),
                    RoleId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserRoles", x => new { x.UserId, x.RoleId });
                    table.ForeignKey(
                        name: "FK_UserRoles_Roles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "Roles",
                        principalColumn: "RoleId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserRoles_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DestinationDetails",
                columns: table => new
                {
                    DetailId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DestinationId = table.Column<int>(type: "int", nullable: false),
                    FeatureType = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    FeatureValue = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DestinationDetails", x => x.DetailId);
                    table.ForeignKey(
                        name: "FK_DestinationDetails_Destinations_DestinationId",
                        column: x => x.DestinationId,
                        principalTable: "Destinations",
                        principalColumn: "DestinationId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DestinationImages",
                columns: table => new
                {
                    ImageId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DestinationId = table.Column<int>(type: "int", nullable: false),
                    ImageUrl = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    IsPrimary = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DestinationImages", x => x.ImageId);
                    table.ForeignKey(
                        name: "FK_DestinationImages_Destinations_DestinationId",
                        column: x => x.DestinationId,
                        principalTable: "Destinations",
                        principalColumn: "DestinationId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CustomTourDestinations",
                columns: table => new
                {
                    CustomDestinationId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CustomTourId = table.Column<int>(type: "int", nullable: false),
                    DestinationId = table.Column<int>(type: "int", nullable: false),
                    OrderNumber = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CustomTourDestinations", x => x.CustomDestinationId);
                    table.ForeignKey(
                        name: "FK_CustomTourDestinations_CustomTours_CustomTourId",
                        column: x => x.CustomTourId,
                        principalTable: "CustomTours",
                        principalColumn: "CustomTourId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CustomTourDestinations_Destinations_DestinationId",
                        column: x => x.DestinationId,
                        principalTable: "Destinations",
                        principalColumn: "DestinationId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Tours",
                columns: table => new
                {
                    TourId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TourName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Duration = table.Column<int>(type: "int", nullable: false),
                    Transportation = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    AdultPrice = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    ChildPrice = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    IsFeatured = table.Column<bool>(type: "bit", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    TourismCompanyId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tours", x => x.TourId);
                    table.ForeignKey(
                        name: "FK_Tours_TourismCompanies_TourismCompanyId",
                        column: x => x.TourismCompanyId,
                        principalTable: "TourismCompanies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "Bookings",
                columns: table => new
                {
                    BookingId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    TourId = table.Column<int>(type: "int", nullable: false),
                    BookingDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    TourDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    AdultCount = table.Column<int>(type: "int", nullable: false),
                    ChildCount = table.Column<int>(type: "int", nullable: false),
                    TotalAmount = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    PaymentStatus = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    PaymentMethod = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Bookings", x => x.BookingId);
                    table.ForeignKey(
                        name: "FK_Bookings_Tours_TourId",
                        column: x => x.TourId,
                        principalTable: "Tours",
                        principalColumn: "TourId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Bookings_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Reviews",
                columns: table => new
                {
                    ReviewId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    TourId = table.Column<int>(type: "int", nullable: false),
                    Rating = table.Column<int>(type: "int", nullable: false),
                    Comment = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ReviewDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Reviews", x => x.ReviewId);
                    table.ForeignKey(
                        name: "FK_Reviews_Tours_TourId",
                        column: x => x.TourId,
                        principalTable: "Tours",
                        principalColumn: "TourId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Reviews_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SavedTours",
                columns: table => new
                {
                    SavedTourId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    TourId = table.Column<int>(type: "int", nullable: false),
                    SavedDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SavedTours", x => x.SavedTourId);
                    table.ForeignKey(
                        name: "FK_SavedTours_Tours_TourId",
                        column: x => x.TourId,
                        principalTable: "Tours",
                        principalColumn: "TourId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SavedTours_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TourDestinations",
                columns: table => new
                {
                    TourDestinationId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TourId = table.Column<int>(type: "int", nullable: false),
                    DestinationId = table.Column<int>(type: "int", nullable: false),
                    OrderNumber = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TourDestinations", x => x.TourDestinationId);
                    table.ForeignKey(
                        name: "FK_TourDestinations_Destinations_DestinationId",
                        column: x => x.DestinationId,
                        principalTable: "Destinations",
                        principalColumn: "DestinationId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TourDestinations_Tours_TourId",
                        column: x => x.TourId,
                        principalTable: "Tours",
                        principalColumn: "TourId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TourImages",
                columns: table => new
                {
                    ImageId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TourId = table.Column<int>(type: "int", nullable: false),
                    ImageUrl = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    IsPrimary = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TourImages", x => x.ImageId);
                    table.ForeignKey(
                        name: "FK_TourImages_Tours_TourId",
                        column: x => x.TourId,
                        principalTable: "Tours",
                        principalColumn: "TourId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TourSchedules",
                columns: table => new
                {
                    ScheduleId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TourId = table.Column<int>(type: "int", nullable: false),
                    DayNumber = table.Column<int>(type: "int", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    Activities = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TourSchedules", x => x.ScheduleId);
                    table.ForeignKey(
                        name: "FK_TourSchedules_Tours_TourId",
                        column: x => x.TourId,
                        principalTable: "Tours",
                        principalColumn: "TourId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "BookingDetails",
                columns: table => new
                {
                    BookingDetailId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BookingId = table.Column<int>(type: "int", nullable: false),
                    PassengerName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    PassengerType = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    Price = table.Column<decimal>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BookingDetails", x => x.BookingDetailId);
                    table.ForeignKey(
                        name: "FK_BookingDetails_Bookings_BookingId",
                        column: x => x.BookingId,
                        principalTable: "Bookings",
                        principalColumn: "BookingId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Cities",
                columns: new[] { "CityId", "CityName", "Description", "IsActive" },
                values: new object[,]
                {
                    { 1, "Hà Nội", "Thủ đô của Việt Nam, nơi hội tụ văn hóa ngàn năm văn hiến với nhiều di tích lịch sử và danh lam thắng cảnh nổi tiếng.", true },
                    { 2, "Hồ Chí Minh", "Thành phố năng động nhất Việt Nam, trung tâm kinh tế, văn hóa và giáo dục lớn của cả nước.", true },
                    { 3, "Đà Nẵng", "Thành phố biển xinh đẹp với bãi biển Mỹ Khê nổi tiếng và cầu Rồng biểu tượng.", true },
                    { 4, "Huế", "Cố đô của Việt Nam với hệ thống di tích cố đô Huế được UNESCO công nhận là Di sản Văn hóa Thế giới.", true },
                    { 5, "Nha Trang", "Thành phố biển nổi tiếng với những bãi biển đẹp, hoạt động du lịch sôi động và ẩm thực hải sản phong phú.", true },
                    { 6, "Sapa", "Thị trấn trong sương mù, nổi tiếng với những thửa ruộng bậc thang và văn hóa đặc sắc của các dân tộc thiểu số.", true },
                    { 7, "Hạ Long", "Nổi tiếng với Vịnh Hạ Long - một trong 7 kỳ quan thiên nhiên mới của thế giới.", true },
                    { 8, "Hội An", "Phố cổ Hội An - Di sản Văn hóa Thế giới với kiến trúc cổ kính và những chiếc đèn lồng đầy màu sắc.", true },
                    { 9, "Đà Lạt", "Thành phố ngàn hoa, thành phố sương mù với khí hậu mát mẻ quanh năm.", true },
                    { 10, "Phú Quốc", "Hòn đảo lớn nhất Việt Nam với những bãi biển hoang sơ và nước biển trong xanh.", true }
                });

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "RoleId", "RoleName" },
                values: new object[,]
                {
                    { 1, "User" },
                    { 2, "Admin" },
                    { 3, "Manager" },
                    { 4, "Tourism Company" }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "UserId", "Address", "CreatedAt", "Email", "FullName", "LastLogin", "Password", "Phone", "Username" },
                values: new object[,]
                {
                    { 1, "Hà Nội", new DateTime(2025, 5, 27, 14, 54, 32, 423, DateTimeKind.Local).AddTicks(5042), "user1@example.com", "Nguyễn Văn A", null, "hashed_password_here", "0901234567", "user1" },
                    { 2, "Hồ Chí Minh", new DateTime(2025, 5, 27, 14, 54, 32, 423, DateTimeKind.Local).AddTicks(5045), "user2@example.com", "Trần Thị B", null, "hashed_password_here", "0901234568", "user2" },
                    { 3, "Đà Nẵng", new DateTime(2025, 5, 27, 14, 54, 32, 423, DateTimeKind.Local).AddTicks(5049), "user3@example.com", "Lê Văn C", null, "hashed_password_here", "0901234569", "user3" },
                    { 4, "Huế", new DateTime(2025, 5, 27, 14, 54, 32, 423, DateTimeKind.Local).AddTicks(5053), "user4@example.com", "Phạm Thị D", null, "hashed_password_here", "0901234570", "user4" },
                    { 5, "Nha Trang", new DateTime(2025, 5, 27, 14, 54, 32, 423, DateTimeKind.Local).AddTicks(5178), "user5@example.com", "Hoàng Văn E", null, "hashed_password_here", "0901234571", "user5" }
                });

            migrationBuilder.InsertData(
                table: "Destinations",
                columns: new[] { "DestinationId", "CityId", "Description", "DestinationName", "IsActive", "IsFeatured" },
                values: new object[,]
                {
                    { 1, 1, "Biểu tượng của Thủ đô, nơi lưu giữ truyền thuyết về Rùa thần và gươm báu.", "Hồ Gươm", true, true },
                    { 2, 1, "Di tích lịch sử văn hóa, nơi thờ Khổng Tử và các bậc hiền triết, trường đại học đầu tiên của Việt Nam.", "Văn Miếu - Quốc Tử Giám", true, true },
                    { 3, 1, "Công trình lịch sử văn hóa đặc biệt, nơi lưu giữ thi hài của Chủ tịch Hồ Chí Minh.", "Lăng Chủ tịch Hồ Chí Minh", true, true },
                    { 4, 1, "Khu phố cổ với 36 phố phường, mang đậm bản sắc văn hóa Hà Nội truyền thống.", "Phố cổ Hà Nội", true, true },
                    { 5, 1, "Di sản văn hóa thế giới, minh chứng cho lịch sử ngàn năm văn hiến của Thăng Long - Hà Nội.", "Hoàng thành Thăng Long", true, true },
                    { 6, 1, "Công trình kiến trúc theo phong cách Pháp, biểu tượng của Hà Nội hiện đại.", "Nhà hát Lớn Hà Nội", true, true },
                    { 7, 1, "Cây cầu lịch sử bắc qua sông Hồng, chứng nhân lịch sử của Hà Nội.", "Cầu Long Biên", true, true },
                    { 8, 1, "Công viên và vườn thú lớn của Hà Nội, điểm vui chơi giải trí cho mọi lứa tuổi.", "Công viên Thủ Lệ", true, true },
                    { 9, 1, "Hồ nước ngọt tự nhiên lớn nhất Hà Nội, nơi có nhiều đền chùa và cảnh đẹp.", "Hồ Tây", true, true },
                    { 10, 2, "Công trình kiến trúc Gothic nổi tiếng, được xây dựng vào cuối thế kỷ 19.", "Nhà thờ Đức Bà", true, true },
                    { 11, 2, "Công trình kiến trúc cổ điển Pháp, một trong những công trình lâu đời nhất ở Sài Gòn.", "Bưu điện Trung tâm Sài Gòn", true, true },
                    { 12, 2, "Khu chợ nổi tiếng và lâu đời nhất Sài Gòn, biểu tượng của thành phố.", "Chợ Bến Thành", true, true },
                    { 13, 2, "Công trình lịch sử gắn liền với sự kiện thống nhất đất nước.", "Dinh Độc Lập", true, true },
                    { 14, 2, "Khu phố đi bộ sầm uất và hiện đại nhất thành phố.", "Phố đi bộ Nguyễn Huệ", true, true },
                    { 15, 3, "Khu du lịch nổi tiếng với Cầu Vàng và nhiều công trình kiến trúc độc đáo.", "Bà Nà Hills", true, true },
                    { 16, 3, "Một trong những bãi biển đẹp nhất hành tinh với cát trắng mịn và nước biển trong xanh.", "Bãi biển Mỹ Khê", true, true },
                    { 17, 3, "Biểu tượng của thành phố Đà Nẵng, cây cầu có thể phun lửa và nước vào cuối tuần.", "Cầu Rồng", true, true },
                    { 18, 3, "Danh thắng nổi tiếng với năm ngọn núi đá vôi và nhiều hang động, chùa chiền.", "Ngũ Hành Sơn", true, true },
                    { 19, 3, "Khu bảo tồn thiên nhiên với rừng nguyên sinh và bãi biển hoang sơ.", "Bán đảo Sơn Trà", true, true },
                    { 20, 4, "Quần thể di tích cung đình triều Nguyễn, nơi sinh sống và làm việc của 13 vị vua triều Nguyễn.", "Đại Nội Huế", true, true },
                    { 21, 4, "Ngôi chùa cổ nhất Huế với tháp Phước Duyên 7 tầng nổi tiếng.", "Chùa Thiên Mụ", true, true },
                    { 22, 4, "Công trình kiến trúc đẹp nhất trong các lăng tẩm ở Huế.", "Lăng Tự Đức", true, true },
                    { 23, 4, "Lăng tẩm có kiến trúc độc đáo, kết hợp giữa phương Đông và phương Tây.", "Lăng Khải Định", true, true },
                    { 24, 4, "Dòng sông thơ mộng chảy qua thành phố Huế, gắn liền với văn hóa và lịch sử Huế.", "Sông Hương", true, true },
                    { 25, 5, "Khu du lịch giải trí hiện đại với nhiều trò chơi hấp dẫn và bãi biển riêng.", "Vinpearl Land", true, true },
                    { 26, 5, "Một trong 29 vịnh đẹp nhất thế giới với làn nước trong xanh và nhiều đảo nhỏ.", "Vịnh Nha Trang", true, true },
                    { 27, 5, "Di tích lịch sử văn hóa với kiến trúc độc đáo của vương quốc Chăm Pa cổ.", "Tháp Bà Ponagar", true, true },
                    { 28, 5, "Thắng cảnh thiên nhiên với những khối đá chồng lên nhau độc đáo.", "Hòn Chồng", true, true },
                    { 29, 5, "Bãi biển hoang sơ với cát trắng mịn và nước biển trong xanh.", "Bãi biển Dốc Lết", true, true },
                    { 30, 6, "Nóc nhà Đông Dương với độ cao 3.143m, nơi có hệ sinh thái đa dạng.", "Fansipan", true, true },
                    { 31, 6, "Bản làng cổ của người H'Mông với nét văn hóa đặc sắc và thác nước tuyệt đẹp.", "Bản Cát Cát", true, true },
                    { 32, 6, "Thung lũng xinh đẹp với những thửa ruộng bậc thang tuyệt đẹp.", "Thung lũng Mường Hoa", true, true },
                    { 33, 6, "Bản làng của người Dao Đỏ với nghề dệt vải và thêu thùa truyền thống.", "Bản Tả Phìn", true, true },
                    { 34, 6, "Điểm ngắm cảnh tuyệt đẹp với tầm nhìn bao quát toàn bộ thung lũng Mường Hoa.", "Cổng Trời", true, true }
                });

            migrationBuilder.InsertData(
                table: "TourismCompanies",
                columns: new[] { "Id", "CompanyName", "Email", "PhoneNumber", "RepresentativeName", "TaxCode", "UserId" },
                values: new object[,]
                {
                    { 1, "Asia Travel Co., Ltd", "contact@asiatravel.com", "0909123456", "Nguyen Van A", "0101234567", 1 },
                    { 2, "VietTourist JSC", "info@viettourist.vn", "0912345678", "Tran Thi B", "0207654321", 2 },
                    { 3, "Green Journey", "greenjourney@gmail.com", "0988998877", "Le Van C", "0304567890", 3 }
                });

            migrationBuilder.InsertData(
                table: "UserRoles",
                columns: new[] { "RoleId", "UserId" },
                values: new object[,]
                {
                    { 4, 1 },
                    { 4, 2 },
                    { 4, 3 },
                    { 1, 4 },
                    { 1, 5 }
                });

            migrationBuilder.InsertData(
                table: "DestinationDetails",
                columns: new[] { "DetailId", "DestinationId", "FeatureType", "FeatureValue" },
                values: new object[,]
                {
                    { 1, 1, "Giờ mở cửa", "24/7" },
                    { 2, 1, "Giá vé", "Miễn phí" },
                    { 3, 1, "Địa chỉ", "Quận Hoàn Kiếm, Hà Nội" },
                    { 4, 2, "Giờ mở cửa", "8:00 - 17:00" },
                    { 5, 2, "Giá vé", "30.000 VND" },
                    { 6, 2, "Địa chỉ", "58 Quốc Tử Giám, Đống Đa, Hà Nội" },
                    { 7, 15, "Giờ mở cửa", "7:30 - 21:30" },
                    { 8, 15, "Giá vé", "750.000 VND" },
                    { 9, 15, "Địa chỉ", "Hoà Ninh, Hoà Vang, Đà Nẵng" },
                    { 10, 20, "Giờ mở cửa", "7:00 - 17:30" },
                    { 11, 20, "Giá vé", "200.000 VND" },
                    { 12, 20, "Địa chỉ", "Thành phố Huế, Thừa Thiên Huế" },
                    { 13, 25, "Giờ mở cửa", "8:30 - 21:00" },
                    { 14, 25, "Giá vé", "880.000 VND" },
                    { 15, 25, "Địa chỉ", "Đảo Hòn Tre, Nha Trang, Khánh Hòa" },
                    { 16, 10, "Giờ mở cửa", "8:00 - 17:00" },
                    { 17, 10, "Giá vé", "Miễn phí" },
                    { 18, 10, "Địa chỉ", "Công xã Paris, Bến Nghé, Quận 1, TP.HCM" },
                    { 19, 30, "Giờ mở cửa", "7:30 - 17:30" },
                    { 20, 30, "Giá vé", "700.000 VND" },
                    { 21, 30, "Địa chỉ", "Thị trấn Sa Pa, Lào Cai" }
                });

            migrationBuilder.InsertData(
                table: "DestinationImages",
                columns: new[] { "ImageId", "DestinationId", "ImageUrl", "IsPrimary" },
                values: new object[,]
                {
                    { 1, 1, "/images/destinations/hanoi/ho-guom-1.jpg", true },
                    { 2, 1, "/images/destinations/hanoi/ho-guom-2.jpg", false },
                    { 3, 2, "/images/destinations/hanoi/van-mieu-1.jpg", true },
                    { 4, 2, "/images/destinations/hanoi/van-mieu-2.jpg", false },
                    { 5, 3, "/images/destinations/hanoi/lang-chu-tich-1.jpg", true },
                    { 6, 3, "/images/destinations/hanoi/lang-chu-tich-2.jpg", false },
                    { 7, 4, "/images/destinations/hanoi/pho-co-1.jpg", true },
                    { 8, 4, "/images/destinations/hanoi/pho-co-2.jpg", false },
                    { 9, 5, "/images/destinations/hanoi/hoang-thanh-1.jpg", true },
                    { 10, 5, "/images/destinations/hanoi/hoang-thanh-2.jpg", false },
                    { 11, 15, "/images/destinations/danang/ba-na-hills-1.jpg", true },
                    { 12, 15, "/images/destinations/danang/ba-na-hills-2.jpg", false },
                    { 13, 16, "/images/destinations/danang/my-khe-1.jpg", true },
                    { 14, 16, "/images/destinations/danang/my-khe-2.jpg", false },
                    { 15, 20, "/images/destinations/hue/dai-noi-1.jpg", true },
                    { 16, 20, "/images/destinations/hue/dai-noi-2.jpg", false },
                    { 17, 25, "/images/destinations/nhatrang/vinpearl-1.jpg", true },
                    { 18, 25, "/images/destinations/nhatrang/vinpearl-2.jpg", false },
                    { 19, 10, "/images/destinations/hochiminh/notre-dame-1.jpg", true },
                    { 20, 10, "/images/destinations/hochiminh/notre-dame-2.jpg", false },
                    { 21, 30, "/images/destinations/sapa/fansipan-1.jpg", true },
                    { 22, 30, "/images/destinations/sapa/fansipan-2.jpg", false }
                });

            migrationBuilder.InsertData(
                table: "Tours",
                columns: new[] { "TourId", "AdultPrice", "ChildPrice", "CreatedAt", "Description", "Duration", "IsActive", "IsFeatured", "TourName", "TourismCompanyId", "Transportation", "UpdatedAt" },
                values: new object[,]
                {
                    { 1, 4990000m, 4990000m, new DateTime(2025, 5, 27, 14, 54, 32, 423, DateTimeKind.Local).AddTicks(5817), "Khám phá vẻ đẹp của Hà Nội với tour trọn gói. Tham quan các địa điểm nổi tiếng như Hồ Gươm, Văn Miếu, Hoàng thành Thăng Long và trải nghiệm văn hóa ẩm thực đường phố Hà Nội.", 3, true, true, "Tour Hà Nội", 1, "Xe du lịch", new DateTime(2025, 5, 27, 14, 54, 32, 423, DateTimeKind.Local).AddTicks(5818) },
                    { 2, 5990000m, 5990000m, new DateTime(2025, 5, 27, 14, 54, 32, 423, DateTimeKind.Local).AddTicks(5825), "Khám phá vẻ đẹp của Đà Nẵng với tour trọn gói. Tham quan Bà Nà Hills, Cầu Rồng, bãi biển Mỹ Khê và Ngũ Hành Sơn. Trải nghiệm ẩm thực đặc sắc của miền Trung.", 4, true, true, "Tour Đà Nẵng", 1, "Xe du lịch", new DateTime(2025, 5, 27, 14, 54, 32, 423, DateTimeKind.Local).AddTicks(5826) },
                    { 3, 3990000m, 3990000m, new DateTime(2025, 5, 27, 14, 54, 32, 423, DateTimeKind.Local).AddTicks(5831), "Khám phá vẻ đẹp của Huế với tour trọn gói. Tham quan Đại Nội, các lăng tẩm vua Nguyễn, chùa Thiên Mụ và thưởng thức ẩm thực cung đình Huế.", 2, true, true, "Tour Huế", 2, "Xe du lịch", new DateTime(2025, 5, 27, 14, 54, 32, 423, DateTimeKind.Local).AddTicks(5832) },
                    { 4, 6990000m, 6990000m, new DateTime(2025, 5, 27, 14, 54, 32, 423, DateTimeKind.Local).AddTicks(5837), "Khám phá vẻ đẹp của Nha Trang với tour trọn gói. Tham quan Vinpearl Land, vịnh Nha Trang, Tháp Bà Ponagar và tắm biển tại các bãi biển đẹp nhất Nha Trang.", 5, true, true, "Tour Nha Trang", 2, "Xe du lịch", new DateTime(2025, 5, 27, 14, 54, 32, 423, DateTimeKind.Local).AddTicks(5838) },
                    { 5, 5500000m, 4500000m, new DateTime(2025, 5, 27, 14, 54, 32, 423, DateTimeKind.Local).AddTicks(5842), "Khám phá vẻ đẹp của Hồ Chí Minh với tour trọn gói. Tham quan Nhà thờ Đức Bà, Bưu điện Trung tâm, Chợ Bến Thành, Dinh Độc Lập và trải nghiệm cuộc sống sôi động của thành phố.", 3, true, true, "Tour Hồ Chí Minh", 3, "Xe du lịch", new DateTime(2025, 5, 27, 14, 54, 32, 423, DateTimeKind.Local).AddTicks(5843) },
                    { 6, 5990000m, 4990000m, new DateTime(2025, 5, 27, 14, 54, 32, 423, DateTimeKind.Local).AddTicks(5848), "Khám phá vẻ đẹp của Sapa với tour trọn gói. Chinh phục Fansipan, tham quan các bản làng dân tộc, ngắm ruộng bậc thang và trải nghiệm văn hóa vùng cao.", 4, true, true, "Tour Sapa", 3, "Xe du lịch", new DateTime(2025, 5, 27, 14, 54, 32, 423, DateTimeKind.Local).AddTicks(5849) },
                    { 7, 5990000m, 4990000m, new DateTime(2025, 5, 27, 14, 54, 32, 423, DateTimeKind.Local).AddTicks(5853), "Khám phá vẻ đẹp của Vịnh Hạ Long với tour trọn gói. Tham quan các hang động, đảo đá và trải nghiệm đêm trên vịnh Hạ Long.", 3, true, true, "Tour Hạ Long", 1, "Xe du lịch + Tàu", new DateTime(2025, 5, 27, 14, 54, 32, 423, DateTimeKind.Local).AddTicks(5854) },
                    { 8, 3990000m, 3490000m, new DateTime(2025, 5, 27, 14, 54, 32, 423, DateTimeKind.Local).AddTicks(5860), "Khám phá vẻ đẹp của Hội An với tour trọn gói. Tham quan phố cổ, làng nghề truyền thống và trải nghiệm không khí cổ kính của Hội An.", 2, true, true, "Tour Hội An", 2, "Xe du lịch", new DateTime(2025, 5, 27, 14, 54, 32, 423, DateTimeKind.Local).AddTicks(5861) },
                    { 9, 5490000m, 4490000m, new DateTime(2025, 5, 27, 14, 54, 32, 423, DateTimeKind.Local).AddTicks(5865), "Khám phá vẻ đẹp của Đà Lạt với tour trọn gói. Tham quan các điểm du lịch nổi tiếng và trải nghiệm khí hậu mát mẻ của thành phố ngàn hoa.", 4, true, true, "Tour Đà Lạt", 3, "Xe du lịch", new DateTime(2025, 5, 27, 14, 54, 32, 423, DateTimeKind.Local).AddTicks(5866) },
                    { 10, 8990000m, 7990000m, new DateTime(2025, 5, 27, 14, 54, 32, 423, DateTimeKind.Local).AddTicks(5871), "Khám phá vẻ đẹp của Phú Quốc với tour trọn gói. Tham quan các bãi biển đẹp, làng chài và trải nghiệm hoạt động lặn biển ngắm san hô.", 5, true, true, "Tour Phú Quốc", 1, "Máy bay + Xe du lịch", new DateTime(2025, 5, 27, 14, 54, 32, 423, DateTimeKind.Local).AddTicks(5872) }
                });

            migrationBuilder.InsertData(
                table: "Reviews",
                columns: new[] { "ReviewId", "Comment", "Rating", "ReviewDate", "TourId", "UserId" },
                values: new object[,]
                {
                    { 1, "Tour rất tuyệt vời, hướng dẫn viên nhiệt tình, các điểm tham quan đều rất đẹp!", 5, new DateTime(2025, 5, 22, 14, 54, 32, 423, DateTimeKind.Local).AddTicks(6583), 1, 1 },
                    { 2, "Tôi rất hài lòng với chuyến đi này, chỉ tiếc là thời gian hơi ngắn.", 4, new DateTime(2025, 5, 17, 14, 54, 32, 423, DateTimeKind.Local).AddTicks(6594), 1, 2 },
                    { 3, "Đà Nẵng quá đẹp, đặc biệt là Bà Nà Hills và Cầu Vàng. Sẽ quay lại lần nữa!", 5, new DateTime(2025, 5, 20, 14, 54, 32, 423, DateTimeKind.Local).AddTicks(6597), 2, 3 },
                    { 4, "Tour được tổ chức rất chuyên nghiệp, hướng dẫn viên vui tính và am hiểu lịch sử.", 4, new DateTime(2025, 5, 12, 14, 54, 32, 423, DateTimeKind.Local).AddTicks(6601), 2, 4 },
                    { 5, "Huế có quá nhiều di tích lịch sử đẹp, ẩm thực cũng rất ngon. Rất đáng để đi!", 5, new DateTime(2025, 5, 19, 14, 54, 32, 423, DateTimeKind.Local).AddTicks(6604), 3, 5 },
                    { 6, "Tour được tổ chức tốt, chỉ tiếc là thời tiết không ủng hộ.", 4, new DateTime(2025, 5, 7, 14, 54, 32, 423, DateTimeKind.Local).AddTicks(6607), 3, 1 }
                });

            migrationBuilder.InsertData(
                table: "TourDestinations",
                columns: new[] { "TourDestinationId", "DestinationId", "OrderNumber", "TourId" },
                values: new object[,]
                {
                    { 1, 1, 1, 1 },
                    { 2, 2, 2, 1 },
                    { 3, 5, 3, 1 },
                    { 4, 15, 1, 2 },
                    { 5, 16, 2, 2 },
                    { 6, 17, 3, 2 },
                    { 7, 18, 4, 2 },
                    { 8, 20, 1, 3 },
                    { 9, 21, 2, 3 },
                    { 10, 22, 3, 3 },
                    { 11, 25, 1, 4 },
                    { 12, 26, 2, 4 },
                    { 13, 27, 3, 4 },
                    { 14, 10, 1, 5 },
                    { 15, 11, 2, 5 },
                    { 16, 12, 3, 5 },
                    { 17, 13, 4, 5 },
                    { 18, 30, 1, 6 },
                    { 19, 31, 2, 6 },
                    { 20, 32, 3, 6 }
                });

            migrationBuilder.InsertData(
                table: "TourImages",
                columns: new[] { "ImageId", "ImageUrl", "IsPrimary", "TourId" },
                values: new object[,]
                {
                    { 1, "https://images.unsplash.com/photo-1509030450996-dd1a26dda07a?q=80&w=2123&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", true, 1 },
                    { 2, "https://images.unsplash.com/photo-1656520727264-67d0a9af5e85?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", false, 1 },
                    { 3, "https://images.unsplash.com/photo-1653914902511-76e819452618?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", false, 1 },
                    { 4, "https://images.unsplash.com/photo-1676019266474-3538f3f19e6b?q=80&w=1953&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", false, 1 },
                    { 5, "https://images.unsplash.com/photo-1558002890-c0b30998d1e6?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", true, 2 },
                    { 6, "https://images.unsplash.com/photo-1719836731185-0ff5ad81d1fb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", false, 2 },
                    { 7, "https://images.unsplash.com/photo-1708192071369-0296db1421aa?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", false, 2 },
                    { 8, "https://images.unsplash.com/photo-1701396173275-835886dd72ce?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZHJhZ29uJTIwYnJpZGdlfGVufDB8fDB8fHww", false, 2 },
                    { 9, "/images/tours/hue/hue-main.jpg", true, 3 },
                    { 10, "/images/tours/hue/dai-noi.jpg", false, 3 },
                    { 11, "/images/tours/hue/thien-mu.jpg", false, 3 },
                    { 12, "/images/tours/hue/tu-duc-tomb.jpg", false, 3 },
                    { 13, "/images/tours/nhatrang/nhatrang-main.jpg", true, 4 },
                    { 14, "/images/tours/nhatrang/vinpearl.jpg", false, 4 },
                    { 15, "/images/tours/nhatrang/nhatrang-bay.jpg", false, 4 },
                    { 16, "/images/tours/nhatrang/ponagar.jpg", false, 4 },
                    { 17, "/images/tours/hochiminh/hochiminh-main.jpg", true, 5 },
                    { 18, "/images/tours/hochiminh/notre-dame.jpg", false, 5 },
                    { 19, "/images/tours/hochiminh/central-post-office.jpg", false, 5 },
                    { 20, "/images/tours/hochiminh/ben-thanh-market.jpg", false, 5 },
                    { 21, "/images/tours/sapa/sapa-main.jpg", true, 6 },
                    { 22, "/images/tours/sapa/fansipan.jpg", false, 6 },
                    { 23, "/images/tours/sapa/cat-cat-village.jpg", false, 6 },
                    { 24, "/images/tours/sapa/muong-hoa-valley.jpg", false, 6 }
                });

            migrationBuilder.InsertData(
                table: "TourSchedules",
                columns: new[] { "ScheduleId", "Activities", "DayNumber", "Description", "TourId" },
                values: new object[,]
                {
                    { 1, "Sáng: Tham quan Hồ Gươm, Đền Ngọc Sơn\nTrưa: Ăn trưa tại nhà hàng địa phương\nChiều: Tham quan phố cổ Hà Nội\nTối: Thưởng thức ẩm thực đường phố", 1, "Ngày 1: Khám phá trung tâm Hà Nội", 1 },
                    { 2, "Sáng: Tham quan Văn Miếu - Quốc Tử Giám\nTrưa: Ăn trưa tại nhà hàng địa phương\nChiều: Tham quan Hoàng thành Thăng Long\nTối: Xem biểu diễn múa rối nước", 2, "Ngày 2: Di sản văn hóa Hà Nội", 1 },
                    { 3, "Sáng: Tham quan Lăng Chủ tịch Hồ Chí Minh\nTrưa: Ăn trưa tại nhà hàng địa phương\nChiều: Mua sắm tại các trung tâm thương mại\nTối: Tiệc chia tay", 3, "Ngày 3: Hà Nội hiện đại", 1 },
                    { 4, "Sáng: Khởi hành đi Bà Nà Hills\nTrưa: Ăn trưa tại Bà Nà Hills\nChiều: Tham quan Cầu Vàng, làng Pháp\nTối: Về khách sạn nghỉ ngơi", 1, "Ngày 1: Khám phá Bà Nà Hills", 2 },
                    { 5, "Sáng: Tham quan Ngũ Hành Sơn\nTrưa: Ăn trưa tại nhà hàng địa phương\nChiều: Tham quan làng đá Non Nước\nTối: Thưởng thức ẩm thực địa phương", 2, "Ngày 2: Khám phá Ngũ Hành Sơn", 2 },
                    { 6, "Sáng: Tham quan bán đảo Sơn Trà\nTrưa: Ăn trưa tại nhà hàng địa phương\nChiều: Tham quan chùa Linh Ứng\nTối: Thưởng thức hải sản tươi ngon", 3, "Ngày 3: Khám phá bán đảo Sơn Trà", 2 },
                    { 7, "Sáng: Tắm biển Mỹ Khê\nTrưa: Ăn trưa tại nhà hàng ven biển\nChiều: Tham quan Cầu Rồng\nTối: Ngắm Cầu Rồng phun lửa và nước", 4, "Ngày 4: Tắm biển Mỹ Khê", 2 },
                    { 8, "Sáng: Tham quan Đại Nội Huế\nTrưa: Ăn trưa với ẩm thực cung đình\nChiều: Tham quan Bảo tàng Cổ vật Cung đình Huế\nTối: Thưởng thức ca Huế trên sông Hương", 1, "Ngày 1: Khám phá Đại Nội Huế", 3 },
                    { 9, "Sáng: Tham quan Lăng Tự Đức và Lăng Khải Định\nTrưa: Ăn trưa tại nhà hàng địa phương\nChiều: Tham quan chùa Thiên Mụ\nTối: Thưởng thức ẩm thực Huế", 2, "Ngày 2: Tham quan các lăng tẩm", 3 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_BookingDetails_BookingId",
                table: "BookingDetails",
                column: "BookingId");

            migrationBuilder.CreateIndex(
                name: "IX_Bookings_TourId",
                table: "Bookings",
                column: "TourId");

            migrationBuilder.CreateIndex(
                name: "IX_Bookings_UserId",
                table: "Bookings",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_CustomTourDestinations_CustomTourId",
                table: "CustomTourDestinations",
                column: "CustomTourId");

            migrationBuilder.CreateIndex(
                name: "IX_CustomTourDestinations_DestinationId",
                table: "CustomTourDestinations",
                column: "DestinationId");

            migrationBuilder.CreateIndex(
                name: "IX_CustomTours_UserId",
                table: "CustomTours",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_DestinationDetails_DestinationId",
                table: "DestinationDetails",
                column: "DestinationId");

            migrationBuilder.CreateIndex(
                name: "IX_DestinationImages_DestinationId",
                table: "DestinationImages",
                column: "DestinationId");

            migrationBuilder.CreateIndex(
                name: "IX_Destinations_CityId",
                table: "Destinations",
                column: "CityId");

            migrationBuilder.CreateIndex(
                name: "IX_Reviews_TourId",
                table: "Reviews",
                column: "TourId");

            migrationBuilder.CreateIndex(
                name: "IX_Reviews_UserId",
                table: "Reviews",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_SavedTours_TourId",
                table: "SavedTours",
                column: "TourId");

            migrationBuilder.CreateIndex(
                name: "IX_SavedTours_UserId",
                table: "SavedTours",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_TourDestinations_DestinationId",
                table: "TourDestinations",
                column: "DestinationId");

            migrationBuilder.CreateIndex(
                name: "IX_TourDestinations_TourId",
                table: "TourDestinations",
                column: "TourId");

            migrationBuilder.CreateIndex(
                name: "IX_TourImages_TourId",
                table: "TourImages",
                column: "TourId");

            migrationBuilder.CreateIndex(
                name: "IX_TourismCompanies_UserId",
                table: "TourismCompanies",
                column: "UserId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Tours_TourismCompanyId",
                table: "Tours",
                column: "TourismCompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_TourSchedules_TourId",
                table: "TourSchedules",
                column: "TourId");

            migrationBuilder.CreateIndex(
                name: "IX_UserRoles_RoleId",
                table: "UserRoles",
                column: "RoleId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Blogs");

            migrationBuilder.DropTable(
                name: "BookingDetails");

            migrationBuilder.DropTable(
                name: "CustomTourDestinations");

            migrationBuilder.DropTable(
                name: "DestinationDetails");

            migrationBuilder.DropTable(
                name: "DestinationImages");

            migrationBuilder.DropTable(
                name: "Reviews");

            migrationBuilder.DropTable(
                name: "SavedTours");

            migrationBuilder.DropTable(
                name: "TourDestinations");

            migrationBuilder.DropTable(
                name: "TourImages");

            migrationBuilder.DropTable(
                name: "TourSchedules");

            migrationBuilder.DropTable(
                name: "UserRoles");

            migrationBuilder.DropTable(
                name: "Voucher");

            migrationBuilder.DropTable(
                name: "Bookings");

            migrationBuilder.DropTable(
                name: "CustomTours");

            migrationBuilder.DropTable(
                name: "Destinations");

            migrationBuilder.DropTable(
                name: "Roles");

            migrationBuilder.DropTable(
                name: "Tours");

            migrationBuilder.DropTable(
                name: "Cities");

            migrationBuilder.DropTable(
                name: "TourismCompanies");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
