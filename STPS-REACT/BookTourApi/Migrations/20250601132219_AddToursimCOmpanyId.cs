using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BookTour.Migrations
{
    /// <inheritdoc />
    public partial class AddToursimCOmpanyId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "TourismCompanyId",
                table: "PaymentTransactions",
                type: "int",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "Reviews",
                keyColumn: "ReviewId",
                keyValue: 1,
                column: "ReviewDate",
                value: new DateTime(2025, 5, 27, 20, 22, 18, 549, DateTimeKind.Local).AddTicks(8011));

            migrationBuilder.UpdateData(
                table: "Reviews",
                keyColumn: "ReviewId",
                keyValue: 2,
                column: "ReviewDate",
                value: new DateTime(2025, 5, 22, 20, 22, 18, 549, DateTimeKind.Local).AddTicks(8017));

            migrationBuilder.UpdateData(
                table: "Reviews",
                keyColumn: "ReviewId",
                keyValue: 3,
                column: "ReviewDate",
                value: new DateTime(2025, 5, 25, 20, 22, 18, 549, DateTimeKind.Local).AddTicks(8019));

            migrationBuilder.UpdateData(
                table: "Reviews",
                keyColumn: "ReviewId",
                keyValue: 4,
                column: "ReviewDate",
                value: new DateTime(2025, 5, 17, 20, 22, 18, 549, DateTimeKind.Local).AddTicks(8021));

            migrationBuilder.UpdateData(
                table: "Reviews",
                keyColumn: "ReviewId",
                keyValue: 5,
                column: "ReviewDate",
                value: new DateTime(2025, 5, 24, 20, 22, 18, 549, DateTimeKind.Local).AddTicks(8023));

            migrationBuilder.UpdateData(
                table: "Reviews",
                keyColumn: "ReviewId",
                keyValue: 6,
                column: "ReviewDate",
                value: new DateTime(2025, 5, 12, 20, 22, 18, 549, DateTimeKind.Local).AddTicks(8024));

            migrationBuilder.UpdateData(
                table: "Tours",
                keyColumn: "TourId",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 6, 1, 20, 22, 18, 549, DateTimeKind.Local).AddTicks(7416), new DateTime(2025, 6, 1, 20, 22, 18, 549, DateTimeKind.Local).AddTicks(7417) });

            migrationBuilder.UpdateData(
                table: "Tours",
                keyColumn: "TourId",
                keyValue: 2,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 6, 1, 20, 22, 18, 549, DateTimeKind.Local).AddTicks(7420), new DateTime(2025, 6, 1, 20, 22, 18, 549, DateTimeKind.Local).AddTicks(7420) });

            migrationBuilder.UpdateData(
                table: "Tours",
                keyColumn: "TourId",
                keyValue: 3,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 6, 1, 20, 22, 18, 549, DateTimeKind.Local).AddTicks(7423), new DateTime(2025, 6, 1, 20, 22, 18, 549, DateTimeKind.Local).AddTicks(7424) });

            migrationBuilder.UpdateData(
                table: "Tours",
                keyColumn: "TourId",
                keyValue: 4,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 6, 1, 20, 22, 18, 549, DateTimeKind.Local).AddTicks(7426), new DateTime(2025, 6, 1, 20, 22, 18, 549, DateTimeKind.Local).AddTicks(7427) });

            migrationBuilder.UpdateData(
                table: "Tours",
                keyColumn: "TourId",
                keyValue: 5,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 6, 1, 20, 22, 18, 549, DateTimeKind.Local).AddTicks(7429), new DateTime(2025, 6, 1, 20, 22, 18, 549, DateTimeKind.Local).AddTicks(7430) });

            migrationBuilder.UpdateData(
                table: "Tours",
                keyColumn: "TourId",
                keyValue: 6,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 6, 1, 20, 22, 18, 549, DateTimeKind.Local).AddTicks(7432), new DateTime(2025, 6, 1, 20, 22, 18, 549, DateTimeKind.Local).AddTicks(7433) });

            migrationBuilder.UpdateData(
                table: "Tours",
                keyColumn: "TourId",
                keyValue: 7,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 6, 1, 20, 22, 18, 549, DateTimeKind.Local).AddTicks(7436), new DateTime(2025, 6, 1, 20, 22, 18, 549, DateTimeKind.Local).AddTicks(7436) });

            migrationBuilder.UpdateData(
                table: "Tours",
                keyColumn: "TourId",
                keyValue: 8,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 6, 1, 20, 22, 18, 549, DateTimeKind.Local).AddTicks(7439), new DateTime(2025, 6, 1, 20, 22, 18, 549, DateTimeKind.Local).AddTicks(7439) });

            migrationBuilder.UpdateData(
                table: "Tours",
                keyColumn: "TourId",
                keyValue: 9,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 6, 1, 20, 22, 18, 549, DateTimeKind.Local).AddTicks(7442), new DateTime(2025, 6, 1, 20, 22, 18, 549, DateTimeKind.Local).AddTicks(7442) });

            migrationBuilder.UpdateData(
                table: "Tours",
                keyColumn: "TourId",
                keyValue: 10,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 6, 1, 20, 22, 18, 549, DateTimeKind.Local).AddTicks(7445), new DateTime(2025, 6, 1, 20, 22, 18, 549, DateTimeKind.Local).AddTicks(7445) });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 1, 20, 22, 18, 549, DateTimeKind.Local).AddTicks(7196));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 2,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 1, 20, 22, 18, 549, DateTimeKind.Local).AddTicks(7199));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 3,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 1, 20, 22, 18, 549, DateTimeKind.Local).AddTicks(7201));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 4,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 1, 20, 22, 18, 549, DateTimeKind.Local).AddTicks(7203));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 5,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 1, 20, 22, 18, 549, DateTimeKind.Local).AddTicks(7205));

            migrationBuilder.CreateIndex(
                name: "IX_PaymentTransactions_TourismCompanyId",
                table: "PaymentTransactions",
                column: "TourismCompanyId");

            migrationBuilder.AddForeignKey(
                name: "FK_PaymentTransactions_TourismCompanies_TourismCompanyId",
                table: "PaymentTransactions",
                column: "TourismCompanyId",
                principalTable: "TourismCompanies",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PaymentTransactions_TourismCompanies_TourismCompanyId",
                table: "PaymentTransactions");

            migrationBuilder.DropIndex(
                name: "IX_PaymentTransactions_TourismCompanyId",
                table: "PaymentTransactions");

            migrationBuilder.DropColumn(
                name: "TourismCompanyId",
                table: "PaymentTransactions");

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
        }
    }
}
