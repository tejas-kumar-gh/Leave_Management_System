import React from "react";

function Dashboard({ role = "Employee" }) {
  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <h2 style={styles.logo}>ELMS</h2>
        <ul style={styles.menu}>
          <li>Dashboard</li>
          <li>Apply Leave</li>
          <li>My Leaves</li>
          {role === "Admin" && <li>Manage Requests</li>}
          <li>Profile</li>
        </ul>
      </div>

      {/* Main Content */}
      <div style={styles.main}>
        <h1>Welcome {role}</h1>

        <div style={styles.cardsContainer}>
          <div style={styles.card}>
            <h3>Total Leaves</h3>
            <p>12</p>
          </div>

          <div style={styles.card}>
            <h3>Approved</h3>
            <p>8</p>
          </div>

          <div style={styles.card}>
            <h3>Pending</h3>
            <p>3</p>
          </div>

          <div style={styles.card}>
            <h3>Rejected</h3>
            <p>1</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    fontFamily: "Arial",
  },
  sidebar: {
    width: "220px",
    backgroundColor: "#1e293b",
    color: "white",
    padding: "20px",
  },
  logo: {
    marginBottom: "30px",
  },
  menu: {
    listStyle: "none",
    padding: 0,
    lineHeight: "2.5",
    cursor: "pointer",
  },
  main: {
    flex: 1,
    padding: "30px",
    backgroundColor: "#f1f5f9",
  },
  cardsContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
    marginTop: "20px",
  },
  card: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
};

export default Dashboard;
