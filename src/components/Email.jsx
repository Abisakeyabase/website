import React from "react";
// import "./Invoice.css"; // Optional if you're separating styles

const Email = ({ data }) => {
  const {
    enrollmentId,
    date,
    userName,
    userEmail,
    userPhone,
    courseName,
    duration,
    baseAmount,
    gstAmount,
    totalAmount,
  } = data;

  return (
    <div id="invoice-content" style={{ fontFamily: "Arial, sans-serif", color: "#000", margin: "30px" }}>
      {/* Header */}
      <div style={{ textAlign: "center" }}>
        <img
          src="https://www.vetritechnologysolutions.in/static/images/vtslogo.jpg"
          alt="Logo"
          style={{ width: "80px", height: "80px", borderRadius: "50%", objectFit: "cover" }}
        />
        <h1 style={{ margin: 0 }}>Vetri</h1>
        <h2 style={{ margin: "5px 0" }}>Technology Solutions</h2>
      </div>

      {/* Title */}
      <div style={{ textAlign: "center", fontSize: "22px", fontWeight: "bold", textDecoration: "underline", marginTop: "30px" }}>
        IT Training Fees Payment Invoice
      </div>

      {/* Invoice Info */}
      <div style={{ marginTop: "20px" }}>
        <p><strong>Invoice Number:</strong> {enrollmentId}</p>
        <p><strong>Date:</strong> {date}</p>
      </div>

      {/* Billing Info */}
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
        <div style={{ width: "45%" }}>
          <h3>Bill From:</h3>
          <p><strong>GST No:</strong> 33FGPP6566F1Z9</p>
          <p>Vetri Technology Solutions</p>
          <p>Old Ward No 17, 1-9-140/29, Sivagurunathapuram, Surandai,</p>
          <p>Tenkasi, Tamil Nadu - 627859</p>
          <p>Phone: 8438164827 / 8438781327</p>
        </div>
        <div style={{ width: "45%" }}>
          <h3>Bill To:</h3>
          <p><strong>GST No:</strong> N/A</p>
          <p>{userName}</p>
          <p>{userEmail}</p>
          <p>{userPhone}</p>
        </div>
      </div>

      {/* Table */}
      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
        <thead>
          <tr>
            <th style={thStyle}>Course Name</th>
            <th style={thStyle}>Duration</th>
            <th style={thStyle}>Price</th>
            <th style={thStyle}>GST (18%)</th>
            <th style={thStyle}>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={tdStyle}>{courseName}</td>
            <td style={tdStyle}>{duration} Days</td>
            <td style={tdStyle}>₹{baseAmount}</td>
            <td style={tdStyle}>₹{gstAmount}</td>
            <td style={{ ...tdStyle, fontWeight: "bold" }}>₹{totalAmount}</td>
          </tr>
        </tbody>
      </table>

      {/* Totals */}
      <div style={{ textAlign: "right", marginTop: "20px", fontWeight: "bold", fontSize: "16px" }}>
        <p>GST (18%): ₹{gstAmount}</p>
        <p>Total Paid: ₹{totalAmount}</p>
      </div>

      {/* Note */}
      <div style={{ textAlign: "center", marginTop: "20px", fontSize: "12px", color: "red" }}>
        ★ This is a system-generated invoice, signature not required. ★
      </div>

      {/* Page break for terms */}
      <div style={{ pageBreakBefore: "always" }} />

      {/* Terms and Conditions */}
      <div style={{ marginTop: "30px" }}>
        <h2 style={{ textAlign: "center", textDecoration: "underline" }}>Terms and Conditions</h2>

        <h3>Refund & Returns Policy</h3>
        <ul>
          <li>No refunds after course enrollment and successful payment.</li>
          <li>Refund is processed only if not allocated to training.</li>
          <li>Review course details before payment.</li>
        </ul>

        <h3>Cancellation Policy</h3>
        <ul>
          <li>Cancellations not allowed after payment.</li>
          <li>Enrollments are final and non-transferable.</li>
        </ul>

        <h3>Terms & Conditions</h3>
        <ul>
          <li>Enrolling means you accept our terms.</li>
          <li>Mode of training: online/offline/WFH/WFO as per choice.</li>
          <li>After payment, all materials and schedules will be shared.</li>
          <li>Communication will be via registered email/phone.</li>
        </ul>

        <h3>Privacy Policy</h3>
        <ul>
          <li>Your data is private and secure.</li>
          <li>Used only for training and job placement.</li>
          <li>No third-party sharing without consent.</li>
        </ul>

        <div style={{ textAlign: "center", marginTop: "20px", fontSize: "12px", color: "red" }}>
          ★ This is a system-generated invoice, signature not required. ★
        </div>
      </div>
    </div>
  );
};

const thStyle = {
  border: "1px solid #ccc",
  padding: "10px",
  textAlign: "center",
  backgroundColor: "#f5f5f5",
};

const tdStyle = {
  border: "1px solid #ccc",
  padding: "10px",
  textAlign: "center",
};

export default Email;
