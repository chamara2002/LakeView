import React, { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import axios from "axios";
import NavBar from "../../components/core/NavBar";
import Footer from "../../components/core/Footer";

const ResourceReport = () => {
  const { id } = useParams();
  const [resource, setResource] = useState({
    resourceId: "",
    resourceName: "",
    price: "",
    availableQuantity: "",
    maintainanceStatus: "false", // Default value
    location: "",
    repairStatus: "false", // Default value
  });

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/resource/resources/${id}`)
      .then((response) => {
        const data = response.data;

        setResource({
          resourceId: data.resourceId || "",
          resourceName: data.resourceName || "",
          price: data.price || "",
          availableQuantity: data.availableQuantity || "",
          maintainanceStatus: data.maintainanceStatus !== undefined ? data.maintainanceStatus : "false", 
          location: data.location || "",
          repairStatus: data.repairStatus !== undefined ? data.repairStatus : "false",
        });
      })
      .catch((error) => {
        console.error("There was an error fetching the resource!", error);
      });
  }, [id]);

  useEffect(() => {
    document.body.style.backgroundColor = "#0c1821"; // Dark blue background
    return () => {
      document.body.style.backgroundColor = ""; // Reset when component unmounts
    };
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setResource({ ...resource, [id]: value });
  };

  const handleSave = () => {
    const updatedResource = {
      ...resource,
      maintainanceStatus: resource.maintainanceStatus === "true" ? true : false,
      repairStatus: resource.repairStatus === "true" ? true : false,
    };

    axios
      .put(`http://localhost:3000/api/resource/resources/${id}`, updatedResource)
      .then(() => {
        alert("Resource updated successfully!");
        navigate('/ResourcesTable');
        console.log("Resource updated successfully!", updatedResource);
      })
      .catch((error) => {
        console.error("There was an error updating the resource!", error);
      });
  };

  return (
    <div>
      <NavBar />
      <div style={containerStyle}>
        <div style={headerStyle}>REPORT ON RESOURCE {resource.resourceId}</div>
        <div style={bodyStyle}>
          <div style={formGroupStyle}>
            <label style={labelStyle} htmlFor="resourceName">
              Name
            </label>
            <input
              type="text"
              id="resourceName"
              value={resource.resourceName}
              onChange={handleInputChange}
              style={inputStyle}
              placeholder="Resource Name"
            />
          </div>
          <div style={formGroupStyle}>
            <label style={labelStyle} htmlFor="price">
              Price of an each
            </label>
            <input
              type="number"
              id="price"
              value={resource.price}
              onChange={handleInputChange}
              style={inputStyle}
              placeholder="Price"
            />
          </div>
          <div style={formGroupStyle}>
            <label style={labelStyle} htmlFor="availableQuantity">
              Quantity Available
            </label>
            <input
              type="number"
              id="availableQuantity"
              value={resource.availableQuantity}
              onChange={handleInputChange}
              style={inputStyle}
              placeholder="Quantity"
            />
          </div>
          <div style={formGroupStyle}>
            <label style={labelStyle} htmlFor="maintainanceStatus">
              Maintenance
            </label>
            <select
              id="maintainanceStatus"
              value={resource.maintainanceStatus}
              onChange={handleInputChange}
              style={inputStyle}
            >
              <option value="false">Up-to-date</option>
              <option value="true">Requires Maintenance</option>
            </select>
          </div>
          <div style={formGroupStyle}>
            <label style={labelStyle} htmlFor="location">
              Location
            </label>
            <input
              type="text"
              id="location"
              value={resource.location}
              onChange={handleInputChange}
              style={inputStyle}
              placeholder="Location"
            />
          </div>
          <div style={formGroupStyle}>
            <label style={labelStyle} htmlFor="repairStatus">
              Need Repair
            </label>
            <select
              id="repairStatus"
              value={resource.repairStatus}
              onChange={handleInputChange}
              style={inputStyle}
            >
              <option value="false">No Repair Needed</option>
              <option value="true">Repair Required</option>
            </select>
          </div>
          <div style={buttonContainerStyle}>
            <button style={buttonStyle}>Print Report</button>
            <button style={buttonStyle} onClick={handleSave}>
              Save
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const containerStyle = {
  backgroundColor: "#e0e0e0",
  padding: "50px",
  borderRadius: "10px",
  width: "60%",
  margin: "0 auto",
  marginTop: "50px",
};

const headerStyle = {
  backgroundColor: "#2c303a",
  color: "white",
  textAlign: "center",
  padding: "15px",
  borderRadius: "10px 10px 0 0",
  fontSize: "20px",
};

const bodyStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "10px",
  padding: "20px",
  backgroundColor: "#f2f2f2",
  borderRadius: "0 0 10px 10px",
};

const formGroupStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px",
  backgroundColor: "#dcdcdc",
  borderRadius: "5px",
};

const labelStyle = {
  fontWeight: "bold",
  marginRight: "10px",
};

const inputStyle = {
  width: "60%",
  padding: "8px",
  border: "1px solid #ccc",
  borderRadius: "5px",
  backgroundColor: "#e0e0e0",
};

const buttonContainerStyle = {
  gridColumn: "span 2",
  display: "flex",
  justifyContent: "space-between",
};

const buttonStyle = {
  backgroundColor: "#ffaa00",
  border: "none",
  color: "white",
  padding: "10px 20px",
  textAlign: "center",
  textDecoration: "none",
  fontSize: "14px",
  borderRadius: "5px",
  cursor: "pointer",
};

export default ResourceReport;
