using Microsoft.EntityFrameworkCore;

namespace STPS_REACT.Server.Models
{
    public class BookTourContext : DbContext
    {
        public BookTourContext(DbContextOptions<BookTourContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<UserRole> UserRoles { get; set; }
        public DbSet<City> Cities { get; set; }
        public DbSet<Destination> Destinations { get; set; }
        public DbSet<Tour> Tours { get; set; }
        public DbSet<TourDestination> TourDestinations { get; set; }
        public DbSet<Booking> Bookings { get; set; }
        public DbSet<BookingDetail> BookingDetails { get; set; }
        public DbSet<TourImage> TourImages { get; set; }
        public DbSet<DestinationImage> DestinationImages { get; set; }
        public DbSet<SavedTour> SavedTours { get; set; }
        public DbSet<Review> Reviews { get; set; }
        public DbSet<TourSchedule> TourSchedules { get; set; }
        public DbSet<DestinationDetail> DestinationDetails { get; set; }
        public DbSet<CustomTour> CustomTours { get; set; }
        public DbSet<CustomTourDestination> CustomTourDestinations { get; set; }
        public DbSet<TourismCompany> TourismCompanies { get; set; }
        public DbSet<PaymentTransaction> PaymentTransactions { get; set; }
        public DbSet<RevenueTransaction> RevenueTransactions { get; set; }
        public DbSet<RefundRequest> RefundRequests { get; set; }

        public DbSet<Voucher> Voucher { get; set; }

        public DbSet<Blog> Blogs { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<UserRole>()
      .HasKey(ur => new { ur.UserId, ur.RoleId });

            // Configure relationships
            ConfigureRelationships(modelBuilder);

            // Seed data
            SeedData(modelBuilder);
        }

        private void ConfigureRelationships(ModelBuilder modelBuilder)
        {
            // User - TourismCompany (1:1)
            modelBuilder.Entity<User>()
                .HasOne(u => u.TourismCompany)
                .WithOne(tc => tc.User)
                .HasForeignKey<TourismCompany>(tc => tc.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            // TourismCompany - Tour (1:n)
            modelBuilder.Entity<Tour>()
                .HasOne(t => t.TourismCompany)
                .WithMany(tc => tc.Tours)
                .HasForeignKey(t => t.TourismCompanyId)
                .OnDelete(DeleteBehavior.SetNull);

            // Payment and Revenue Relationships

            // Booking - PaymentTransaction (1:n)
            modelBuilder.Entity<PaymentTransaction>()
                .HasOne(pt => pt.Booking)
                .WithMany(b => b.PaymentTransactions)
                .HasForeignKey(pt => pt.BookingId)
                .OnDelete(DeleteBehavior.Cascade);

            // Booking - RevenueTransaction (1:n)
            modelBuilder.Entity<RevenueTransaction>()
                .HasOne(rt => rt.Booking)
                .WithMany(b => b.RevenueTransactions)
                .HasForeignKey(rt => rt.BookingId)
                .OnDelete(DeleteBehavior.Cascade);

            // TourismCompany - RevenueTransaction (1:n)
            modelBuilder.Entity<RevenueTransaction>()
                .HasOne(rt => rt.TourismCompany)
                .WithMany(tc => tc.RevenueTransactions)
                .HasForeignKey(rt => rt.TourismCompanyId)
                .OnDelete(DeleteBehavior.Restrict);

            // Booking - RefundRequest (1:1)
            modelBuilder.Entity<RefundRequest>()
                .HasOne(rr => rr.Booking)
                .WithOne(b => b.RefundRequest)
                .HasForeignKey<RefundRequest>(rr => rr.BookingId)
                .OnDelete(DeleteBehavior.Cascade);
        }

        private void SeedData(ModelBuilder modelBuilder)
        {
            // Seed Roles
            modelBuilder.Entity<Role>().HasData(
                new Role { RoleId = 1, RoleName = "User" },
                new Role { RoleId = 2, RoleName = "Admin" },
                new Role { RoleId = 3, RoleName = "Manager" },
                new Role { RoleId = 4, RoleName = "Tourism Company" }
            );



            modelBuilder.Entity<UserRole>().HasData(
                new UserRole { UserId = 1, RoleId = 4 }, // User 1 has Tourism Company role
                new UserRole { UserId = 2, RoleId = 4 }, // User 2 has Tourism Company role
                new UserRole { UserId = 3, RoleId = 4 }, // User 3 has Tourism Company role
                new UserRole { UserId = 4, RoleId = 1 }, // User 4 has User role
                new UserRole { UserId = 5, RoleId = 1 }  // User 5 has User role
            );
            // Seed Users
            modelBuilder.Entity<User>().HasData(
                new User { UserId = 1, Username = "user1", Password = "hashed_password_here", FullName = "Nguyễn Văn A", Email = "user1@example.com", Phone = "0901234567", Address = "Hà Nội", CreatedAt = DateTime.Now },
                new User { UserId = 2, Username = "user2", Password = "hashed_password_here", FullName = "Trần Thị B", Email = "user2@example.com", Phone = "0901234568", Address = "Hồ Chí Minh", CreatedAt = DateTime.Now },
                new User { UserId = 3, Username = "user3", Password = "hashed_password_here", FullName = "Lê Văn C", Email = "user3@example.com", Phone = "0901234569", Address = "Đà Nẵng", CreatedAt = DateTime.Now },
                new User { UserId = 4, Username = "user4", Password = "hashed_password_here", FullName = "Phạm Thị D", Email = "user4@example.com", Phone = "0901234570", Address = "Huế", CreatedAt = DateTime.Now },
                new User { UserId = 5, Username = "user5", Password = "hashed_password_here", FullName = "Hoàng Văn E", Email = "user5@example.com", Phone = "0901234571", Address = "Nha Trang", CreatedAt = DateTime.Now }
            );

            // Seed Cities
            modelBuilder.Entity<City>().HasData(
                new City { CityId = 1, CityName = "Hà Nội", Description = "Thủ đô của Việt Nam, nơi hội tụ văn hóa ngàn năm văn hiến với nhiều di tích lịch sử và danh lam thắng cảnh nổi tiếng.", IsActive = true },
                new City { CityId = 2, CityName = "Hồ Chí Minh", Description = "Thành phố năng động nhất Việt Nam, trung tâm kinh tế, văn hóa và giáo dục lớn của cả nước.", IsActive = true },
                new City { CityId = 3, CityName = "Đà Nẵng", Description = "Thành phố biển xinh đẹp với bãi biển Mỹ Khê nổi tiếng và cầu Rồng biểu tượng.", IsActive = true },
                new City { CityId = 4, CityName = "Huế", Description = "Cố đô của Việt Nam với hệ thống di tích cố đô Huế được UNESCO công nhận là Di sản Văn hóa Thế giới.", IsActive = true },
                new City { CityId = 5, CityName = "Nha Trang", Description = "Thành phố biển nổi tiếng với những bãi biển đẹp, hoạt động du lịch sôi động và ẩm thực hải sản phong phú.", IsActive = true },
                new City { CityId = 6, CityName = "Sapa", Description = "Thị trấn trong sương mù, nổi tiếng với những thửa ruộng bậc thang và văn hóa đặc sắc của các dân tộc thiểu số.", IsActive = true },
                new City { CityId = 7, CityName = "Hạ Long", Description = "Nổi tiếng với Vịnh Hạ Long - một trong 7 kỳ quan thiên nhiên mới của thế giới.", IsActive = true },
                new City { CityId = 8, CityName = "Hội An", Description = "Phố cổ Hội An - Di sản Văn hóa Thế giới với kiến trúc cổ kính và những chiếc đèn lồng đầy màu sắc.", IsActive = true },
                new City { CityId = 9, CityName = "Đà Lạt", Description = "Thành phố ngàn hoa, thành phố sương mù với khí hậu mát mẻ quanh năm.", IsActive = true },
                new City { CityId = 10, CityName = "Phú Quốc", Description = "Hòn đảo lớn nhất Việt Nam với những bãi biển hoang sơ và nước biển trong xanh.", IsActive = true }
            );

            // Seed Destinations (Hà Nội)
            modelBuilder.Entity<Destination>().HasData(
                new Destination { DestinationId = 1, DestinationName = "Hồ Gươm", Description = "Biểu tượng của Thủ đô, nơi lưu giữ truyền thuyết về Rùa thần và gươm báu.", CityId = 1, IsActive = true, IsFeatured = true },
                new Destination { DestinationId = 2, DestinationName = "Văn Miếu - Quốc Tử Giám", Description = "Di tích lịch sử văn hóa, nơi thờ Khổng Tử và các bậc hiền triết, trường đại học đầu tiên của Việt Nam.", CityId = 1, IsActive = true, IsFeatured = true },
                new Destination { DestinationId = 3, DestinationName = "Lăng Chủ tịch Hồ Chí Minh", Description = "Công trình lịch sử văn hóa đặc biệt, nơi lưu giữ thi hài của Chủ tịch Hồ Chí Minh.", CityId = 1, IsActive = true, IsFeatured = true },
                new Destination { DestinationId = 4, DestinationName = "Phố cổ Hà Nội", Description = "Khu phố cổ với 36 phố phường, mang đậm bản sắc văn hóa Hà Nội truyền thống.", CityId = 1, IsActive = true, IsFeatured = true },
                new Destination { DestinationId = 5, DestinationName = "Hoàng thành Thăng Long", Description = "Di sản văn hóa thế giới, minh chứng cho lịch sử ngàn năm văn hiến của Thăng Long - Hà Nội.", CityId = 1, IsActive = true, IsFeatured = true },
                new Destination { DestinationId = 6, DestinationName = "Nhà hát Lớn Hà Nội", Description = "Công trình kiến trúc theo phong cách Pháp, biểu tượng của Hà Nội hiện đại.", CityId = 1, IsActive = true, IsFeatured = true },
                new Destination { DestinationId = 7, DestinationName = "Cầu Long Biên", Description = "Cây cầu lịch sử bắc qua sông Hồng, chứng nhân lịch sử của Hà Nội.", CityId = 1, IsActive = true, IsFeatured = true },
                new Destination { DestinationId = 8, DestinationName = "Công viên Thủ Lệ", Description = "Công viên và vườn thú lớn của Hà Nội, điểm vui chơi giải trí cho mọi lứa tuổi.", CityId = 1, IsActive = true, IsFeatured = true },
                new Destination { DestinationId = 9, DestinationName = "Hồ Tây", Description = "Hồ nước ngọt tự nhiên lớn nhất Hà Nội, nơi có nhiều đền chùa và cảnh đẹp.", CityId = 1, IsActive = true, IsFeatured = true },

                // Hồ Chí Minh
                new Destination { DestinationId = 10, DestinationName = "Nhà thờ Đức Bà", Description = "Công trình kiến trúc Gothic nổi tiếng, được xây dựng vào cuối thế kỷ 19.", CityId = 2, IsActive = true, IsFeatured = true },
                new Destination { DestinationId = 11, DestinationName = "Bưu điện Trung tâm Sài Gòn", Description = "Công trình kiến trúc cổ điển Pháp, một trong những công trình lâu đời nhất ở Sài Gòn.", CityId = 2, IsActive = true, IsFeatured = true },
                new Destination { DestinationId = 12, DestinationName = "Chợ Bến Thành", Description = "Khu chợ nổi tiếng và lâu đời nhất Sài Gòn, biểu tượng của thành phố.", CityId = 2, IsActive = true, IsFeatured = true },
                new Destination { DestinationId = 13, DestinationName = "Dinh Độc Lập", Description = "Công trình lịch sử gắn liền với sự kiện thống nhất đất nước.", CityId = 2, IsActive = true, IsFeatured = true },
                new Destination { DestinationId = 14, DestinationName = "Phố đi bộ Nguyễn Huệ", Description = "Khu phố đi bộ sầm uất và hiện đại nhất thành phố.", CityId = 2, IsActive = true, IsFeatured = true },

                // Đà Nẵng
                new Destination { DestinationId = 15, DestinationName = "Bà Nà Hills", Description = "Khu du lịch nổi tiếng với Cầu Vàng và nhiều công trình kiến trúc độc đáo.", CityId = 3, IsActive = true, IsFeatured = true },
                new Destination { DestinationId = 16, DestinationName = "Bãi biển Mỹ Khê", Description = "Một trong những bãi biển đẹp nhất hành tinh với cát trắng mịn và nước biển trong xanh.", CityId = 3, IsActive = true, IsFeatured = true },
                new Destination { DestinationId = 17, DestinationName = "Cầu Rồng", Description = "Biểu tượng của thành phố Đà Nẵng, cây cầu có thể phun lửa và nước vào cuối tuần.", CityId = 3, IsActive = true, IsFeatured = true },
                new Destination { DestinationId = 18, DestinationName = "Ngũ Hành Sơn", Description = "Danh thắng nổi tiếng với năm ngọn núi đá vôi và nhiều hang động, chùa chiền.", CityId = 3, IsActive = true, IsFeatured = true },
                new Destination { DestinationId = 19, DestinationName = "Bán đảo Sơn Trà", Description = "Khu bảo tồn thiên nhiên với rừng nguyên sinh và bãi biển hoang sơ.", CityId = 3, IsActive = true, IsFeatured = true },

                // Huế
                new Destination { DestinationId = 20, DestinationName = "Đại Nội Huế", Description = "Quần thể di tích cung đình triều Nguyễn, nơi sinh sống và làm việc của 13 vị vua triều Nguyễn.", CityId = 4, IsActive = true, IsFeatured = true },
                new Destination { DestinationId = 21, DestinationName = "Chùa Thiên Mụ", Description = "Ngôi chùa cổ nhất Huế với tháp Phước Duyên 7 tầng nổi tiếng.", CityId = 4, IsActive = true, IsFeatured = true },
                new Destination { DestinationId = 22, DestinationName = "Lăng Tự Đức", Description = "Công trình kiến trúc đẹp nhất trong các lăng tẩm ở Huế.", CityId = 4, IsActive = true, IsFeatured = true },
                new Destination { DestinationId = 23, DestinationName = "Lăng Khải Định", Description = "Lăng tẩm có kiến trúc độc đáo, kết hợp giữa phương Đông và phương Tây.", CityId = 4, IsActive = true, IsFeatured = true },
                new Destination { DestinationId = 24, DestinationName = "Sông Hương", Description = "Dòng sông thơ mộng chảy qua thành phố Huế, gắn liền với văn hóa và lịch sử Huế.", CityId = 4, IsActive = true, IsFeatured = true },

                // Nha Trang
                new Destination { DestinationId = 25, DestinationName = "Vinpearl Land", Description = "Khu du lịch giải trí hiện đại với nhiều trò chơi hấp dẫn và bãi biển riêng.", CityId = 5, IsActive = true, IsFeatured = true },
                new Destination { DestinationId = 26, DestinationName = "Vịnh Nha Trang", Description = "Một trong 29 vịnh đẹp nhất thế giới với làn nước trong xanh và nhiều đảo nhỏ.", CityId = 5, IsActive = true, IsFeatured = true },
                new Destination { DestinationId = 27, DestinationName = "Tháp Bà Ponagar", Description = "Di tích lịch sử văn hóa với kiến trúc độc đáo của vương quốc Chăm Pa cổ.", CityId = 5, IsActive = true, IsFeatured = true },
                new Destination { DestinationId = 28, DestinationName = "Hòn Chồng", Description = "Thắng cảnh thiên nhiên với những khối đá chồng lên nhau độc đáo.", CityId = 5, IsActive = true, IsFeatured = true },
                new Destination { DestinationId = 29, DestinationName = "Bãi biển Dốc Lết", Description = "Bãi biển hoang sơ với cát trắng mịn và nước biển trong xanh.", CityId = 5, IsActive = true, IsFeatured = true },

                // Sapa
                new Destination { DestinationId = 30, DestinationName = "Fansipan", Description = "Nóc nhà Đông Dương với độ cao 3.143m, nơi có hệ sinh thái đa dạng.", CityId = 6, IsActive = true, IsFeatured = true },
                new Destination { DestinationId = 31, DestinationName = "Bản Cát Cát", Description = "Bản làng cổ của người H'Mông với nét văn hóa đặc sắc và thác nước tuyệt đẹp.", CityId = 6, IsActive = true, IsFeatured = true },
                new Destination { DestinationId = 32, DestinationName = "Thung lũng Mường Hoa", Description = "Thung lũng xinh đẹp với những thửa ruộng bậc thang tuyệt đẹp.", CityId = 6, IsActive = true, IsFeatured = true },
                new Destination { DestinationId = 33, DestinationName = "Bản Tả Phìn", Description = "Bản làng của người Dao Đỏ với nghề dệt vải và thêu thùa truyền thống.", CityId = 6, IsActive = true, IsFeatured = true },
                new Destination { DestinationId = 34, DestinationName = "Cổng Trời", Description = "Điểm ngắm cảnh tuyệt đẹp với tầm nhìn bao quát toàn bộ thung lũng Mường Hoa.", CityId = 6, IsActive = true, IsFeatured = true }
            );

            // Seed Tours
            modelBuilder.Entity<Tour>().HasData(
                new Tour { TourId = 1, TourName = "Tour Hà Nội", Description = "Khám phá vẻ đẹp của Hà Nội với tour trọn gói. Tham quan các địa điểm nổi tiếng như Hồ Gươm, Văn Miếu, Hoàng thành Thăng Long và trải nghiệm văn hóa ẩm thực đường phố Hà Nội.", Duration = 3, Transportation = "Xe du lịch", AdultPrice = 4990000, ChildPrice = 4990000, IsActive = true, IsFeatured = true, CreatedAt = DateTime.Now, UpdatedAt = DateTime.Now, TourismCompanyId = 1 },
                new Tour { TourId = 2, TourName = "Tour Đà Nẵng", Description = "Khám phá vẻ đẹp của Đà Nẵng với tour trọn gói. Tham quan Bà Nà Hills, Cầu Rồng, bãi biển Mỹ Khê và Ngũ Hành Sơn. Trải nghiệm ẩm thực đặc sắc của miền Trung.", Duration = 4, Transportation = "Xe du lịch", AdultPrice = 5990000, ChildPrice = 5990000, IsActive = true, IsFeatured = true, CreatedAt = DateTime.Now, UpdatedAt = DateTime.Now, TourismCompanyId = 1 },
                new Tour { TourId = 3, TourName = "Tour Huế", Description = "Khám phá vẻ đẹp của Huế với tour trọn gói. Tham quan Đại Nội, các lăng tẩm vua Nguyễn, chùa Thiên Mụ và thưởng thức ẩm thực cung đình Huế.", Duration = 2, Transportation = "Xe du lịch", AdultPrice = 3990000, ChildPrice = 3990000, IsActive = true, IsFeatured = true, CreatedAt = DateTime.Now, UpdatedAt = DateTime.Now, TourismCompanyId = 2 },
                new Tour { TourId = 4, TourName = "Tour Nha Trang", Description = "Khám phá vẻ đẹp của Nha Trang với tour trọn gói. Tham quan Vinpearl Land, vịnh Nha Trang, Tháp Bà Ponagar và tắm biển tại các bãi biển đẹp nhất Nha Trang.", Duration = 5, Transportation = "Xe du lịch", AdultPrice = 6990000, ChildPrice = 6990000, IsActive = true, IsFeatured = true, CreatedAt = DateTime.Now, UpdatedAt = DateTime.Now, TourismCompanyId = 2 },
                new Tour { TourId = 5, TourName = "Tour Hồ Chí Minh", Description = "Khám phá vẻ đẹp của Hồ Chí Minh với tour trọn gói. Tham quan Nhà thờ Đức Bà, Bưu điện Trung tâm, Chợ Bến Thành, Dinh Độc Lập và trải nghiệm cuộc sống sôi động của thành phố.", Duration = 3, Transportation = "Xe du lịch", AdultPrice = 5500000, ChildPrice = 4500000, IsActive = true, IsFeatured = true, CreatedAt = DateTime.Now, UpdatedAt = DateTime.Now, TourismCompanyId = 3 },
                new Tour { TourId = 6, TourName = "Tour Sapa", Description = "Khám phá vẻ đẹp của Sapa với tour trọn gói. Chinh phục Fansipan, tham quan các bản làng dân tộc, ngắm ruộng bậc thang và trải nghiệm văn hóa vùng cao.", Duration = 4, Transportation = "Xe du lịch", AdultPrice = 5990000, ChildPrice = 4990000, IsActive = true, IsFeatured = true, CreatedAt = DateTime.Now, UpdatedAt = DateTime.Now, TourismCompanyId = 3 },
                new Tour { TourId = 7, TourName = "Tour Hạ Long", Description = "Khám phá vẻ đẹp của Vịnh Hạ Long với tour trọn gói. Tham quan các hang động, đảo đá và trải nghiệm đêm trên vịnh Hạ Long.", Duration = 3, Transportation = "Xe du lịch + Tàu", AdultPrice = 5990000, ChildPrice = 4990000, IsActive = true, IsFeatured = true, CreatedAt = DateTime.Now, UpdatedAt = DateTime.Now, TourismCompanyId = 1 },
                new Tour { TourId = 8, TourName = "Tour Hội An", Description = "Khám phá vẻ đẹp của Hội An với tour trọn gói. Tham quan phố cổ, làng nghề truyền thống và trải nghiệm không khí cổ kính của Hội An.", Duration = 2, Transportation = "Xe du lịch", AdultPrice = 3990000, ChildPrice = 3490000, IsActive = true, IsFeatured = true, CreatedAt = DateTime.Now, UpdatedAt = DateTime.Now, TourismCompanyId = 2 },
                new Tour { TourId = 9, TourName = "Tour Đà Lạt", Description = "Khám phá vẻ đẹp của Đà Lạt với tour trọn gói. Tham quan các điểm du lịch nổi tiếng và trải nghiệm khí hậu mát mẻ của thành phố ngàn hoa.", Duration = 4, Transportation = "Xe du lịch", AdultPrice = 5490000, ChildPrice = 4490000, IsActive = true, IsFeatured = true, CreatedAt = DateTime.Now, UpdatedAt = DateTime.Now, TourismCompanyId = 3 },
                new Tour { TourId = 10, TourName = "Tour Phú Quốc", Description = "Khám phá vẻ đẹp của Phú Quốc với tour trọn gói. Tham quan các bãi biển đẹp, làng chài và trải nghiệm hoạt động lặn biển ngắm san hô.", Duration = 5, Transportation = "Máy bay + Xe du lịch", AdultPrice = 8990000, ChildPrice = 7990000, IsActive = true, IsFeatured = true, CreatedAt = DateTime.Now, UpdatedAt = DateTime.Now, TourismCompanyId = 1 }
            );

            // Seed TourDestinations (Tour Hà Nội)
            modelBuilder.Entity<TourDestination>().HasData(
                // Tour Hà Nội
                new TourDestination { TourDestinationId = 1, TourId = 1, DestinationId = 1, OrderNumber = 1 }, // Hồ Gươm
                new TourDestination { TourDestinationId = 2, TourId = 1, DestinationId = 2, OrderNumber = 2 }, // Văn Miếu
                new TourDestination { TourDestinationId = 3, TourId = 1, DestinationId = 5, OrderNumber = 3 }, // Hoàng thành Thăng Long

                // Tour Đà Nẵng
                new TourDestination { TourDestinationId = 4, TourId = 2, DestinationId = 15, OrderNumber = 1 }, // Bà Nà Hills
                new TourDestination { TourDestinationId = 5, TourId = 2, DestinationId = 16, OrderNumber = 2 }, // Bãi biển Mỹ Khê
                new TourDestination { TourDestinationId = 6, TourId = 2, DestinationId = 17, OrderNumber = 3 }, // Cầu Rồng
                new TourDestination { TourDestinationId = 7, TourId = 2, DestinationId = 18, OrderNumber = 4 }, // Ngũ Hành Sơn

                // Tour Huế
                new TourDestination { TourDestinationId = 8, TourId = 3, DestinationId = 20, OrderNumber = 1 }, // Đại Nội Huế
                new TourDestination { TourDestinationId = 9, TourId = 3, DestinationId = 21, OrderNumber = 2 }, // Chùa Thiên Mụ
                new TourDestination { TourDestinationId = 10, TourId = 3, DestinationId = 22, OrderNumber = 3 }, // Lăng Tự Đức

                // Tour Nha Trang
                new TourDestination { TourDestinationId = 11, TourId = 4, DestinationId = 25, OrderNumber = 1 }, // Vinpearl Land
                new TourDestination { TourDestinationId = 12, TourId = 4, DestinationId = 26, OrderNumber = 2 }, // Vịnh Nha Trang
                new TourDestination { TourDestinationId = 13, TourId = 4, DestinationId = 27, OrderNumber = 3 }, // Tháp Bà Ponagar

                // Tour Hồ Chí Minh
                new TourDestination { TourDestinationId = 14, TourId = 5, DestinationId = 10, OrderNumber = 1 }, // Nhà thờ Đức Bà
                new TourDestination { TourDestinationId = 15, TourId = 5, DestinationId = 11, OrderNumber = 2 }, // Bưu điện Trung tâm
                new TourDestination { TourDestinationId = 16, TourId = 5, DestinationId = 12, OrderNumber = 3 }, // Chợ Bến Thành
                new TourDestination { TourDestinationId = 17, TourId = 5, DestinationId = 13, OrderNumber = 4 }, // Dinh Độc Lập

                // Tour Sapa
                new TourDestination { TourDestinationId = 18, TourId = 6, DestinationId = 30, OrderNumber = 1 }, // Fansipan
                new TourDestination { TourDestinationId = 19, TourId = 6, DestinationId = 31, OrderNumber = 2 }, // Bản Cát Cát
                new TourDestination { TourDestinationId = 20, TourId = 6, DestinationId = 32, OrderNumber = 3 } // Thung lũng Mường Hoa
            );

            // Seed TourSchedules (Tour Hà Nội)
            modelBuilder.Entity<TourSchedule>().HasData(
                // Tour Hà Nội
                new TourSchedule { ScheduleId = 1, TourId = 1, DayNumber = 1, Description = "Ngày 1: Khám phá trung tâm Hà Nội", Activities = "Sáng: Tham quan Hồ Gươm, Đền Ngọc Sơn\nTrưa: Ăn trưa tại nhà hàng địa phương\nChiều: Tham quan phố cổ Hà Nội\nTối: Thưởng thức ẩm thực đường phố" },
                new TourSchedule { ScheduleId = 2, TourId = 1, DayNumber = 2, Description = "Ngày 2: Di sản văn hóa Hà Nội", Activities = "Sáng: Tham quan Văn Miếu - Quốc Tử Giám\nTrưa: Ăn trưa tại nhà hàng địa phương\nChiều: Tham quan Hoàng thành Thăng Long\nTối: Xem biểu diễn múa rối nước" },
                new TourSchedule { ScheduleId = 3, TourId = 1, DayNumber = 3, Description = "Ngày 3: Hà Nội hiện đại", Activities = "Sáng: Tham quan Lăng Chủ tịch Hồ Chí Minh\nTrưa: Ăn trưa tại nhà hàng địa phương\nChiều: Mua sắm tại các trung tâm thương mại\nTối: Tiệc chia tay" },

                // Tour Đà Nẵng
                new TourSchedule { ScheduleId = 4, TourId = 2, DayNumber = 1, Description = "Ngày 1: Khám phá Bà Nà Hills", Activities = "Sáng: Khởi hành đi Bà Nà Hills\nTrưa: Ăn trưa tại Bà Nà Hills\nChiều: Tham quan Cầu Vàng, làng Pháp\nTối: Về khách sạn nghỉ ngơi" },
                new TourSchedule { ScheduleId = 5, TourId = 2, DayNumber = 2, Description = "Ngày 2: Khám phá Ngũ Hành Sơn", Activities = "Sáng: Tham quan Ngũ Hành Sơn\nTrưa: Ăn trưa tại nhà hàng địa phương\nChiều: Tham quan làng đá Non Nước\nTối: Thưởng thức ẩm thực địa phương" },
                new TourSchedule { ScheduleId = 6, TourId = 2, DayNumber = 3, Description = "Ngày 3: Khám phá bán đảo Sơn Trà", Activities = "Sáng: Tham quan bán đảo Sơn Trà\nTrưa: Ăn trưa tại nhà hàng địa phương\nChiều: Tham quan chùa Linh Ứng\nTối: Thưởng thức hải sản tươi ngon" },
                new TourSchedule { ScheduleId = 7, TourId = 2, DayNumber = 4, Description = "Ngày 4: Tắm biển Mỹ Khê", Activities = "Sáng: Tắm biển Mỹ Khê\nTrưa: Ăn trưa tại nhà hàng ven biển\nChiều: Tham quan Cầu Rồng\nTối: Ngắm Cầu Rồng phun lửa và nước" },

                // Tour Huế
                new TourSchedule { ScheduleId = 8, TourId = 3, DayNumber = 1, Description = "Ngày 1: Khám phá Đại Nội Huế", Activities = "Sáng: Tham quan Đại Nội Huế\nTrưa: Ăn trưa với ẩm thực cung đình\nChiều: Tham quan Bảo tàng Cổ vật Cung đình Huế\nTối: Thưởng thức ca Huế trên sông Hương" },
                new TourSchedule { ScheduleId = 9, TourId = 3, DayNumber = 2, Description = "Ngày 2: Tham quan các lăng tẩm", Activities = "Sáng: Tham quan Lăng Tự Đức và Lăng Khải Định\nTrưa: Ăn trưa tại nhà hàng địa phương\nChiều: Tham quan chùa Thiên Mụ\nTối: Thưởng thức ẩm thực Huế" }
            );

            // Seed TourImages
            modelBuilder.Entity<TourImage>().HasData(
                // Tour Hà Nội
                new TourImage { ImageId = 1, TourId = 1, ImageUrl = "https://images.unsplash.com/photo-1509030450996-dd1a26dda07a?q=80&w=2123&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", IsPrimary = true },
                new TourImage { ImageId = 2, TourId = 1, ImageUrl = "https://images.unsplash.com/photo-1656520727264-67d0a9af5e85?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", IsPrimary = false },
                new TourImage { ImageId = 3, TourId = 1, ImageUrl = "https://images.unsplash.com/photo-1653914902511-76e819452618?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", IsPrimary = false },
                new TourImage { ImageId = 4, TourId = 1, ImageUrl = "https://images.unsplash.com/photo-1676019266474-3538f3f19e6b?q=80&w=1953&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", IsPrimary = false },

                // Tour Đà Nẵng
                new TourImage { ImageId = 5, TourId = 2, ImageUrl = "https://images.unsplash.com/photo-1558002890-c0b30998d1e6?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", IsPrimary = true },
                new TourImage { ImageId = 6, TourId = 2, ImageUrl = "https://images.unsplash.com/photo-1719836731185-0ff5ad81d1fb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", IsPrimary = false },
                new TourImage { ImageId = 7, TourId = 2, ImageUrl = "https://images.unsplash.com/photo-1708192071369-0296db1421aa?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", IsPrimary = false },
                new TourImage { ImageId = 8, TourId = 2, ImageUrl = "https://images.unsplash.com/photo-1701396173275-835886dd72ce?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZHJhZ29uJTIwYnJpZGdlfGVufDB8fDB8fHww", IsPrimary = false },

                // Tour Huế
                new TourImage { ImageId = 9, TourId = 3, ImageUrl = "/images/tours/hue/hue-main.jpg", IsPrimary = true },
                new TourImage { ImageId = 10, TourId = 3, ImageUrl = "/images/tours/hue/dai-noi.jpg", IsPrimary = false },
                new TourImage { ImageId = 11, TourId = 3, ImageUrl = "/images/tours/hue/thien-mu.jpg", IsPrimary = false },
                new TourImage { ImageId = 12, TourId = 3, ImageUrl = "/images/tours/hue/tu-duc-tomb.jpg", IsPrimary = false },

                // Tour Nha Trang
                new TourImage { ImageId = 13, TourId = 4, ImageUrl = "/images/tours/nhatrang/nhatrang-main.jpg", IsPrimary = true },
                new TourImage { ImageId = 14, TourId = 4, ImageUrl = "/images/tours/nhatrang/vinpearl.jpg", IsPrimary = false },
                new TourImage { ImageId = 15, TourId = 4, ImageUrl = "/images/tours/nhatrang/nhatrang-bay.jpg", IsPrimary = false },
                new TourImage { ImageId = 16, TourId = 4, ImageUrl = "/images/tours/nhatrang/ponagar.jpg", IsPrimary = false },

                // Tour Hồ Chí Minh
                new TourImage { ImageId = 17, TourId = 5, ImageUrl = "/images/tours/hochiminh/hochiminh-main.jpg", IsPrimary = true },
                new TourImage { ImageId = 18, TourId = 5, ImageUrl = "/images/tours/hochiminh/notre-dame.jpg", IsPrimary = false },
                new TourImage { ImageId = 19, TourId = 5, ImageUrl = "/images/tours/hochiminh/central-post-office.jpg", IsPrimary = false },
                new TourImage { ImageId = 20, TourId = 5, ImageUrl = "/images/tours/hochiminh/ben-thanh-market.jpg", IsPrimary = false },

                // Tour Sapa
                new TourImage { ImageId = 21, TourId = 6, ImageUrl = "/images/tours/sapa/sapa-main.jpg", IsPrimary = true },
                new TourImage { ImageId = 22, TourId = 6, ImageUrl = "/images/tours/sapa/fansipan.jpg", IsPrimary = false },
                new TourImage { ImageId = 23, TourId = 6, ImageUrl = "/images/tours/sapa/cat-cat-village.jpg", IsPrimary = false },
                new TourImage { ImageId = 24, TourId = 6, ImageUrl = "/images/tours/sapa/muong-hoa-valley.jpg", IsPrimary = false }
            );

            // Seed DestinationImages
            modelBuilder.Entity<DestinationImage>().HasData(
                // Hồ Gươm
                new DestinationImage { ImageId = 1, DestinationId = 1, ImageUrl = "/images/destinations/hanoi/ho-guom-1.jpg", IsPrimary = true },
                new DestinationImage { ImageId = 2, DestinationId = 1, ImageUrl = "/images/destinations/hanoi/ho-guom-2.jpg", IsPrimary = false },

                // Văn Miếu
                new DestinationImage { ImageId = 3, DestinationId = 2, ImageUrl = "/images/destinations/hanoi/van-mieu-1.jpg", IsPrimary = true },
                new DestinationImage { ImageId = 4, DestinationId = 2, ImageUrl = "/images/destinations/hanoi/van-mieu-2.jpg", IsPrimary = false },

                // Lăng Chủ tịch
                new DestinationImage { ImageId = 5, DestinationId = 3, ImageUrl = "/images/destinations/hanoi/lang-chu-tich-1.jpg", IsPrimary = true },
                new DestinationImage { ImageId = 6, DestinationId = 3, ImageUrl = "/images/destinations/hanoi/lang-chu-tich-2.jpg", IsPrimary = false },

                // Phố cổ Hà Nội
                new DestinationImage { ImageId = 7, DestinationId = 4, ImageUrl = "/images/destinations/hanoi/pho-co-1.jpg", IsPrimary = true },
                new DestinationImage { ImageId = 8, DestinationId = 4, ImageUrl = "/images/destinations/hanoi/pho-co-2.jpg", IsPrimary = false },

                // Hoàng thành Thăng Long
                new DestinationImage { ImageId = 9, DestinationId = 5, ImageUrl = "/images/destinations/hanoi/hoang-thanh-1.jpg", IsPrimary = true },
                new DestinationImage { ImageId = 10, DestinationId = 5, ImageUrl = "/images/destinations/hanoi/hoang-thanh-2.jpg", IsPrimary = false },

                // Bà Nà Hills
                new DestinationImage { ImageId = 11, DestinationId = 15, ImageUrl = "/images/destinations/danang/ba-na-hills-1.jpg", IsPrimary = true },
                new DestinationImage { ImageId = 12, DestinationId = 15, ImageUrl = "/images/destinations/danang/ba-na-hills-2.jpg", IsPrimary = false },

                // Bãi biển Mỹ Khê
                new DestinationImage { ImageId = 13, DestinationId = 16, ImageUrl = "/images/destinations/danang/my-khe-1.jpg", IsPrimary = true },
                new DestinationImage { ImageId = 14, DestinationId = 16, ImageUrl = "/images/destinations/danang/my-khe-2.jpg", IsPrimary = false },

                // Đại Nội Huế
                new DestinationImage { ImageId = 15, DestinationId = 20, ImageUrl = "/images/destinations/hue/dai-noi-1.jpg", IsPrimary = true },
                new DestinationImage { ImageId = 16, DestinationId = 20, ImageUrl = "/images/destinations/hue/dai-noi-2.jpg", IsPrimary = false },

                // Vinpearl Land
                new DestinationImage { ImageId = 17, DestinationId = 25, ImageUrl = "/images/destinations/nhatrang/vinpearl-1.jpg", IsPrimary = true },
                new DestinationImage { ImageId = 18, DestinationId = 25, ImageUrl = "/images/destinations/nhatrang/vinpearl-2.jpg", IsPrimary = false },

                // Nhà thờ Đức Bà
                new DestinationImage { ImageId = 19, DestinationId = 10, ImageUrl = "/images/destinations/hochiminh/notre-dame-1.jpg", IsPrimary = true },
                new DestinationImage { ImageId = 20, DestinationId = 10, ImageUrl = "/images/destinations/hochiminh/notre-dame-2.jpg", IsPrimary = false },

                // Fansipan
                new DestinationImage { ImageId = 21, DestinationId = 30, ImageUrl = "/images/destinations/sapa/fansipan-1.jpg", IsPrimary = true },
                new DestinationImage { ImageId = 22, DestinationId = 30, ImageUrl = "/images/destinations/sapa/fansipan-2.jpg", IsPrimary = false }
            );

            // Seed DestinationDetails
            modelBuilder.Entity<DestinationDetail>().HasData(
                // Hồ Gươm
                new DestinationDetail { DetailId = 1, DestinationId = 1, FeatureType = "Giờ mở cửa", FeatureValue = "24/7" },
                new DestinationDetail { DetailId = 2, DestinationId = 1, FeatureType = "Giá vé", FeatureValue = "Miễn phí" },
                new DestinationDetail { DetailId = 3, DestinationId = 1, FeatureType = "Địa chỉ", FeatureValue = "Quận Hoàn Kiếm, Hà Nội" },

                // Văn Miếu
                new DestinationDetail { DetailId = 4, DestinationId = 2, FeatureType = "Giờ mở cửa", FeatureValue = "8:00 - 17:00" },
                new DestinationDetail { DetailId = 5, DestinationId = 2, FeatureType = "Giá vé", FeatureValue = "30.000 VND" },
                new DestinationDetail { DetailId = 6, DestinationId = 2, FeatureType = "Địa chỉ", FeatureValue = "58 Quốc Tử Giám, Đống Đa, Hà Nội" },

                // Bà Nà Hills
                new DestinationDetail { DetailId = 7, DestinationId = 15, FeatureType = "Giờ mở cửa", FeatureValue = "7:30 - 21:30" },
                new DestinationDetail { DetailId = 8, DestinationId = 15, FeatureType = "Giá vé", FeatureValue = "750.000 VND" },
                new DestinationDetail { DetailId = 9, DestinationId = 15, FeatureType = "Địa chỉ", FeatureValue = "Hoà Ninh, Hoà Vang, Đà Nẵng" },

                // Đại Nội Huế
                new DestinationDetail { DetailId = 10, DestinationId = 20, FeatureType = "Giờ mở cửa", FeatureValue = "7:00 - 17:30" },
                new DestinationDetail { DetailId = 11, DestinationId = 20, FeatureType = "Giá vé", FeatureValue = "200.000 VND" },
                new DestinationDetail { DetailId = 12, DestinationId = 20, FeatureType = "Địa chỉ", FeatureValue = "Thành phố Huế, Thừa Thiên Huế" },

                // Vinpearl Land
                new DestinationDetail { DetailId = 13, DestinationId = 25, FeatureType = "Giờ mở cửa", FeatureValue = "8:30 - 21:00" },
                new DestinationDetail { DetailId = 14, DestinationId = 25, FeatureType = "Giá vé", FeatureValue = "880.000 VND" },
                new DestinationDetail { DetailId = 15, DestinationId = 25, FeatureType = "Địa chỉ", FeatureValue = "Đảo Hòn Tre, Nha Trang, Khánh Hòa" },

                // Nhà thờ Đức Bà
                new DestinationDetail { DetailId = 16, DestinationId = 10, FeatureType = "Giờ mở cửa", FeatureValue = "8:00 - 17:00" },
                new DestinationDetail { DetailId = 17, DestinationId = 10, FeatureType = "Giá vé", FeatureValue = "Miễn phí" },
                new DestinationDetail { DetailId = 18, DestinationId = 10, FeatureType = "Địa chỉ", FeatureValue = "Công xã Paris, Bến Nghé, Quận 1, TP.HCM" },

                // Fansipan
                new DestinationDetail { DetailId = 19, DestinationId = 30, FeatureType = "Giờ mở cửa", FeatureValue = "7:30 - 17:30" },
                new DestinationDetail { DetailId = 20, DestinationId = 30, FeatureType = "Giá vé", FeatureValue = "700.000 VND" },
                new DestinationDetail { DetailId = 21, DestinationId = 30, FeatureType = "Địa chỉ", FeatureValue = "Thị trấn Sa Pa, Lào Cai" }
            );

            modelBuilder.Entity<TourismCompany>().HasData(
    new TourismCompany
    {
        Id = 1,
        CompanyName = "Asia Travel Co., Ltd",
        RepresentativeName = "Nguyen Van A",
        Email = "contact@asiatravel.com",
        PhoneNumber = "0909123456",
        TaxCode = "0101234567",
        BankName = "Vietcombank",
        BankAccountNumber = "1234567890",
        BankAccountHolderName = "ASIA TRAVEL CO LTD",
        UserId = 1
    },
    new TourismCompany
    {
        Id = 2,
        CompanyName = "VietTourist JSC",
        RepresentativeName = "Tran Thi B",
        Email = "info@viettourist.vn",
        PhoneNumber = "0912345678",
        TaxCode = "0207654321",
        BankName = "Techcombank",
        BankAccountNumber = "2345678901",
        BankAccountHolderName = "VIETTOURIST JSC",
        UserId = 2
    },
    new TourismCompany
    {
        Id = 3,
        CompanyName = "Green Journey",
        RepresentativeName = "Le Van C",
        Email = "greenjourney@gmail.com",
        PhoneNumber = "0988998877",
        TaxCode = "0304567890",
        BankName = "BIDV",
        BankAccountNumber = "3456789012",
        BankAccountHolderName = "GREEN JOURNEY",
        UserId = 3
    }
);



            // Seed Reviews
            modelBuilder.Entity<Review>().HasData(
                // Tour Hà Nội
                new Review { ReviewId = 1, UserId = 1, TourId = 1, Rating = 5, Comment = "Tour rất tuyệt vời, hướng dẫn viên nhiệt tình, các điểm tham quan đều rất đẹp!", ReviewDate = DateTime.Now.AddDays(-5) },
                new Review { ReviewId = 2, UserId = 2, TourId = 1, Rating = 4, Comment = "Tôi rất hài lòng với chuyến đi này, chỉ tiếc là thời gian hơi ngắn.", ReviewDate = DateTime.Now.AddDays(-10) },

                // Tour Đà Nẵng
                new Review { ReviewId = 3, UserId = 3, TourId = 2, Rating = 5, Comment = "Đà Nẵng quá đẹp, đặc biệt là Bà Nà Hills và Cầu Vàng. Sẽ quay lại lần nữa!", ReviewDate = DateTime.Now.AddDays(-7) },
                new Review { ReviewId = 4, UserId = 4, TourId = 2, Rating = 4, Comment = "Tour được tổ chức rất chuyên nghiệp, hướng dẫn viên vui tính và am hiểu lịch sử.", ReviewDate = DateTime.Now.AddDays(-15) },

                // Tour Huế
                new Review { ReviewId = 5, UserId = 5, TourId = 3, Rating = 5, Comment = "Huế có quá nhiều di tích lịch sử đẹp, ẩm thực cũng rất ngon. Rất đáng để đi!", ReviewDate = DateTime.Now.AddDays(-8) },
                new Review { ReviewId = 6, UserId = 1, TourId = 3, Rating = 4, Comment = "Tour được tổ chức tốt, chỉ tiếc là thời tiết không ủng hộ.", ReviewDate = DateTime.Now.AddDays(-20) }
            );


        }
    }
}