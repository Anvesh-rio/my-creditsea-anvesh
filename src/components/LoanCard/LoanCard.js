import React from "react";
import "./LoanCard.css";

const statusColors = {
  PENDING: "#f1c40f",
  VERIFIED: "#2ecc71",
  REJECTED: "#e74c3c",
  APPROVED: "#2980b9",
};

export default function LoanCard({ loan }) {
  const userName = localStorage.getItem('userName');
  return (
    <div className="loan-card">
      <div className="loan-officer">
        <img
          src="https://i.pravatar.cc/100"
          alt="officer"
          className="officer-img"
        />
        <div>
          <strong>{loan.officer}</strong>
          <div>{loan.updatedAt}</div> {/* This can be dynamically set based on loan data */}
        </div>
      </div>
      <div>₦{loan.amount.toLocaleString()}</div>
      <div>
        <div>{loan.date}</div>
        {/* If you have a separate time field, you can add it here */}
      </div>
      <div>
        <span
          className="status-badge"
          style={{ backgroundColor: statusColors[loan.status] }}
        >
          {loan.status}
        </span>
      </div>
    </div>
  );
}
