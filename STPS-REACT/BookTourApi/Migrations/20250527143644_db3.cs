using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BookTour.Migrations
{
    /// <inheritdoc />
    public partial class db3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Reason",
                table: "RefundRequests",
                type: "nvarchar(500)",
                maxLength: 500,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(500)",
                oldMaxLength: 500);

            migrationBuilder.AlterColumn<string>(
                name: "AdminNotes",
                table: "RefundRequests",
                type: "nvarchar(500)",
                maxLength: 500,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(500)",
                oldMaxLength: 500);

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Reason",
                table: "RefundRequests",
                type: "nvarchar(500)",
                maxLength: 500,
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(500)",
                oldMaxLength: 500,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "AdminNotes",
                table: "RefundRequests",
                type: "nvarchar(500)",
                maxLength: 500,
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(500)",
                oldMaxLength: 500,
                oldNullable: true);

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
        }
    }
}
