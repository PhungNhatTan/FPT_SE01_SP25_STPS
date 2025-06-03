using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BookTour.Migrations
{
    /// <inheritdoc />
    public partial class RemoveUnforeignkey : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PaymentTransactions_RefundRequests_RefundRequestId",
                table: "PaymentTransactions");

            migrationBuilder.DropForeignKey(
                name: "FK_PaymentTransactions_TourismCompanies_TourismCompanyId",
                table: "PaymentTransactions");

            migrationBuilder.DropIndex(
                name: "IX_PaymentTransactions_RefundRequestId",
                table: "PaymentTransactions");

            migrationBuilder.DropIndex(
                name: "IX_PaymentTransactions_TourismCompanyId",
                table: "PaymentTransactions");

            migrationBuilder.DropColumn(
                name: "RefundRequestId",
                table: "PaymentTransactions");

            migrationBuilder.DropColumn(
                name: "TourismCompanyId",
                table: "PaymentTransactions");

            migrationBuilder.UpdateData(
                table: "Reviews",
                keyColumn: "ReviewId",
                keyValue: 1,
                column: "ReviewDate",
                value: new DateTime(2025, 5, 28, 22, 36, 41, 90, DateTimeKind.Local).AddTicks(6916));

            migrationBuilder.UpdateData(
                table: "Reviews",
                keyColumn: "ReviewId",
                keyValue: 2,
                column: "ReviewDate",
                value: new DateTime(2025, 5, 23, 22, 36, 41, 90, DateTimeKind.Local).AddTicks(6922));

            migrationBuilder.UpdateData(
                table: "Reviews",
                keyColumn: "ReviewId",
                keyValue: 3,
                column: "ReviewDate",
                value: new DateTime(2025, 5, 26, 22, 36, 41, 90, DateTimeKind.Local).AddTicks(6957));

            migrationBuilder.UpdateData(
                table: "Reviews",
                keyColumn: "ReviewId",
                keyValue: 4,
                column: "ReviewDate",
                value: new DateTime(2025, 5, 18, 22, 36, 41, 90, DateTimeKind.Local).AddTicks(6959));

            migrationBuilder.UpdateData(
                table: "Reviews",
                keyColumn: "ReviewId",
                keyValue: 5,
                column: "ReviewDate",
                value: new DateTime(2025, 5, 25, 22, 36, 41, 90, DateTimeKind.Local).AddTicks(6960));

            migrationBuilder.UpdateData(
                table: "Reviews",
                keyColumn: "ReviewId",
                keyValue: 6,
                column: "ReviewDate",
                value: new DateTime(2025, 5, 13, 22, 36, 41, 90, DateTimeKind.Local).AddTicks(6962));

            migrationBuilder.UpdateData(
                table: "Tours",
                keyColumn: "TourId",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 6, 2, 22, 36, 41, 90, DateTimeKind.Local).AddTicks(6530), new DateTime(2025, 6, 2, 22, 36, 41, 90, DateTimeKind.Local).AddTicks(6530) });

            migrationBuilder.UpdateData(
                table: "Tours",
                keyColumn: "TourId",
                keyValue: 2,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 6, 2, 22, 36, 41, 90, DateTimeKind.Local).AddTicks(6534), new DateTime(2025, 6, 2, 22, 36, 41, 90, DateTimeKind.Local).AddTicks(6534) });

            migrationBuilder.UpdateData(
                table: "Tours",
                keyColumn: "TourId",
                keyValue: 3,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 6, 2, 22, 36, 41, 90, DateTimeKind.Local).AddTicks(6537), new DateTime(2025, 6, 2, 22, 36, 41, 90, DateTimeKind.Local).AddTicks(6538) });

            migrationBuilder.UpdateData(
                table: "Tours",
                keyColumn: "TourId",
                keyValue: 4,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 6, 2, 22, 36, 41, 90, DateTimeKind.Local).AddTicks(6541), new DateTime(2025, 6, 2, 22, 36, 41, 90, DateTimeKind.Local).AddTicks(6541) });

            migrationBuilder.UpdateData(
                table: "Tours",
                keyColumn: "TourId",
                keyValue: 5,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 6, 2, 22, 36, 41, 90, DateTimeKind.Local).AddTicks(6544), new DateTime(2025, 6, 2, 22, 36, 41, 90, DateTimeKind.Local).AddTicks(6544) });

            migrationBuilder.UpdateData(
                table: "Tours",
                keyColumn: "TourId",
                keyValue: 6,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 6, 2, 22, 36, 41, 90, DateTimeKind.Local).AddTicks(6547), new DateTime(2025, 6, 2, 22, 36, 41, 90, DateTimeKind.Local).AddTicks(6547) });

            migrationBuilder.UpdateData(
                table: "Tours",
                keyColumn: "TourId",
                keyValue: 7,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 6, 2, 22, 36, 41, 90, DateTimeKind.Local).AddTicks(6550), new DateTime(2025, 6, 2, 22, 36, 41, 90, DateTimeKind.Local).AddTicks(6550) });

            migrationBuilder.UpdateData(
                table: "Tours",
                keyColumn: "TourId",
                keyValue: 8,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 6, 2, 22, 36, 41, 90, DateTimeKind.Local).AddTicks(6553), new DateTime(2025, 6, 2, 22, 36, 41, 90, DateTimeKind.Local).AddTicks(6554) });

            migrationBuilder.UpdateData(
                table: "Tours",
                keyColumn: "TourId",
                keyValue: 9,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 6, 2, 22, 36, 41, 90, DateTimeKind.Local).AddTicks(6556), new DateTime(2025, 6, 2, 22, 36, 41, 90, DateTimeKind.Local).AddTicks(6557) });

            migrationBuilder.UpdateData(
                table: "Tours",
                keyColumn: "TourId",
                keyValue: 10,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 6, 2, 22, 36, 41, 90, DateTimeKind.Local).AddTicks(6559), new DateTime(2025, 6, 2, 22, 36, 41, 90, DateTimeKind.Local).AddTicks(6560) });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 2, 22, 36, 41, 90, DateTimeKind.Local).AddTicks(6344));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 2,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 2, 22, 36, 41, 90, DateTimeKind.Local).AddTicks(6347));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 3,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 2, 22, 36, 41, 90, DateTimeKind.Local).AddTicks(6349));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 4,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 2, 22, 36, 41, 90, DateTimeKind.Local).AddTicks(6350));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 5,
                column: "CreatedAt",
                value: new DateTime(2025, 6, 2, 22, 36, 41, 90, DateTimeKind.Local).AddTicks(6352));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "RefundRequestId",
                table: "PaymentTransactions",
                type: "int",
                nullable: true);

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
                name: "IX_PaymentTransactions_RefundRequestId",
                table: "PaymentTransactions",
                column: "RefundRequestId");

            migrationBuilder.CreateIndex(
                name: "IX_PaymentTransactions_TourismCompanyId",
                table: "PaymentTransactions",
                column: "TourismCompanyId");

            migrationBuilder.AddForeignKey(
                name: "FK_PaymentTransactions_RefundRequests_RefundRequestId",
                table: "PaymentTransactions",
                column: "RefundRequestId",
                principalTable: "RefundRequests",
                principalColumn: "RefundRequestId");

            migrationBuilder.AddForeignKey(
                name: "FK_PaymentTransactions_TourismCompanies_TourismCompanyId",
                table: "PaymentTransactions",
                column: "TourismCompanyId",
                principalTable: "TourismCompanies",
                principalColumn: "Id");
        }
    }
}
