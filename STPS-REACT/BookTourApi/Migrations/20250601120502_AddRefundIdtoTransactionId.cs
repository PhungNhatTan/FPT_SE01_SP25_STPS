using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BookTour.Migrations
{
    /// <inheritdoc />
    public partial class AddRefundIdtoTransactionId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "BookingId",
                table: "PaymentTransactions",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<int>(
                name: "RefundRequestId",
                table: "PaymentTransactions",
                type: "int",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "Reviews",
                keyColumn: "ReviewId",
                keyValue: 1,
                column: "ReviewDate",
                value: new DateTime(2025, 5, 27, 19, 5, 1, 927, DateTimeKind.Local).AddTicks(1790));

            migrationBuilder.UpdateData(
                table: "Reviews",
                keyColumn: "ReviewId",
                keyValue: 2,
                column: "ReviewDate",
                value: new DateTime(2025, 5, 22, 19, 5, 1, 927, DateTimeKind.Local).AddTicks(1799));

            migrationBuilder.UpdateData(
                table: "Reviews",
                keyColumn: "ReviewId",
                keyValue: 3,
                column: "ReviewDate",
                value: new DateTime(2025, 5, 25, 19, 5, 1, 927, DateTimeKind.Local).AddTicks(1801));

            migrationBuilder.UpdateData(
                table: "Reviews",
                keyColumn: "ReviewId",
                keyValue: 4,
                column: "ReviewDate",
                value: new DateTime(2025, 5, 17, 19, 5, 1, 927, DateTimeKind.Local).AddTicks(1803));

            migrationBuilder.UpdateData(
                table: "Reviews",
                keyColumn: "ReviewId",
                keyValue: 5,
                column: "ReviewDate",
                value: new DateTime(2025, 5, 24, 19, 5, 1, 927, DateTimeKind.Local).AddTicks(1804));

            migrationBuilder.UpdateData(
                table: "Reviews",
                keyColumn: "ReviewId",
                keyValue: 6,
                column: "ReviewDate",
                value: new DateTime(2025, 5, 12, 19, 5, 1, 927, DateTimeKind.Local).AddTicks(1806));

            migrationBuilder.UpdateData(
                table: "Tours",
                keyColumn: "TourId",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 6, 1, 19, 5, 1, 927, DateTimeKind.Local).AddTicks(1357), new DateTime(2025, 6, 1, 19, 5, 1, 927, DateTimeKind.Local).AddTicks(1357) });

            migrationBuilder.UpdateData(
                table: "Tours",
                keyColumn: "TourId",
                keyValue: 2,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 6, 1, 19, 5, 1, 927, DateTimeKind.Local).AddTicks(1361), new DateTime(2025, 6, 1, 19, 5, 1, 927, DateTimeKind.Local).AddTicks(1361) });

            migrationBuilder.UpdateData(
                table: "Tours",
                keyColumn: "TourId",
                keyValue: 3,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 6, 1, 19, 5, 1, 927, DateTimeKind.Local).AddTicks(1365), new DateTime(2025, 6, 1, 19, 5, 1, 927, DateTimeKind.Local).AddTicks(1365) });

            migrationBuilder.UpdateData(
                table: "Tours",
                keyColumn: "TourId",
                keyValue: 4,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 6, 1, 19, 5, 1, 927, DateTimeKind.Local).AddTicks(1368), new DateTime(2025, 6, 1, 19, 5, 1, 927, DateTimeKind.Local).AddTicks(1368) });

            migrationBuilder.UpdateData(
                table: "Tours",
                keyColumn: "TourId",
                keyValue: 5,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 6, 1, 19, 5, 1, 927, DateTimeKind.Local).AddTicks(1371), new DateTime(2025, 6, 1, 19, 5, 1, 927, DateTimeKind.Local).AddTicks(1371) });

            migrationBuilder.UpdateData(
                table: "Tours",
                keyColumn: "TourId",
                keyValue: 6,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 6, 1, 19, 5, 1, 927, DateTimeKind.Local).AddTicks(1402), new DateTime(2025, 6, 1, 19, 5, 1, 927, DateTimeKind.Local).AddTicks(1402) });

            migrationBuilder.UpdateData(
                table: "Tours",
                keyColumn: "TourId",
                keyValue: 7,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 6, 1, 19, 5, 1, 927, DateTimeKind.Local).AddTicks(1405), new DateTime(2025, 6, 1, 19, 5, 1, 927, DateTimeKind.Local).AddTicks(1406) });

            migrationBuilder.UpdateData(
                table: "Tours",
                keyColumn: "TourId",
                keyValue: 8,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 6, 1, 19, 5, 1, 927, DateTimeKind.Local).AddTicks(1408), new DateTime(2025, 6, 1, 19, 5, 1, 927, DateTimeKind.Local).AddTicks(1409) });

            migrationBuilder.UpdateData(
                table: "Tours",
                keyColumn: "TourId",
                keyValue: 9,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 6, 1, 19, 5, 1, 927, DateTimeKind.Local).AddTicks(1411), new DateTime(2025, 6, 1, 19, 5, 1, 927, DateTimeKind.Local).AddTicks(1412) });

            migrationBuilder.UpdateData(
                table: "Tours",
                keyColumn: "TourId",
                keyValue: 10,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 6, 1, 19, 5, 1, 927, DateTimeKind.Local).AddTicks(1415), new DateTime(2025, 6, 1, 19, 5, 1, 927, DateTimeKind.Local).AddTicks(1415) });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 1, 19, 5, 1, 927, DateTimeKind.Local).AddTicks(1189));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 2,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 1, 19, 5, 1, 927, DateTimeKind.Local).AddTicks(1191));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 3,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 1, 19, 5, 1, 927, DateTimeKind.Local).AddTicks(1193));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 4,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 1, 19, 5, 1, 927, DateTimeKind.Local).AddTicks(1195));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 5,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 1, 19, 5, 1, 927, DateTimeKind.Local).AddTicks(1197));

            migrationBuilder.CreateIndex(
                name: "IX_PaymentTransactions_RefundRequestId",
                table: "PaymentTransactions",
                column: "RefundRequestId");

            migrationBuilder.AddForeignKey(
                name: "FK_PaymentTransactions_RefundRequests_RefundRequestId",
                table: "PaymentTransactions",
                column: "RefundRequestId",
                principalTable: "RefundRequests",
                principalColumn: "RefundRequestId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PaymentTransactions_RefundRequests_RefundRequestId",
                table: "PaymentTransactions");

            migrationBuilder.DropIndex(
                name: "IX_PaymentTransactions_RefundRequestId",
                table: "PaymentTransactions");

            migrationBuilder.DropColumn(
                name: "RefundRequestId",
                table: "PaymentTransactions");

            migrationBuilder.AlterColumn<int>(
                name: "BookingId",
                table: "PaymentTransactions",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.UpdateData(
                table: "Reviews",
                keyColumn: "ReviewId",
                keyValue: 1,
                column: "ReviewDate",
                value: new DateTime(2025, 5, 27, 14, 31, 45, 380, DateTimeKind.Local).AddTicks(6322));

            migrationBuilder.UpdateData(
                table: "Reviews",
                keyColumn: "ReviewId",
                keyValue: 2,
                column: "ReviewDate",
                value: new DateTime(2025, 5, 22, 14, 31, 45, 380, DateTimeKind.Local).AddTicks(6330));

            migrationBuilder.UpdateData(
                table: "Reviews",
                keyColumn: "ReviewId",
                keyValue: 3,
                column: "ReviewDate",
                value: new DateTime(2025, 5, 25, 14, 31, 45, 380, DateTimeKind.Local).AddTicks(6332));

            migrationBuilder.UpdateData(
                table: "Reviews",
                keyColumn: "ReviewId",
                keyValue: 4,
                column: "ReviewDate",
                value: new DateTime(2025, 5, 17, 14, 31, 45, 380, DateTimeKind.Local).AddTicks(6334));

            migrationBuilder.UpdateData(
                table: "Reviews",
                keyColumn: "ReviewId",
                keyValue: 5,
                column: "ReviewDate",
                value: new DateTime(2025, 5, 24, 14, 31, 45, 380, DateTimeKind.Local).AddTicks(6336));

            migrationBuilder.UpdateData(
                table: "Reviews",
                keyColumn: "ReviewId",
                keyValue: 6,
                column: "ReviewDate",
                value: new DateTime(2025, 5, 12, 14, 31, 45, 380, DateTimeKind.Local).AddTicks(6337));

            migrationBuilder.UpdateData(
                table: "Tours",
                keyColumn: "TourId",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 6, 1, 14, 31, 45, 380, DateTimeKind.Local).AddTicks(5921), new DateTime(2025, 6, 1, 14, 31, 45, 380, DateTimeKind.Local).AddTicks(5921) });

            migrationBuilder.UpdateData(
                table: "Tours",
                keyColumn: "TourId",
                keyValue: 2,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 6, 1, 14, 31, 45, 380, DateTimeKind.Local).AddTicks(5925), new DateTime(2025, 6, 1, 14, 31, 45, 380, DateTimeKind.Local).AddTicks(5925) });

            migrationBuilder.UpdateData(
                table: "Tours",
                keyColumn: "TourId",
                keyValue: 3,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 6, 1, 14, 31, 45, 380, DateTimeKind.Local).AddTicks(5928), new DateTime(2025, 6, 1, 14, 31, 45, 380, DateTimeKind.Local).AddTicks(5929) });

            migrationBuilder.UpdateData(
                table: "Tours",
                keyColumn: "TourId",
                keyValue: 4,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 6, 1, 14, 31, 45, 380, DateTimeKind.Local).AddTicks(5932), new DateTime(2025, 6, 1, 14, 31, 45, 380, DateTimeKind.Local).AddTicks(5932) });

            migrationBuilder.UpdateData(
                table: "Tours",
                keyColumn: "TourId",
                keyValue: 5,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 6, 1, 14, 31, 45, 380, DateTimeKind.Local).AddTicks(5935), new DateTime(2025, 6, 1, 14, 31, 45, 380, DateTimeKind.Local).AddTicks(5935) });

            migrationBuilder.UpdateData(
                table: "Tours",
                keyColumn: "TourId",
                keyValue: 6,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 6, 1, 14, 31, 45, 380, DateTimeKind.Local).AddTicks(5938), new DateTime(2025, 6, 1, 14, 31, 45, 380, DateTimeKind.Local).AddTicks(5939) });

            migrationBuilder.UpdateData(
                table: "Tours",
                keyColumn: "TourId",
                keyValue: 7,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 6, 1, 14, 31, 45, 380, DateTimeKind.Local).AddTicks(5941), new DateTime(2025, 6, 1, 14, 31, 45, 380, DateTimeKind.Local).AddTicks(5942) });

            migrationBuilder.UpdateData(
                table: "Tours",
                keyColumn: "TourId",
                keyValue: 8,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 6, 1, 14, 31, 45, 380, DateTimeKind.Local).AddTicks(5945), new DateTime(2025, 6, 1, 14, 31, 45, 380, DateTimeKind.Local).AddTicks(5945) });

            migrationBuilder.UpdateData(
                table: "Tours",
                keyColumn: "TourId",
                keyValue: 9,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 6, 1, 14, 31, 45, 380, DateTimeKind.Local).AddTicks(5948), new DateTime(2025, 6, 1, 14, 31, 45, 380, DateTimeKind.Local).AddTicks(5948) });

            migrationBuilder.UpdateData(
                table: "Tours",
                keyColumn: "TourId",
                keyValue: 10,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 6, 1, 14, 31, 45, 380, DateTimeKind.Local).AddTicks(5951), new DateTime(2025, 6, 1, 14, 31, 45, 380, DateTimeKind.Local).AddTicks(5951) });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 1, 14, 31, 45, 380, DateTimeKind.Local).AddTicks(5720));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 2,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 1, 14, 31, 45, 380, DateTimeKind.Local).AddTicks(5722));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 3,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 1, 14, 31, 45, 380, DateTimeKind.Local).AddTicks(5724));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 4,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 1, 14, 31, 45, 380, DateTimeKind.Local).AddTicks(5726));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 5,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 1, 14, 31, 45, 380, DateTimeKind.Local).AddTicks(5728));
        }
    }
}
