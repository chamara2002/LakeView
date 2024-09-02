import React from "react";
import NavFunction from "../functions/navFunction";
import Footer from "../components/core/Footer";
import { Link } from "react-router-dom";

const CommonLoginPage = () => {
  return (
    <div style={{ backgroundColor: "#161E38", minHeight: "100vh" }}>
      <NavFunction name={"home"} />
      <div style={{ backgroundColor: "#161E38", height: 600, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center",flexWrap: "wrap"	 }}>
        <Link to="/login" style={{ textDecoration: "none", backgroundColor: '#C29C31', borderRadius: "5px", padding: "90px", color: "black", marginRight: 10 }}>
          <div className="admin">User Login</div>
        </Link>
        <Link to="/admin" style={{ textDecoration: "none", backgroundColor: '#8997C6', borderRadius: "5px", padding: "90px", color: "black", marginRight: 10 }}>
          <div className="admin">Admin Login</div>
        </Link>
        <Link to="/staff" style={{ textDecoration: "none", backgroundColor: '#94D3D4', borderRadius: "5px", padding: "90px", color: "black", marginRight: 10 }}>
          <div className="admin">Staff Login</div>
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default CommonLoginPage;
