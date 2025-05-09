import React, { useEffect, useState } from "react";
import "./AdminDashboard.css";
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const adminName = localStorage.getItem("adminName") || "Admin";
  const navigate = useNavigate();
  const [loanData, setLoanData] = useState([]);


  const [showModal, setShowModal] = useState(false);
const [selectedLoanId, setSelectedLoanId] = useState(null);
const [newStatus, setNewStatus] = useState("");

const openModal = (loanId, currentStatus) => {
  setSelectedLoanId(loanId);
  setNewStatus(currentStatus);
  setShowModal(true);
};

const closeModal = () => {
  setShowModal(false);
  setSelectedLoanId(null);
  setNewStatus("");
};

const updateLoanStatus = async () => {
  try {
    const response = await fetch(`https://backend-creadisea.onrender.com/api/admin/updateLoanStatus/${selectedLoanId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ status: newStatus })
    });

    const result = await response.json();

    if (result.success) {
      fetchLoans(); // refresh the data
      closeModal(); // close popup
    } else {
      alert("Failed to update loan status");
    }
  } catch (err) {
    console.error(err);
    alert("Error while updating status");
  }
};


  const metrics = [
    { label: "ACTIVE USERS", value: "200", icon: "👤" },
    { label: "BORROWERS", value: "100", icon: "👥" },
    { label: "CASH DISBURSED", value: "550,000", icon: "💵" },
    { label: "CASH RECEIVED", value: "1,000,000", icon: "🏦" },
    { label: "SAVINGS", value: "450,000", icon: "💰" },
    { label: "REPAID LOANS", value: "30", icon: "📈" },
    { label: "OTHER ACCOUNTS", value: "10", icon: "🏛️" },
    { label: "LOANS", value: "50", icon: "💳" },
  ];

  const fetchLoans = async () => {
    try {
      const response = await fetch("https://backend-creadisea.onrender.com/api/admin/getLoansByUser", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });

      const result = await response.json();

      if (result.success) {
        setLoanData(result.data);
      } else {
        console.error("Error fetching loans:", result.message);
        setLoanData([]);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchLoans();
  }, []);

  return (
    <div className="admin-dashboard">
      <aside className="sidebar">
        <div className="logo">CREDIT APP</div>
        <div className="user-section">
          <div className="avatar">👤</div>
          <div className="username">{adminName}</div>
          <button className="tab active" onClick={() => {
            localStorage.clear();
            navigate("/");
          }}>Logout</button>
        </div>
        <nav>
          <ul>
            <li>Dashboard</li>
            <li>Borrowers</li>
            <li>Loans</li>
            <li>Repayments</li>
            <li>Loan Parameters</li>
            <li>Accounting</li>
            <li>Reports</li>
            <li>Collateral</li>
            <li>Access Configuration</li>
            <li>Savings</li>
            <li>Other Incomes</li>
            <li>Payroll</li>
            <li>Expenses</li>
            <li>E-signature</li>
            <li>Investor Accounts</li>
            <li>Calendar</li>
            <li>Settings</li>
          </ul>
        </nav>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div className="title">Dashboard</div>
          <div className="admin-controls">{adminName}</div>
        </header>

        <div className="metrics">
          {metrics.map((m, index) => (
            <div className="metric-box" key={index}>
              <div className="metric-icon">{m.icon}</div>
              <div className="metric-value">{m.value}</div>
              <div className="metric-label">{m.label}</div>
            </div>
          ))}
        </div>

        <section className="recent-loans">
          <h2>Recent Loans</h2>
          <table>
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Updated At</th>
                 <th>status change</th>
              </tr>
            </thead>
            <tbody>
              {loanData.length > 0 ? (
                loanData.map((loan, i) => (
                  <tr key={i}>
                    <td>{loan.fullName || "N/A"}</td>
                    <td>₹ {loan.amount}</td>
                    <td>
                      <span className={`status ${loan.status.toLowerCase()}`}>
                        {loan.status}
                      </span>
                    </td>
                    <td>{new Date(loan.updatedAt).toLocaleString()}</td>
                    <td>
                    <button onClick={() => openModal(loan._id, loan.status)}>Edit</button>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No loans found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
        {showModal && (
  <div className="modal-overlay">
    <div className="modal-content">
      <h3>Change Loan Status</h3>
      <select value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
        <option value="pending">Pending</option>
        <option value="rejected">Rejected</option>
        <option value="verified">Verified</option>
        <option value="approved">Approved</option>
      </select>
      <div className="modal-actions">
        <button onClick={updateLoanStatus}>Submit</button>
        <button onClick={closeModal} className="cancel-btn">Cancel</button>
      </div>
    </div>
  </div>
)}

      </main>
    </div>
  );
};

export default AdminDashboard;
