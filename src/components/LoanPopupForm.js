import React, { useState } from "react";
import "./LoanPopupForm.css";  // Assuming you have your CSS for popup here

export default function LoanPopupForm({ onClose, userId, fetchLoans }) {
    // const userId = localStorage.getItem("userId")
  const [loanData, setLoanData] = useState({
    userId: userId,
    amount: "",
    loanTenure: "",
    reasonForLoan: "",
    address: "",
    fullName: "",
    approved: "no", // Assuming a radio input for approval status
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoanData({ ...loanData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://backend-creadisea.onrender.com/api/user/requestLoan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loanData),
      });

      const result = await response.json();
      if (result.success) {
        alert("Loan request added successfully!");

        onClose();  // Close the popup on successful submission
        fetchLoans()
      } else {
        alert("Failed to request loan: " + result.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Server error during loan request.");
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <div className="popup-title">Request a Loan</div>
<form onSubmit={handleSubmit}>
  <label>
    <p>Please add amount</p>
    <input
      type="text"
      name="amount"
      value={loanData.amount}
      onChange={handleInputChange}
      placeholder="Amount"
      required
    />
  </label>

  <label>
    <p>Please add loan tenure</p>
    <input
      type="text"
      name="loanTenure"
      value={loanData.loanTenure}
      onChange={handleInputChange}
      placeholder="Loan Tenure"
      required
    />
  </label>

  <label>
    <p>Please add reason for loan</p>
    <input
      type="text"
      name="reasonForLoan"
      value={loanData.reasonForLoan}
      onChange={handleInputChange}
      placeholder="Reason for Loan"
      required
    />
  </label>

  <label>
    <p>Please add address</p>
    <input
      type="text"
      name="address"
      value={loanData.address}
      onChange={handleInputChange}
      placeholder="Address"
      required
    />
  </label>

  <label>
    <p>Please add full name</p>
    <input
      type="text"
      name="fullName"
      value={loanData.fullName}
      onChange={handleInputChange}
      placeholder="Full Name"
      required
    />
  </label>

  <div className="radio-container">
    <p>Please select approval status</p>
    <label className="radio-label">
      <input
        type="radio"
        name="approved"
        value="yes"
        onChange={handleInputChange}
        checked={loanData.approved === "yes"}
      />
      Yes
    </label>
    <label className="radio-label">
      <input
        type="radio"
        name="approved"
        value="no"
        onChange={handleInputChange}
        checked={loanData.approved === "no"}
      />
      No
    </label>
  </div>

  <button type="submit" className="popup-button">
    Get Loan
  </button>
</form>

        <button onClick={onClose} className="popup-button">Close</button>
      </div>
    </div>
  );
}
