import React, { useState } from "react";
import axios from "axios";
import NavBar from "../../components/core/NavBar";
import Footer from "../../components/core/Footer";
import { useNavigate } from "react-router-dom";

const AddResourceForm = () => {
  const [resource, setResource] = useState({
    resourceId: "",
    resourceName: "",
    resourceType: "indoor",
    availableQuantity: 0,
    location: "",
    repairStatus: false,
    maintainanceStatus: false,
    price: 0,
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { id, value } = e.target;

    // Validation logic
    if (id === "resourceName") {
      const noSymbols = value.replace(/[^a-zA-Z0-9 ]/g, "");
      setResource({ ...resource, [id]: noSymbols });
    } else if (id === "availableQuantity") {
      const nonNegative = Math.max(0, parseInt(value) || 0);
      setResource({ ...resource, [id]: nonNegative });
    } else if (id === "price") {
      const nonNegative = Math.max(0, parseFloat(value) || 0);
      setResource({ ...resource, [id]: nonNegative.toString().replace(/[^\d.]/g, "") });
    } else {
      setResource({ ...resource, [id]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    axios
      .post("http://localhost:3000/api/resource/resources", resource)
      .then((response) => {
        alert("Resource added successfully!");
        setResource({
          resourceId: "",
          resourceName: "",
          resourceType: "indoor",
          availableQuantity: 0,
          location: "",
          repairStatus: false,
          maintainanceStatus: false,
          price: 0,
        });

        navigate("/ResourcesTable");
      })
      .catch((error) => {
        console.error("There was an error adding the resource!", error);
        alert("Error adding resource. Please check the console for more details.");
      });
  };

  return (
    <div>
      <NavBar />
      <div style={{ backgroundColor: "#1b1f38", padding: "20px", minHeight: "100vh" }}>
        <div style={{ display: "flex", justifyContent: "center", marginTop: "40px" }}>
          <div
            style={{
              backgroundColor: "#f0f0f5",
              padding: "40px",
              borderRadius: "15px",
              width: "40%",
              boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h2 style={{ textAlign: "center", color: "#000" }}>ADD NEW RESOURCE</h2>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: "20px" }}>
                <label style={labelStyle} htmlFor="resourceId">
                  Resource ID
                </label>
                <input
                  type="text"
                  id="resourceId"
                  value={resource.resourceId}
                  onChange={handleInputChange}
                  style={inputStyle}
                  required
                />
              </div>
              <div style={{ marginBottom: "20px" }}>
                <label style={labelStyle} htmlFor="resourceName">
                  Resource Name
                </label>
                <input
                  type="text"
                  id="resourceName"
                  value={resource.resourceName}
                  onChange={handleInputChange}
                  style={inputStyle}
                  required
                />
              </div>
              <div style={{ marginBottom: "20px" }}>
                <label style={labelStyle} htmlFor="resourceType">
                  Resource Type
                </label>
                <select
                  id="resourceType"
                  value={resource.resourceType}
                  onChange={handleInputChange}
                  style={inputStyle}
                  required
                >
                  <option value="indoor">Indoor</option>
                  <option value="outdoor">Outdoor</option>
                </select>
              </div>
              <div style={{ marginBottom: "20px" }}>
                <label style={labelStyle} htmlFor="availableQuantity">
                  Quantity Available
                </label>
                <input
                  type="number"
                  id="availableQuantity"
                  value={resource.availableQuantity}
                  onChange={handleInputChange}
                  style={inputStyle}
                  required
                />
              </div>
              <div style={{ marginBottom: "20px" }}>
                <label style={labelStyle} htmlFor="location">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  value={resource.location}
                  onChange={handleInputChange}
                  style={inputStyle}
                  required
                />
              </div>
              <div style={{ marginBottom: "20px" }}>
                <label style={labelStyle} htmlFor="price">
                  Price
                </label>
                <input
                  type="number"
                  id="price"
                  value={resource.price}
                  onChange={handleInputChange}
                  style={inputStyle}
                  required
                />
              </div>
              <div style={{ marginBottom: "20px" }}>
                <label style={labelStyle} htmlFor="maintainanceStatus">
                  Maintenance Status
                </label>
                <select
                  id="maintainanceStatus"
                  value={resource.maintainanceStatus}
                  onChange={handleInputChange}
                  style={inputStyle}
                  required
                >
                  <option value={false}>Up-to-date</option>
                  <option value={true}>Requires Maintenance</option>
                </select>
              </div>
              <div style={{ marginBottom: "20px" }}>
                <label style={labelStyle} htmlFor="repairStatus">
                  Repair Status
                </label>
                <select
                  id="repairStatus"
                  value={resource.repairStatus}
                  onChange={handleInputChange}
                  style={inputStyle}
                  required
                >
                  <option value={false}>No Repair Needed</option>
                  <option value={true}>Repair Required</option>
                </select>
              </div>
              <div style={{ textAlign: "center" }}>
                <button type="submit" style={buttonStyle}>
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const labelStyle = {
  display: "block",
  marginBottom: "8px",
  color: "#000",
  fontSize: "16px",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  borderRadius: "5px",
  border: "1px solid #ccc",
  fontSize: "14px",
};

const buttonStyle = {
  backgroundColor: "#ffcc00",
  color: "#000",
  padding: "10px 20px",
  border: "none",
  borderRadius: "5px",
  fontSize: "16px",
  cursor: "pointer",
};

export default AddResourceForm;
