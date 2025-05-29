using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace STPS_REACT.Server.Migrations
{
    /// <inheritdoc />
    public partial class db5 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Reviews",
                keyColumn: "ReviewId",
                keyValue: 1,
                column: "ReviewDate",
                value: new DateTime(2025, 5, 22, 21, 36, 41, 670, DateTimeKind.Local).AddTicks(429));

            migrationBuilder.UpdateData(
                table: "Reviews",
                keyColumn: "ReviewId",
                keyValue: 2,
                column: "ReviewDate",
                value: new DateTime(2025, 5, 17, 21, 36, 41, 670, DateTimeKind.Local).AddTicks(449));

            migrationBuilder.UpdateData(
                table: "Reviews",
                keyColumn: "ReviewId",
                keyValue: 3,
                column: "ReviewDate",
                value: new DateTime(2025, 5, 20, 21, 36, 41, 670, DateTimeKind.Local).AddTicks(453));

            migrationBuilder.UpdateData(
                table: "Reviews",
                keyColumn: "ReviewId",
                keyValue: 4,
                column: "ReviewDate",
                value: new DateTime(2025, 5, 12, 21, 36, 41, 670, DateTimeKind.Local).AddTicks(457));

            migrationBuilder.UpdateData(
                table: "Reviews",
                keyColumn: "ReviewId",
                keyValue: 5,
                column: "ReviewDate",
                value: new DateTime(2025, 5, 19, 21, 36, 41, 670, DateTimeKind.Local).AddTicks(461));

            migrationBuilder.UpdateData(
                table: "Reviews",
                keyColumn: "ReviewId",
                keyValue: 6,
                column: "ReviewDate",
                value: new DateTime(2025, 5, 7, 21, 36, 41, 670, DateTimeKind.Local).AddTicks(465));

            migrationBuilder.UpdateData(
                table: "Tours",
                keyColumn: "TourId",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 5, 27, 21, 36, 41, 669, DateTimeKind.Local).AddTicks(9011), new DateTime(2025, 5, 27, 21, 36, 41, 669, DateTimeKind.Local).AddTicks(9012) });

            migrationBuilder.UpdateData(
                table: "Tours",
                keyColumn: "TourId",
                keyValue: 2,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 5, 27, 21, 36, 41, 669, DateTimeKind.Local).AddTicks(9048), new DateTime(2025, 5, 27, 21, 36, 41, 669, DateTimeKind.Local).AddTicks(9049) });

            migrationBuilder.UpdateData(
                table: "Tours",
                keyColumn: "TourId",
                keyValue: 3,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 5, 27, 21, 36, 41, 669, DateTimeKind.Local).AddTicks(9060), new DateTime(2025, 5, 27, 21, 36, 41, 669, DateTimeKind.Local).AddTicks(9061) });

            migrationBuilder.UpdateData(
                table: "Tours",
                keyColumn: "TourId",
                keyValue: 4,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 5, 27, 21, 36, 41, 669, DateTimeKind.Local).AddTicks(9080), new DateTime(2025, 5, 27, 21, 36, 41, 669, DateTimeKind.Local).AddTicks(9081) });

            migrationBuilder.UpdateData(
                table: "Tours",
                keyColumn: "TourId",
                keyValue: 5,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 5, 27, 21, 36, 41, 669, DateTimeKind.Local).AddTicks(9097), new DateTime(2025, 5, 27, 21, 36, 41, 669, DateTimeKind.Local).AddTicks(9225) });

            migrationBuilder.UpdateData(
                table: "Tours",
                keyColumn: "TourId",
                keyValue: 6,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 5, 27, 21, 36, 41, 669, DateTimeKind.Local).AddTicks(9376), new DateTime(2025, 5, 27, 21, 36, 41, 669, DateTimeKind.Local).AddTicks(9382) });

            migrationBuilder.UpdateData(
                table: "Tours",
                keyColumn: "TourId",
                keyValue: 7,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 5, 27, 21, 36, 41, 669, DateTimeKind.Local).AddTicks(9388), new DateTime(2025, 5, 27, 21, 36, 41, 669, DateTimeKind.Local).AddTicks(9389) });

            migrationBuilder.UpdateData(
                table: "Tours",
                keyColumn: "TourId",
                keyValue: 8,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 5, 27, 21, 36, 41, 669, DateTimeKind.Local).AddTicks(9396), new DateTime(2025, 5, 27, 21, 36, 41, 669, DateTimeKind.Local).AddTicks(9397) });

            migrationBuilder.UpdateData(
                table: "Tours",
                keyColumn: "TourId",
                keyValue: 9,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 5, 27, 21, 36, 41, 669, DateTimeKind.Local).AddTicks(9404), new DateTime(2025, 5, 27, 21, 36, 41, 669, DateTimeKind.Local).AddTicks(9405) });

            migrationBuilder.UpdateData(
                table: "Tours",
                keyColumn: "TourId",
                keyValue: 10,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 5, 27, 21, 36, 41, 669, DateTimeKind.Local).AddTicks(9417), new DateTime(2025, 5, 27, 21, 36, 41, 669, DateTimeKind.Local).AddTicks(9418) });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2025, 5, 27, 21, 36, 41, 669, DateTimeKind.Local).AddTicks(8092));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 2,
                column: "CreatedAt",
                value: new DateTime(2025, 5, 27, 21, 36, 41, 669, DateTimeKind.Local).AddTicks(8098));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 3,
                column: "CreatedAt",
                value: new DateTime(2025, 5, 27, 21, 36, 41, 669, DateTimeKind.Local).AddTicks(8103));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 4,
                column: "CreatedAt",
                value: new DateTime(2025, 5, 27, 21, 36, 41, 669, DateTimeKind.Local).AddTicks(8108));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 5,
                column: "CreatedAt",
                value: new DateTime(2025, 5, 27, 21, 36, 41, 669, DateTimeKind.Local).AddTicks(8113));
        }
    }
}
