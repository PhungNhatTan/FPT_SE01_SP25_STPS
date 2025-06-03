import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PaymentStatus.css';

interface RevenueTransaction {
  bookingId: number;
  amount: number;
  processedDate: string;
  notes: string;
}

interface PaymentDetails {
  transactionId: number;
  companyId: number;
  companyName: string;
  amount: number;
  paymentStatus: string;
  paymentTime: string;
  paymentDetails: string;
  numberOfTransactions: number;
  revenueTransactions: RevenueTransaction[];
}

interface PaymentStatusProps {
  paymentDetails: PaymentDetails | null;
}

const getStatusClass = (status: string): string => {
  switch (status.toLowerCase()) {
    case 'success':
      return 'status-success';
    case 'pending':
      return 'status-pending';
    case 'failed':
      return 'status-failed';
    default:
      return 'status-unknown';
  }
};

const PaymentStatus = ({ paymentDetails }: PaymentStatusProps) => {
  const navigate = useNavigate();

  if (!paymentDetails) {
    return <div>No payment details available</div>;
  }

  return (
    <div className="booking-status-container">
      <div className="booking-status-card">
        <h1 className="booking-status-title">Company Payment Status</h1>
        
        <div className="status-badge">
          <span className={`status-indicator ${getStatusClass(paymentDetails.paymentStatus)}`}>
            {paymentDetails.paymentStatus.toUpperCase()}
          </span>
        </div>

        <div className="booking-details">
          <div className="detail-row">
            <span className="detail-label">Company Name:</span>
            <span className="detail-value">{paymentDetails.companyName}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Transaction ID:</span>
            <span className="detail-value">{paymentDetails.transactionId}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Total Amount:</span>
            <span className="detail-value">
              {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
                .format(paymentDetails.amount)}
            </span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Payment Status:</span>
            <span className="detail-value">{paymentDetails.paymentStatus}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Payment Time:</span>
            <span className="detail-value">
              {paymentDetails.paymentTime ? new Date(paymentDetails.paymentTime).toLocaleString('vi-VN') : 'N/A'}
            </span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Number of Transactions:</span>
            <span className="detail-value">{paymentDetails.numberOfTransactions}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Payment Description:</span>
            <span className="detail-value">{paymentDetails.paymentDetails}</span>
          </div>
        </div>

        <div className="action-buttons">
          <button
            className="back-button"
            onClick={() => navigate('/company/dashboard')}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentStatus; 