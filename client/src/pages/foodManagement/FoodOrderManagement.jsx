import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../../components/core/Footer";
import NavBar from "../../components/core/NavBar";
import ReportButton from "../../components/reUseable/ReportButton";
import DropdownNavBar from "../../components/core/DropDownbar";

const FoodOrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [searchIdQuery, setSearchIdQuery] = useState(""); // Search by order ID
  const [completionStatus, setCompletionStatus] = useState(""); // New state for searching by completion status

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/order/") // Adjust endpoint as needed
      .then((response) => {
        console.log("Fetched Orders:", response.data); // Log API response
        setOrders(response.data);
      })
      .catch((error) => console.error("Error fetching orders:", error));
  }, []);

  const handleComplete = (orderId) => {
    axios
      .put(`http://localhost:3000/api/order/update/${orderId}`, { isCompleted: true })
      .then(() => {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, isCompleted: true } : order
          )
        );
      })
      .catch((error) => console.error("Error completing order:", error));
  };

  const handleDelete = (orderId) => {
    axios
      .delete(`http://localhost:3000/api/order/delete/${orderId}`)
      .then(() => {
        setOrders((prevOrders) =>
          prevOrders.filter((order) => order._id !== orderId)
        );
      })
      .catch((error) => console.error("Error deleting order:", error));
  };

  console.log("Orders State:", orders); // Log orders state

  const filteredOrders = orders.filter((order) => {
    const matchesId = order._id.toLowerCase().includes(searchIdQuery.toLowerCase());
    const matchesCompletion =
      completionStatus === ""
        ? true
        : completionStatus === "completed"
        ? order.isCompleted
        : !order.isCompleted;
    return matchesId && matchesCompletion;
  });

  console.log("Filtered Orders:", filteredOrders); // Log filtered orders

  return (
    <div>
      <NavBar />
      <div
        style={{
          backgroundColor: "#161E38",
          minHeight: "100vh",
          padding: "20px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Search by order ID"
            value={searchIdQuery}
            onChange={(e) => setSearchIdQuery(e.target.value)}
            style={{
              width: "45%",
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              color: "#000",
            }}
          />
          <select
            value={completionStatus}
            onChange={(e) => setCompletionStatus(e.target.value)}
            style={{
              width: "45%",
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              color: "#000",
            }}
          >
            <option value="">Status of payment</option>
            <option value="completed">paied</option>
            <option value="not_completed">Not paied</option>
          </select>
        </div>
        <DropdownNavBar></DropdownNavBar>
        <table
          style={{ width: "100%", borderCollapse: "collapse", color: "#fff", marginTop: "80px" }}
        >
          
          <thead>
            <tr>
              <th style={thStyle}>Order ID</th>
              <th style={thStyle}>Customer ID</th>
              <th style={thStyle}>Meals</th>
              <th style={thStyle}>Total Price</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Complete</th>
              <th style={thStyle}>Delete</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan="7" style={tdStyle}>
                  No orders found
                </td>
              </tr>
            ) : (
              filteredOrders.map((order) => (
                <tr key={order._id}>
                  <td style={tdStyle}>{order._id}</td>
                  <td style={tdStyle}>{order.userId}</td>
                  <td style={tdStyle}>
                    {order.meals.map((meal) => (
                      <div key={meal.food?._id}>
                        {meal.food?.name || "Unknown Food"} ({meal.quantity})
                      </div>
                    ))}
                  </td>
                  <td style={tdStyle}>${order.totalPrice.toFixed(2)}</td>
                  <td style={tdStyle}>
                    {order.isCompleted ? "Paied" : "Not paied"}
                  </td>
                  <td style={tdStyle}>
                    <button
                      onClick={() => handleComplete(order._id)}
                      disabled={order.isCompleted}
                      style={{
                        padding: "8px 16px",
                        backgroundColor: order.isCompleted
                          ? "#28a745"
                          : "#007bff",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        cursor: order.isCompleted ? "default" : "pointer",
                      }}
                    >
                      {order.isCompleted ? "paied" : "Not Paied"}
                    </button>
                  </td>
                  <td style={tdStyle}>
                    <button
                      onClick={() => handleDelete(order._id)}
                      style={{
                        padding: "8px 16px",
                        backgroundColor: "#dc3545",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <br></br>
        <center><ReportButton /></center>
      </div>
      <Footer />
    </div>
  );
};

const thStyle = {
  borderBottom: "2px solid #ddd",
  padding: "12px",
  textAlign: "left",
  color: "#ddd",
};

const tdStyle = {
  borderBottom: "1px solid #ddd",
  padding: "12px",
};

export default FoodOrderManagement;
