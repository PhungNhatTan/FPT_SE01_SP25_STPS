using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BookTour.Migrations
{
    /// <inheritdoc />
    public partial class AddVnpayTransactionId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "UpdatedAt",
                table: "PaymentTransactions",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "VnpayTransactionId",
                table: "PaymentTransactions",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "");

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UpdatedAt",
                table: "PaymentTransactions");

            migrationBuilder.DropColumn(
                name: "VnpayTransactionId",
                table: "PaymentTransactions");

            migrationBuilder.UpdateData(
                table: "Reviews",
                keyColumn: "ReviewId",
                keyValue: 1,
                column: "ReviewDate",
                value: new DateTime(2025, 5, 23, 21, 8, 1, 302, DateTimeKind.Local).AddTicks(8746));

            migrationBuilder.UpdateData(
                table: "Reviews",
                keyColumn: "ReviewId",
                keyValue: 2,
                column: "ReviewDate",
                value: new DateTime(2025, 5, 18, 21, 8, 1, 302, DateTimeKind.Local).AddTicks(8770));

            migrationBuilder.UpdateData(
                table: "Reviews",
                keyColumn: "ReviewId",
                keyValue: 3,
                column: "ReviewDate",
                value: new DateTime(2025, 5, 21, 21, 8, 1, 302, DateTimeKind.Local).AddTicks(8779));

            migrationBuilder.UpdateData(
                table: "Reviews",
                keyColumn: "ReviewId",
                keyValue: 4,
                column: "ReviewDate",
                value: new DateTime(2025, 5, 13, 21, 8, 1, 302, DateTimeKind.Local).AddTicks(8787));

            migrationBuilder.UpdateData(
                table: "Reviews",
                keyColumn: "ReviewId",
                keyValue: 5,
                column: "ReviewDate",
                value: new DateTime(2025, 5, 20, 21, 8, 1, 302, DateTimeKind.Local).AddTicks(8798));

            migrationBuilder.UpdateData(
                table: "Reviews",
                keyColumn: "ReviewId",
                keyValue: 6,
                column: "ReviewDate",
                value: new DateTime(2025, 5, 8, 21, 8, 1, 302, DateTimeKind.Local).AddTicks(8805));

            migrationBuilder.UpdateData(
                table: "Tours",
                keyColumn: "TourId",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 5, 28, 21, 8, 1, 302, DateTimeKind.Local).AddTicks(5177), new DateTime(2025, 5, 28, 21, 8, 1, 302, DateTimeKind.Local).AddTicks(5179) });

            migrationBuilder.UpdateData(
                table: "Tours",
                keyColumn: "TourId",
                keyValue: 2,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 5, 28, 21, 8, 1, 302, DateTimeKind.Local).AddTicks(5190), new DateTime(2025, 5, 28, 21, 8, 1, 302, DateTimeKind.Local).AddTicks(5192) });

            migrationBuilder.UpdateData(
                table: "Tours",
                keyColumn: "TourId",
                keyValue: 3,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 5, 28, 21, 8, 1, 302, DateTimeKind.Local).AddTicks(5200), new DateTime(2025, 5, 28, 21, 8, 1, 302, DateTimeKind.Local).AddTicks(5202) });

            migrationBuilder.UpdateData(
                table: "Tours",
                keyColumn: "TourId",
                keyValue: 4,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 5, 28, 21, 8, 1, 302, DateTimeKind.Local).AddTicks(5210), new DateTime(2025, 5, 28, 21, 8, 1, 302, DateTimeKind.Local).AddTicks(5211) });

            migrationBuilder.UpdateData(
                table: "Tours",
                keyColumn: "TourId",
                keyValue: 5,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 5, 28, 21, 8, 1, 302, DateTimeKind.Local).AddTicks(5219), new DateTime(2025, 5, 28, 21, 8, 1, 302, DateTimeKind.Local).AddTicks(5242) });

            migrationBuilder.UpdateData(
                table: "Tours",
                keyColumn: "TourId",
                keyValue: 6,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 5, 28, 21, 8, 1, 302, DateTimeKind.Local).AddTicks(5272), new DateTime(2025, 5, 28, 21, 8, 1, 302, DateTimeKind.Local).AddTicks(5273) });

            migrationBuilder.UpdateData(
                table: "Tours",
                keyColumn: "TourId",
                keyValue: 7,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 5, 28, 21, 8, 1, 302, DateTimeKind.Local).AddTicks(5280), new DateTime(2025, 5, 28, 21, 8, 1, 302, DateTimeKind.Local).AddTicks(5283) });

            migrationBuilder.UpdateData(
                table: "Tours",
                keyColumn: "TourId",
                keyValue: 8,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 5, 28, 21, 8, 1, 302, DateTimeKind.Local).AddTicks(5293), new DateTime(2025, 5, 28, 21, 8, 1, 302, DateTimeKind.Local).AddTicks(5297) });

            migrationBuilder.UpdateData(
                table: "Tours",
                keyColumn: "TourId",
                keyValue: 9,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 5, 28, 21, 8, 1, 302, DateTimeKind.Local).AddTicks(5312), new DateTime(2025, 5, 28, 21, 8, 1, 302, DateTimeKind.Local).AddTicks(5317) });

            migrationBuilder.UpdateData(
                table: "Tours",
                keyColumn: "TourId",
                keyValue: 10,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 5, 28, 21, 8, 1, 302, DateTimeKind.Local).AddTicks(5330), new DateTime(2025, 5, 28, 21, 8, 1, 302, DateTimeKind.Local).AddTicks(5333) });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2025, 5, 28, 21, 8, 1, 302, DateTimeKind.Local).AddTicks(4265));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 2,
                column: "CreatedAt",
                value: new DateTime(2025, 5, 28, 21, 8, 1, 302, DateTimeKind.Local).AddTicks(4273));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 3,
                column: "CreatedAt",
                value: new DateTime(2025, 5, 28, 21, 8, 1, 302, DateTimeKind.Local).AddTicks(4278));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 4,
                column: "CreatedAt",
                value: new DateTime(2025, 5, 28, 21, 8, 1, 302, DateTimeKind.Local).AddTicks(4283));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 5,
                column: "CreatedAt",
                value: new DateTime(2025, 5, 28, 21, 8, 1, 302, DateTimeKind.Local).AddTicks(4288));
        }
    }
}
