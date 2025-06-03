using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BookTour.Migrations
{
    /// <inheritdoc />
    public partial class AllowNullVnpayTransactionId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "VnpayTransactionId",
                table: "PaymentTransactions",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(50)",
                oldMaxLength: 50);

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "VnpayTransactionId",
                table: "PaymentTransactions",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(50)",
                oldMaxLength: 50,
                oldNullable: true);

            migrationBuilder.UpdateData(
                table: "Reviews",
                keyColumn: "ReviewId",
                keyValue: 1,
                column: "ReviewDate",
                value: new DateTime(2025, 5, 27, 14, 24, 2, 639, DateTimeKind.Local).AddTicks(1162));

            migrationBuilder.UpdateData(
                table: "Reviews",
                keyColumn: "ReviewId",
                keyValue: 2,
                column: "ReviewDate",
                value: new DateTime(2025, 5, 22, 14, 24, 2, 639, DateTimeKind.Local).AddTicks(1169));

            migrationBuilder.UpdateData(
                table: "Reviews",
                keyColumn: "ReviewId",
                keyValue: 3,
                column: "ReviewDate",
                value: new DateTime(2025, 5, 25, 14, 24, 2, 639, DateTimeKind.Local).AddTicks(1171));

            migrationBuilder.UpdateData(
                table: "Reviews",
                keyColumn: "ReviewId",
                keyValue: 4,
                column: "ReviewDate",
                value: new DateTime(2025, 5, 17, 14, 24, 2, 639, DateTimeKind.Local).AddTicks(1173));

            migrationBuilder.UpdateData(
                table: "Reviews",
                keyColumn: "ReviewId",
                keyValue: 5,
                column: "ReviewDate",
                value: new DateTime(2025, 5, 24, 14, 24, 2, 639, DateTimeKind.Local).AddTicks(1174));

            migrationBuilder.UpdateData(
                table: "Reviews",
                keyColumn: "ReviewId",
                keyValue: 6,
                column: "ReviewDate",
                value: new DateTime(2025, 5, 12, 14, 24, 2, 639, DateTimeKind.Local).AddTicks(1176));

            migrationBuilder.UpdateData(
                table: "Tours",
                keyColumn: "TourId",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 6, 1, 14, 24, 2, 639, DateTimeKind.Local).AddTicks(735), new DateTime(2025, 6, 1, 14, 24, 2, 639, DateTimeKind.Local).AddTicks(735) });

            migrationBuilder.UpdateData(
                table: "Tours",
                keyColumn: "TourId",
                keyValue: 2,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 6, 1, 14, 24, 2, 639, DateTimeKind.Local).AddTicks(738), new DateTime(2025, 6, 1, 14, 24, 2, 639, DateTimeKind.Local).AddTicks(739) });

            migrationBuilder.UpdateData(
                table: "Tours",
                keyColumn: "TourId",
                keyValue: 3,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 6, 1, 14, 24, 2, 639, DateTimeKind.Local).AddTicks(742), new DateTime(2025, 6, 1, 14, 24, 2, 639, DateTimeKind.Local).AddTicks(742) });

            migrationBuilder.UpdateData(
                table: "Tours",
                keyColumn: "TourId",
                keyValue: 4,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 6, 1, 14, 24, 2, 639, DateTimeKind.Local).AddTicks(745), new DateTime(2025, 6, 1, 14, 24, 2, 639, DateTimeKind.Local).AddTicks(746) });

            migrationBuilder.UpdateData(
                table: "Tours",
                keyColumn: "TourId",
                keyValue: 5,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 6, 1, 14, 24, 2, 639, DateTimeKind.Local).AddTicks(748), new DateTime(2025, 6, 1, 14, 24, 2, 639, DateTimeKind.Local).AddTicks(749) });

            migrationBuilder.UpdateData(
                table: "Tours",
                keyColumn: "TourId",
                keyValue: 6,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 6, 1, 14, 24, 2, 639, DateTimeKind.Local).AddTicks(751), new DateTime(2025, 6, 1, 14, 24, 2, 639, DateTimeKind.Local).AddTicks(752) });

            migrationBuilder.UpdateData(
                table: "Tours",
                keyColumn: "TourId",
                keyValue: 7,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 6, 1, 14, 24, 2, 639, DateTimeKind.Local).AddTicks(798), new DateTime(2025, 6, 1, 14, 24, 2, 639, DateTimeKind.Local).AddTicks(799) });

            migrationBuilder.UpdateData(
                table: "Tours",
                keyColumn: "TourId",
                keyValue: 8,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 6, 1, 14, 24, 2, 639, DateTimeKind.Local).AddTicks(802), new DateTime(2025, 6, 1, 14, 24, 2, 639, DateTimeKind.Local).AddTicks(802) });

            migrationBuilder.UpdateData(
                table: "Tours",
                keyColumn: "TourId",
                keyValue: 9,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 6, 1, 14, 24, 2, 639, DateTimeKind.Local).AddTicks(805), new DateTime(2025, 6, 1, 14, 24, 2, 639, DateTimeKind.Local).AddTicks(805) });

            migrationBuilder.UpdateData(
                table: "Tours",
                keyColumn: "TourId",
                keyValue: 10,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 6, 1, 14, 24, 2, 639, DateTimeKind.Local).AddTicks(808), new DateTime(2025, 6, 1, 14, 24, 2, 639, DateTimeKind.Local).AddTicks(809) });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 1, 14, 24, 2, 639, DateTimeKind.Local).AddTicks(562));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 2,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 1, 14, 24, 2, 639, DateTimeKind.Local).AddTicks(564));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 3,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 1, 14, 24, 2, 639, DateTimeKind.Local).AddTicks(566));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 4,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 1, 14, 24, 2, 639, DateTimeKind.Local).AddTicks(568));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 5,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 1, 14, 24, 2, 639, DateTimeKind.Local).AddTicks(570));
        }
    }
}
