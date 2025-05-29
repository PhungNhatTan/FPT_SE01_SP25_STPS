using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BookTour.Migrations
{
    /// <inheritdoc />
    public partial class db2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "BankAccountHolderName",
                table: "TourismCompanies",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "BankAccountNumber",
                table: "TourismCompanies",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "BankName",
                table: "TourismCompanies",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateTable(
                name: "PaymentTransactions",
                columns: table => new
                {
                    TransactionId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BookingId = table.Column<int>(type: "int", nullable: false),
                    SimulatedTransactionId = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Amount = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    PaymentDetails = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PaymentTransactions", x => x.TransactionId);
                    table.ForeignKey(
                        name: "FK_PaymentTransactions_Bookings_BookingId",
                        column: x => x.BookingId,
                        principalTable: "Bookings",
                        principalColumn: "BookingId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "RefundRequests",
                columns: table => new
                {
                    RefundRequestId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BookingId = table.Column<int>(type: "int", nullable: false),
                    CustomerBankAccount = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    CustomerBankName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    CustomerAccountHolderName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    RefundAmount = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    CompanyCompensation = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    AdminFee = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    RequestDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ProcessedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Reason = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    AdminNotes = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RefundRequests", x => x.RefundRequestId);
                    table.ForeignKey(
                        name: "FK_RefundRequests_Bookings_BookingId",
                        column: x => x.BookingId,
                        principalTable: "Bookings",
                        principalColumn: "BookingId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "RevenueTransactions",
                columns: table => new
                {
                    RevenueTransactionId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BookingId = table.Column<int>(type: "int", nullable: false),
                    TourismCompanyId = table.Column<int>(type: "int", nullable: false),
                    TotalAmount = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    AdminFee = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    CompanyAmount = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    CustomerRefund = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    TransactionType = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false),
                    Status = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    ScheduledDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ProcessedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Notes = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RevenueTransactions", x => x.RevenueTransactionId);
                    table.ForeignKey(
                        name: "FK_RevenueTransactions_Bookings_BookingId",
                        column: x => x.BookingId,
                        principalTable: "Bookings",
                        principalColumn: "BookingId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RevenueTransactions_TourismCompanies_TourismCompanyId",
                        column: x => x.TourismCompanyId,
                        principalTable: "TourismCompanies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.UpdateData(
                table: "Reviews",
                keyColumn: "ReviewId",
                keyValue: 1,
                column: "ReviewDate",
                value: new DateTime(2025, 5, 22, 19, 40, 3, 561, DateTimeKind.Local).AddTicks(6464));

            migrationBuilder.UpdateData(
                table: "Reviews",
                keyColumn: "ReviewId",
                keyValue: 2,
                column: "ReviewDate",
                value: new DateTime(2025, 5, 17, 19, 40, 3, 561, DateTimeKind.Local).AddTicks(6476));

            migrationBuilder.UpdateData(
                table: "Reviews",
                keyColumn: "ReviewId",
                keyValue: 3,
                column: "ReviewDate",
                value: new DateTime(2025, 5, 20, 19, 40, 3, 561, DateTimeKind.Local).AddTicks(6481));

            migrationBuilder.UpdateData(
                table: "Reviews",
                keyColumn: "ReviewId",
                keyValue: 4,
                column: "ReviewDate",
                value: new DateTime(2025, 5, 12, 19, 40, 3, 561, DateTimeKind.Local).AddTicks(6485));

            migrationBuilder.UpdateData(
                table: "Reviews",
                keyColumn: "ReviewId",
                keyValue: 5,
                column: "ReviewDate",
                value: new DateTime(2025, 5, 19, 19, 40, 3, 561, DateTimeKind.Local).AddTicks(6489));

            migrationBuilder.UpdateData(
                table: "Reviews",
                keyColumn: "ReviewId",
                keyValue: 6,
                column: "ReviewDate",
                value: new DateTime(2025, 5, 7, 19, 40, 3, 561, DateTimeKind.Local).AddTicks(6493));

            migrationBuilder.UpdateData(
                table: "TourismCompanies",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "BankAccountHolderName", "BankAccountNumber", "BankName" },
                values: new object[] { "ASIA TRAVEL CO LTD", "1234567890", "Vietcombank" });

            migrationBuilder.UpdateData(
                table: "TourismCompanies",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "BankAccountHolderName", "BankAccountNumber", "BankName" },
                values: new object[] { "VIETTOURIST JSC", "2345678901", "Techcombank" });

            migrationBuilder.UpdateData(
                table: "TourismCompanies",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "BankAccountHolderName", "BankAccountNumber", "BankName" },
                values: new object[] { "GREEN JOURNEY", "3456789012", "BIDV" });

            migrationBuilder.UpdateData(
                table: "Tours",
                keyColumn: "TourId",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 5, 27, 19, 40, 3, 561, DateTimeKind.Local).AddTicks(5532), new DateTime(2025, 5, 27, 19, 40, 3, 561, DateTimeKind.Local).AddTicks(5534) });

            migrationBuilder.UpdateData(
                table: "Tours",
                keyColumn: "TourId",
                keyValue: 2,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 5, 27, 19, 40, 3, 561, DateTimeKind.Local).AddTicks(5543), new DateTime(2025, 5, 27, 19, 40, 3, 561, DateTimeKind.Local).AddTicks(5545) });

            migrationBuilder.UpdateData(
                table: "Tours",
                keyColumn: "TourId",
                keyValue: 3,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 5, 27, 19, 40, 3, 561, DateTimeKind.Local).AddTicks(5551), new DateTime(2025, 5, 27, 19, 40, 3, 561, DateTimeKind.Local).AddTicks(5552) });

            migrationBuilder.UpdateData(
                table: "Tours",
                keyColumn: "TourId",
                keyValue: 4,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 5, 27, 19, 40, 3, 561, DateTimeKind.Local).AddTicks(5559), new DateTime(2025, 5, 27, 19, 40, 3, 561, DateTimeKind.Local).AddTicks(5560) });

            migrationBuilder.UpdateData(
                table: "Tours",
                keyColumn: "TourId",
                keyValue: 5,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 5, 27, 19, 40, 3, 561, DateTimeKind.Local).AddTicks(5567), new DateTime(2025, 5, 27, 19, 40, 3, 561, DateTimeKind.Local).AddTicks(5586) });

            migrationBuilder.UpdateData(
                table: "Tours",
                keyColumn: "TourId",
                keyValue: 6,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 5, 27, 19, 40, 3, 561, DateTimeKind.Local).AddTicks(5612), new DateTime(2025, 5, 27, 19, 40, 3, 561, DateTimeKind.Local).AddTicks(5614) });

            migrationBuilder.UpdateData(
                table: "Tours",
                keyColumn: "TourId",
                keyValue: 7,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 5, 27, 19, 40, 3, 561, DateTimeKind.Local).AddTicks(5620), new DateTime(2025, 5, 27, 19, 40, 3, 561, DateTimeKind.Local).AddTicks(5621) });

            migrationBuilder.UpdateData(
                table: "Tours",
                keyColumn: "TourId",
                keyValue: 8,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 5, 27, 19, 40, 3, 561, DateTimeKind.Local).AddTicks(5628), new DateTime(2025, 5, 27, 19, 40, 3, 561, DateTimeKind.Local).AddTicks(5630) });

            migrationBuilder.UpdateData(
                table: "Tours",
                keyColumn: "TourId",
                keyValue: 9,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 5, 27, 19, 40, 3, 561, DateTimeKind.Local).AddTicks(5637), new DateTime(2025, 5, 27, 19, 40, 3, 561, DateTimeKind.Local).AddTicks(5639) });

            migrationBuilder.UpdateData(
                table: "Tours",
                keyColumn: "TourId",
                keyValue: 10,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 5, 27, 19, 40, 3, 561, DateTimeKind.Local).AddTicks(5645), new DateTime(2025, 5, 27, 19, 40, 3, 561, DateTimeKind.Local).AddTicks(5647) });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2025, 5, 27, 19, 40, 3, 561, DateTimeKind.Local).AddTicks(4778));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 2,
                column: "CreatedAt",
                value: new DateTime(2025, 5, 27, 19, 40, 3, 561, DateTimeKind.Local).AddTicks(4785));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 3,
                column: "CreatedAt",
                value: new DateTime(2025, 5, 27, 19, 40, 3, 561, DateTimeKind.Local).AddTicks(4792));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 4,
                column: "CreatedAt",
                value: new DateTime(2025, 5, 27, 19, 40, 3, 561, DateTimeKind.Local).AddTicks(4796));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 5,
                column: "CreatedAt",
                value: new DateTime(2025, 5, 27, 19, 40, 3, 561, DateTimeKind.Local).AddTicks(4805));

            migrationBuilder.CreateIndex(
                name: "IX_PaymentTransactions_BookingId",
                table: "PaymentTransactions",
                column: "BookingId");

            migrationBuilder.CreateIndex(
                name: "IX_RefundRequests_BookingId",
                table: "RefundRequests",
                column: "BookingId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_RevenueTransactions_BookingId",
                table: "RevenueTransactions",
                column: "BookingId");

            migrationBuilder.CreateIndex(
                name: "IX_RevenueTransactions_TourismCompanyId",
                table: "RevenueTransactions",
                column: "TourismCompanyId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PaymentTransactions");

            migrationBuilder.DropTable(
                name: "RefundRequests");

            migrationBuilder.DropTable(
                name: "RevenueTransactions");

            migrationBuilder.DropColumn(
                name: "BankAccountHolderName",
                table: "TourismCompanies");

            migrationBuilder.DropColumn(
                name: "BankAccountNumber",
                table: "TourismCompanies");

            migrationBuilder.DropColumn(
                name: "BankName",
                table: "TourismCompanies");

            migrationBuilder.UpdateData(
                table: "Reviews",
                keyColumn: "ReviewId",
                keyValue: 1,
                column: "ReviewDate",
                value: new DateTime(2025, 5, 22, 14, 54, 32, 423, DateTimeKind.Local).AddTicks(6583));

            migrationBuilder.UpdateData(
                table: "Reviews",
                keyColumn: "ReviewId",
                keyValue: 2,
                column: "ReviewDate",
                value: new DateTime(2025, 5, 17, 14, 54, 32, 423, DateTimeKind.Local).AddTicks(6594));

            migrationBuilder.UpdateData(
                table: "Reviews",
                keyColumn: "ReviewId",
                keyValue: 3,
                column: "ReviewDate",
                value: new DateTime(2025, 5, 20, 14, 54, 32, 423, DateTimeKind.Local).AddTicks(6597));

            migrationBuilder.UpdateData(
                table: "Reviews",
                keyColumn: "ReviewId",
                keyValue: 4,
                column: "ReviewDate",
                value: new DateTime(2025, 5, 12, 14, 54, 32, 423, DateTimeKind.Local).AddTicks(6601));

            migrationBuilder.UpdateData(
                table: "Reviews",
                keyColumn: "ReviewId",
                keyValue: 5,
                column: "ReviewDate",
                value: new DateTime(2025, 5, 19, 14, 54, 32, 423, DateTimeKind.Local).AddTicks(6604));

            migrationBuilder.UpdateData(
                table: "Reviews",
                keyColumn: "ReviewId",
                keyValue: 6,
                column: "ReviewDate",
                value: new DateTime(2025, 5, 7, 14, 54, 32, 423, DateTimeKind.Local).AddTicks(6607));

            migrationBuilder.UpdateData(
                table: "Tours",
                keyColumn: "TourId",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 5, 27, 14, 54, 32, 423, DateTimeKind.Local).AddTicks(5817), new DateTime(2025, 5, 27, 14, 54, 32, 423, DateTimeKind.Local).AddTicks(5818) });

            migrationBuilder.UpdateData(
                table: "Tours",
                keyColumn: "TourId",
                keyValue: 2,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 5, 27, 14, 54, 32, 423, DateTimeKind.Local).AddTicks(5825), new DateTime(2025, 5, 27, 14, 54, 32, 423, DateTimeKind.Local).AddTicks(5826) });

            migrationBuilder.UpdateData(
                table: "Tours",
                keyColumn: "TourId",
                keyValue: 3,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 5, 27, 14, 54, 32, 423, DateTimeKind.Local).AddTicks(5831), new DateTime(2025, 5, 27, 14, 54, 32, 423, DateTimeKind.Local).AddTicks(5832) });

            migrationBuilder.UpdateData(
                table: "Tours",
                keyColumn: "TourId",
                keyValue: 4,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 5, 27, 14, 54, 32, 423, DateTimeKind.Local).AddTicks(5837), new DateTime(2025, 5, 27, 14, 54, 32, 423, DateTimeKind.Local).AddTicks(5838) });

            migrationBuilder.UpdateData(
                table: "Tours",
                keyColumn: "TourId",
                keyValue: 5,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 5, 27, 14, 54, 32, 423, DateTimeKind.Local).AddTicks(5842), new DateTime(2025, 5, 27, 14, 54, 32, 423, DateTimeKind.Local).AddTicks(5843) });

            migrationBuilder.UpdateData(
                table: "Tours",
                keyColumn: "TourId",
                keyValue: 6,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 5, 27, 14, 54, 32, 423, DateTimeKind.Local).AddTicks(5848), new DateTime(2025, 5, 27, 14, 54, 32, 423, DateTimeKind.Local).AddTicks(5849) });

            migrationBuilder.UpdateData(
                table: "Tours",
                keyColumn: "TourId",
                keyValue: 7,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 5, 27, 14, 54, 32, 423, DateTimeKind.Local).AddTicks(5853), new DateTime(2025, 5, 27, 14, 54, 32, 423, DateTimeKind.Local).AddTicks(5854) });

            migrationBuilder.UpdateData(
                table: "Tours",
                keyColumn: "TourId",
                keyValue: 8,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 5, 27, 14, 54, 32, 423, DateTimeKind.Local).AddTicks(5860), new DateTime(2025, 5, 27, 14, 54, 32, 423, DateTimeKind.Local).AddTicks(5861) });

            migrationBuilder.UpdateData(
                table: "Tours",
                keyColumn: "TourId",
                keyValue: 9,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 5, 27, 14, 54, 32, 423, DateTimeKind.Local).AddTicks(5865), new DateTime(2025, 5, 27, 14, 54, 32, 423, DateTimeKind.Local).AddTicks(5866) });

            migrationBuilder.UpdateData(
                table: "Tours",
                keyColumn: "TourId",
                keyValue: 10,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 5, 27, 14, 54, 32, 423, DateTimeKind.Local).AddTicks(5871), new DateTime(2025, 5, 27, 14, 54, 32, 423, DateTimeKind.Local).AddTicks(5872) });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2025, 5, 27, 14, 54, 32, 423, DateTimeKind.Local).AddTicks(5042));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 2,
                column: "CreatedAt",
                value: new DateTime(2025, 5, 27, 14, 54, 32, 423, DateTimeKind.Local).AddTicks(5045));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 3,
                column: "CreatedAt",
                value: new DateTime(2025, 5, 27, 14, 54, 32, 423, DateTimeKind.Local).AddTicks(5049));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 4,
                column: "CreatedAt",
                value: new DateTime(2025, 5, 27, 14, 54, 32, 423, DateTimeKind.Local).AddTicks(5053));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 5,
                column: "CreatedAt",
                value: new DateTime(2025, 5, 27, 14, 54, 32, 423, DateTimeKind.Local).AddTicks(5178));
        }
    }
}
