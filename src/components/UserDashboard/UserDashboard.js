import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import LoanCard from "../LoanCard/LoanCard";
import "./UserDashboard.css";
import LoanPopupForm from "../LoanPopupForm";

export default function UserDashboard() {
  const [loanData, setLoanData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showPopup, setShowPopup] = useState(false);  // Added state for showing popup
  const userId = localStorage.getItem("userId");

  // const fetchLoans = async() => {
  //   try {
  //     const response = await fetch("http://localhost:8888/api/user/getLoansByUser", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ userId}),
  //     });
  //     const result = await response.json();

  //     if (result.success) {
  //       setLoanData(result.data);
  //     } else {
  //       setLoanData([]);
  //       console.error("Error fetching loans", result.message);
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

  const fetchLoans = async (name = "") => {
  try {
    const url = name
      ? "https://backend-creadisea.onrender.com/api/user/searchLoansByName"
      : "https://backend-creadisea.onrender.com/api/user/getLoansByUser";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(name ? { userId, name } : { userId }),
    });

    const result = await response.json();

    if (result.success) {
      setLoanData(result.data);
    } else {
      setLoanData([]);
      console.error("Error fetching loans", result.message);
    }
  } catch (error) {
    console.error("Error:", error);
  }
};


  useEffect(() => {
    fetchLoans();
  }, [userId]);

 const handleSearchChange = (e) => {
  const term = e.target.value;
  setSearchTerm(term);
  fetchLoans(term); // Will automatically use the new API if search term is present
};


  const handleGetLoanClick = () => {
    setShowPopup(true);  // Show the popup when the button is clicked
  };

  const handleClosePopup = () => {
    setShowPopup(false);  // Close the popup when the user is done
  };

  return (
    <div>
      <Header />
      <div className="main-cnt-of-userdashboard">
        <div className="balance-section">
          <div className="balance-card">
            <div>DEFICIT</div>
            <h2>₦ 0.0</h2>
          </div>
          <button className="loan-button" onClick={handleGetLoanClick}>Get A Loan</button>
        </div>

        <div className="tabs">
          <button className="tab active">Borrow Cash</button>
          <button className="tab">Transact</button>
          <button className="tab">Deposit Cash</button>
        </div>

        <div className="search-container">
          <input
            type="text"
            placeholder="Search for officer name"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        <div className="loan-table">
          <h3>Applied Loans</h3>
          <div className="table-header">
            <span>Loan Officer</span>
            <span>Amount</span>
            <span>Date Applied</span>
            <span>Status</span>
          </div>

          {loanData.map((loan) => (
            <LoanCard
              key={loan._id}
              loan={{
                officer: loan.fullName || "Unknown",
                amount: loan.amount,
                date: new Date(loan.date).toLocaleDateString(),
                status: loan.status.toUpperCase(),
              }}
            />
          ))}
        </div>
      </div>

      {/* Show LoanPopupForm when showPopup is true */}
      {showPopup && <LoanPopupForm onClose={handleClosePopup} userId={userId} fetchLoans={fetchLoans}/>}
    </div>
  );
}
