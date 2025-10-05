import React from "react";

type Instrument = {
  id: number;
  name: string;
  description: string;
};

interface DashboardProps {
  instruments: Instrument[];
  logoPath: string;
}

const Dashboard: React.FC<DashboardProps> = ({ instruments, logoPath }) => {
  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "white",
        height: "100vh",
      }}
    >
      <header
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "20px",
          backgroundColor: "green", // Set header background color to green
          padding: "10px", // Optional: Add padding for better spacing
          color: "white", // Optional: Change text color to white for contrast
        }}
      >
        <h1 style={{ fontSize: "24px", flex: 1 }}>Save on Waste</h1>
        <img
          src={logoPath} // Use the logo path passed as a prop
          alt="Account Logo"
          style={{ width: "50px", height: "50px" }}
        />
      </header>
      <main>
        <h2>Instruments</h2>
        {instruments && instruments.length > 0 ? (
          <ul>
            {instruments.map((instrument) => (
              <li key={instrument.id} style={{ marginBottom: "10px" }}>
                {instrument.name} - {instrument.description}
              </li>
            ))}
          </ul>
        ) : (
          <p>No instruments found.</p>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
