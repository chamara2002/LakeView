import React, { useEffect, useState } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import Footer from "../../components/core/Footer";
import NavBar from "../../components/core/NavBar";
import ReportButton from "../../components/reUseable/ReportButton";
import DropdownNavBar from "../../components/core/DropDownbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FoodOrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [searchIdQuery, setSearchIdQuery] = useState("");
  const [completionStatus, setCompletionStatus] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/order/")
      .then((response) => {
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
        toast.success("Payment confirmed successfully!");
      })
      .catch((error) => {
        console.error("Error completing order:", error);
        toast.error("Failed to confirm payment.");
      });
  };

  const handleDelete = (orderId) => {
    axios
      .delete(`http://localhost:3000/api/order/delete/${orderId}`)
      .then(() => {
        setOrders((prevOrders) =>
          prevOrders.filter((order) => order._id !== orderId)
        );
        toast.success("Order deleted successfully!");
      })
      .catch((error) => {
        console.error("Error deleting order:", error);
        toast.error("Failed to delete order.");
      });
  };

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

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text("Food Orders Report", 14, 20);
    const tableData = filteredOrders.map((order) => [
      formatId(order._id, "OID"),
      formatId(order.userId, "CID"),
      order.meals.map((meal) => `${meal.food?.name || "Unknown"} (${meal.quantity})`).join(", "),
      `Rs.${order.totalPrice.toFixed(2)}`,
      order.isCompleted ? "Paid" : "Not Paid",
    ]);

    doc.autoTable({
      head: [["Order ID", "Customer ID", "Meals", "Total Price", "Status"]],
      body: tableData,
      startY: 30,
      theme: "grid",
      headStyles: { fillColor: [22, 30, 56] },
      styles: { cellPadding: 3, fontSize: 10 },
    });

    // Calculate summary data
    const totalPaid = filteredOrders.filter(order => order.isCompleted).length;
    const totalNotPaid = filteredOrders.filter(order => !order.isCompleted).length;
    const totalRevenue = filteredOrders.reduce((total, order) => total + (order.isCompleted ? order.totalPrice : 0), 0).toFixed(2);

    // Add summary to PDF
    doc.text(`Total Orders: ${filteredOrders.length}`, 14, doc.autoTable.previous.finalY + 10);
    doc.text(`Total Paid: ${totalPaid}`, 14, doc.autoTable.previous.finalY + 20);
    doc.text(`Total Not Paid: ${totalNotPaid}`, 14, doc.autoTable.previous.finalY + 30);
    doc.text(`Total Revenue: Rs.${totalRevenue}`, 14, doc.autoTable.previous.finalY + 40);

    doc.save("food_orders_report.pdf");
  };

  // Utility function to format the ID with a prefix
  const formatId = (id, prefix) => {
    return `${prefix}${id.slice(0, 7)}`; // Return the prefix and first 4 characters of the ID
  };

  return (
    <div>
      <NavBar name="foods" />
      <div style={{ backgroundColor: "#161E38", minHeight: "100vh", padding: "20px" }}>
        <DropdownNavBar />
        <h2 style={{ color: "white", textAlign: "center", fontSize: "30px" }}>Manage Orders </h2>
        <br />
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Search by order ID"
            value={searchIdQuery}
            onChange={(e) => setSearchIdQuery(e.target.value)}
            style={{
              width: "40%",
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              color: "#000",
              fontSize: "16px",
            }}
          />
          <select
            value={completionStatus}
            onChange={(e) => setCompletionStatus(e.target.value)}
            style={{
              width: "30%",
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              color: "#000",
              fontSize: "16px",
            }}
          >
            <option value="">Status of payment</option>
            <option value="completed">Paid</option>
            <option value="not_completed">Not Paid</option>
          </select>
        </div>
        <br />
        <table
          style={{ width: "100%", borderCollapse: "collapse", color: "#fff", border: "1px solid #ddd", borderRadius: "4px" }}
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
                <td colSpan="7" style={tdStyle}>No orders found</td>
              </tr>
            ) : (
              filteredOrders.map((order) => (
                <tr key={order._id}>
                  <td style={tdStyle}>{formatId(order._id, "OID")}</td>
                  <td style={tdStyle}>{formatId(order.userId, "CID")}</td>
                  <td style={tdStyle}>
                    {order.meals.map((meal) => (
                      <div key={meal.food?._id}>
                        {meal.food?.name || "Unknown Food"} ({meal.quantity})
                      </div>
                    ))}
                  </td>
                  <td style={tdStyle}>Rs.{order.totalPrice.toFixed(2)}</td>
                  <td style={tdStyle}>{order.isCompleted ? "Paid" : "Not Paid"}</td>
                  <td style={tdStyle}>
                    <button
                      onClick={() => handleComplete(order._id)}
                      disabled={order.isCompleted}
                      style={{
                        padding: "8px 16px",
                        backgroundColor: order.isCompleted ? "#FFBB00" : "#007bff",
                        color: "#000",
                        border: "none",
                        borderRadius: "4px",
                        cursor: order.isCompleted ? "default" : "pointer",
                      }}
                    >
                      {order.isCompleted ? "Success Payment" : "Confirm Payment"}
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

        <br /><br /><br />
        <button
          style={styles.exportButton}
          onClick={handleExportPDF}
        >
          Export Report as PDF
        </button>
        <br /><br /><br />
      </div>

      <ToastContainer />
      <Footer />
    </div>
  );
};

const thStyle = {
  borderBottom: "2px solid #ddd",
  padding: "18px",
  textAlign: "left",
  color: "#000",
  backgroundColor: "#858DA8",
  fontWeight: "bold",
  fontSize: "18px",
};

const tdStyle = {
  borderBottom: "1px solid #ddd",
  padding: "16px",
};

const styles = {
  exportButton: {
    padding: "10px 20px",
    backgroundColor: "#FFD700",
    color: "#000",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    margin: "20px auto",
    display: "flex",
    fontWeight: "bold",
  },
};

export default FoodOrderManagement;
