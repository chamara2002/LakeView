import React from "react";
import NavBar from "../../components/core/NavBar";
import Footer from "../../components/core/Footer";
import image from "../../../public/CusSup.jpg";
import { useNavigate } from "react-router-dom";

const CustomerSupport = () => {
  const navigate = useNavigate();
  return (
    <div>
      <NavBar name = "support"/>
      <div style={styles.container}>
        <div style={styles.supportSection}>
          <h2 style={styles.heading}>Customer Support</h2>
          <img
            src={image}
            alt="Customer Support"
            style={styles.image}
          />
        </div>
        <div style={styles.searchSection}>
          <div style={styles.buttonContainer}>
            <button style={styles.button} onClick={()=>navigate('/inquerypage')}>Inquire us</button>
            <button style={styles.button} onClick={()=>navigate('/lostitems')}>Lost Items</button>
            <button style={styles.button} onClick={()=>navigate('/LostItemsForm')}>Report a lost Item</button>
            <button style={styles.button} onClick={()=>navigate('/FoundItemsTable')}>Found Items</button>
            <button style={styles.button} onClick={()=>navigate('/transport')}>Transport</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    backgroundColor: "#161E38",
    color: "#fff",
    height: "100vh",
  },
  supportSection: {
    textAlign: "center",
    padding: "40px",
    alignItems: "center",
  },
  heading: {
    fontSize: "24px",
    marginBottom: "10px",
    padding: "10px",
  },
  image: {
    width: "80%",
    maxWidth: "400px",
    borderRadius: "8px",
  },
  searchSection: {
    marginTop: "20px",
    textAlign: "center",
  },
  searchInput: {
    width: "100%",
    maxWidth: "300px",
    padding: "10px",
    borderRadius: "5px",
    border: "none",
    marginBottom: "15px",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  button: {
    backgroundColor: "#FFD700", // Yellow color
    color: "#000", // Text color black
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  contactInfo: {
    marginTop: "20px",
    textAlign: "center",
    lineHeight: "1.6",
  },
  aboutSection: {
    marginTop: "20px",
    maxWidth: "500px",
    textAlign: "center",
    fontSize: "14px",
  },
};

export default CustomerSupport;
