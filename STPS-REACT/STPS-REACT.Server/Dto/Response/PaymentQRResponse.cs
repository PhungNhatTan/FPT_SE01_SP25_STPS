namespace STPS_REACT.Server.Dto.Response
{
    public class PaymentQRResponse
    {
        public int BookingId { get; set; }
        public decimal Amount { get; set; }
        public string QRContent { get; set; }
        public AdminBankAccountInfo AdminBankAccount { get; set; }
        public string TransactionId { get; set; }
    }

    public class AdminBankAccountInfo
    {
        public string BankName { get; set; }
        public string AccountNumber { get; set; }
        public string AccountHolderName { get; set; }
        public string PaymentContent { get; set; }
    }
}
