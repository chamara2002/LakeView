import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import Footer from "../../components/core/Footer";
import NavBar from "../../components/core/NavBar";
import ReportButton from "../../components/reUseable/ReportButton";
import DropdownNavBar from "../../components/core/DropDownbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Pie } from "react-chartjs-2"; 
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'; 
import html2canvas from "html2canvas";


ChartJS.register(ArcElement, Tooltip, Legend);

const FoodOrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [searchQuery, handleSearch] = useState("");
  const [searchTermByDate, handleSearchByDate] = useState("");
  const [foodSalesData, setFoodSalesData] = useState({}); 
  const pieChartRef = useRef();

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/order/")
      .then((response) => {
        setOrders(response.data);
        calculateFoodSales(response.data);
      })
      .catch((error) => console.error("Error fetching orders:", error));
  }, []);

  const calculateFoodSales = (orders) => {
    const foodCount = {};

    orders.forEach((order) => {
      order.meals.forEach((meal) => {
        const foodName = meal.food?.name || "Unknown Food";
        const quantity = meal.quantity;

        foodCount[foodName] = (foodCount[foodName] || 0) + quantity;
      });
    });

    const sortedFoods = Object.entries(foodCount)
      .sort((a, b) => b[1] - a[1]) 
      .slice(0, 5); 

    const labels = sortedFoods.map((food) => food[0]);
    const data = sortedFoods.map((food) => food[1]);

    const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

    const handleSearchByDate = (event) => {
      searchTermByDate(event.target.value);
    };

    
    setFoodSalesData({
      labels: labels,
      datasets: [
        {
          label: 'Most Sold Foods',
          data: data,
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0',
            '#9966FF',
          ],
        },
      ],
    });
  };


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
  const matchesId = order._id.toLowerCase().includes(searchQuery.toLowerCase());
  const matchesEmail = order.userEmail.toLowerCase().includes(searchQuery.toLowerCase());
  const matchesStatus = (order.isCompleted ? "paid" : "not paid").toLowerCase().includes(searchQuery.toLowerCase());
  const matchesDate = searchTermByDate
      ? new Date(order.createdAt).toLocaleDateString() === new Date(searchTermByDate).toLocaleDateString()
      : true;

    return (matchesId || matchesEmail || matchesStatus) && matchesDate;
  });

  const handleExportPDF = () => {
    const doc = new jsPDF();
   
    
    const companyName = "LakeView Gaming Zone"; 
    const companyAddress = "Gampaha, Sri Lanka"; 
    const companyPhone = "+9433-7628316"; 
    const companyEmail = "lakeviewgaming01@gmail.com";
  
    
    const logo = "/reportLogo.png"; 
  
    
    try {
      doc.addImage(logo, "PNG", 150, 10, 40, 35); 
    } catch (error) {
      console.error("Error adding logo:", error);
    }
  
    
    doc.setFontSize(14);
    doc.setTextColor(30, 39, 73);
    doc.setFont("Helvetica", "bold");
    doc.text(companyName, 20, 20);
    
    doc.setTextColor(0, 0, 0);
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(10);
    doc.text(companyAddress, 20, 30);
    doc.text(companyPhone, 20, 35);
    doc.text(companyEmail, 20, 40);
    
    
    doc.line(20, 45, 190, 45); 

    
    doc.setFontSize(16);
    doc.setFont("Helvetica", "bold");
    doc.text("Food Orders Report", 65, 60);
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(12); 
    
    
    if (!filteredOrders || filteredOrders.length === 0) {
      console.warn("No orders to display.");
      doc.text("No orders available for this report.", 14, 60);
      doc.save("food_orders_report.pdf");
      return;
    }
    
    const tableData = filteredOrders.map((order) => [
      formatId(order._id, "OID"),
      order.userEmail,
      order.meals.map((meal) => `${meal.food?.name || "Unknown"} (${meal.quantity})`).join(", "),
      `Rs.${order.totalPrice.toFixed(2)}`,
      order.isCompleted ? "Paid" : "Not Paid",
    ]);
  
    doc.autoTable({
      head: [["Order ID", "Customer Email", "Meals", "Total Price", "Status"]],
      body: tableData,
      startY: 70, 
      theme: "grid",
      headStyles: { fillColor: [22, 30, 56] },
      styles: { cellPadding: 3, fontSize: 10 },
    });
  
    
    const totalPaid = filteredOrders.filter(order => order.isCompleted).length;
    const totalNotPaid = filteredOrders.filter(order => !order.isCompleted).length;
    const totalRevenue = filteredOrders.reduce((total, order) => total + (order.isCompleted ? order.totalPrice : 0), 0).toFixed(2);
  
    
    doc.text(`Total Orders: ${filteredOrders.length}`, 14, doc.autoTable.previous.finalY + 10);
    doc.text(`Total Paid: ${totalPaid}`, 14, doc.autoTable.previous.finalY + 20);
    doc.text(`Total Not Paid: ${totalNotPaid}`, 14, doc.autoTable.previous.finalY + 30);
    doc.text(`Total Revenue: Rs.${totalRevenue}`, 14, doc.autoTable.previous.finalY + 40);
    doc.save("food_orders_report.pdf");
  };
  
  
  const handleGenerateChartReport = async () => { 
    const doc = new jsPDF();
    const companyName = "LakeView Gaming Zone";
    const companyAddress = "Gampaha, Sri Lanka";
    const companyPhone = "+9433-7628316";
    const companyEmail = "lakeviewgaming01@gmail.com";
    const logo = "/reportLogo.png"; 

    
    try {
        await doc.addImage(logo, "PNG", 150, 10, 40, 35);
    } catch (error) {
        console.error("Error adding logo:", error);
    }

   
    doc.setFontSize(14);
    doc.setTextColor(30, 39, 73);
    doc.setFont("Helvetica", "bold");
    doc.text(companyName, 20, 20);
    doc.setFontSize(10);
    doc.setFont("Helvetica", "normal");
    doc.setTextColor(0, 0, 0);
    doc.text(companyAddress, 20, 30);
    doc.text(companyPhone, 20, 35);
    doc.text(companyEmail, 20, 40);
    doc.line(20, 45, 190, 45);

    
    doc.setFontSize(16);
    doc.text("Top 5 Most Sold Food Items", 65, 60);

    
    if (pieChartRef.current) {
        try {
            const pieChartCanvas = await html2canvas(pieChartRef.current, {
                scale: 2,
            });
            const imgData = pieChartCanvas.toDataURL("image/png");
            
        const size = 280; 
        
       
        const x = (doc.internal.pageSize.getWidth() - size) / 2; 
        const y = 80; 

        doc.addImage(imgData, "PNG", x, y, size, 80); 
        } catch (error) {
            console.error("Error capturing pie chart:", error);
        }
    } else {
        console.error("Pie chart reference is not valid.");
    }

   
   const mostSoldFoods = foodSalesData.labels.map((label, index) => ({
    name: label,
    quantity: foodSalesData.datasets[0].data[index],
    color: foodSalesData.datasets[0].backgroundColor[index],
}));

     
     doc.setFontSize(14);
     doc.text("Most Sold Food Items:", 20, 190);
     doc.setFontSize(12);
 
     
     mostSoldFoods.forEach((food, index) => {
         const x = 20; 
         const y = 210 + index * 14; 
 
         
         doc.setFillColor(food.color);
         doc.rect(x, y - 5, 10, 10, 'F');
 
         
         doc.setTextColor(0, 0, 0);
         doc.text(food.name, x + 15, y);
         doc.text(`: ${food.quantity}`, x + 15 + doc.getTextWidth(food.name) + 5, y);
     });
 
     
     doc.setTextColor(0, 0, 0);
 
     
     doc.save("food_sales_report.pdf");
};


  
  const formatId = (id, prefix) => {
    return `${prefix}${id.slice(0, 7)}`; 
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
        placeholder="Search by Order ID, Customer Email, or Status"
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
        style={{
          width: "30%",
          padding: "10px",
          borderRadius: "4px",
          border: "1px solid #ccc",
          color: "#000",
          fontSize: "16px",
        }}    
        />
          <input
          type="date" 
          placeholder="Search by Date (YYYY-MM-DD)"
          value={searchTermByDate}
          onChange={(e) => handleSearchByDate(e.target.value)}
          style={{
            width: "30%",
            padding: "10px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            color: "#000",
            fontSize: "16px",
          }}
        />
        </div>
        <br />
        <table
          style={{ width: "100%", borderCollapse: "collapse", color: "#fff", border: "1px solid #ddd", borderRadius: "4px" }}
        >
          <thead>
            <tr>
              <th style={thStyle}>Order ID</th>
              <th style={thStyle}>Customer Email</th>
              <th style={thStyle}>Meals</th>
              <th style={thStyle}>Total Price</th>
              <th style={thStyle}>Date</th>
              <th style={thStyle}>Time</th>
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
                  <td style={tdStyle}>{order.userEmail}</td>
                  <td style={tdStyle}>
                    {order.meals.map((meal) => (
                      <div key={meal.food?._id}>
                        {meal.food?.name || "Unknown Food"} ({meal.quantity})
                      </div>
                    ))}
                  </td>
                  <td style={tdStyle}>Rs.{order.totalPrice.toFixed(2)}</td>
                  <td style={tdStyle}>{new Date(order.createdAt).toLocaleDateString('en-CA')}</td>
                  <td style={tdStyle}>{new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
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
      <div style={{ backgroundColor: "#161E38", padding: "20px", borderRadius: "5px" }}>
  <h3 style={{ color: "white", textAlign: "center", fontSize: "24px" }}>Most Sold Foods</h3>
  {foodSalesData.labels && foodSalesData.labels.length > 0 ? (
    <div ref={pieChartRef}>
    <Pie  
      data={foodSalesData} 
      options={{ 
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              color: 'white', 
            }
          },
          tooltip: {
            backgroundColor: '#161E38', 
          }
        }
      }} 
      style={{ maxHeight: "400px", width: "100%" }} 
    /></div>
  ) : (
    <p style={{ color: "white", textAlign: "center" }}>No sales data available</p>
  )}
  
<button style={styles.exportButton} onClick={handleGenerateChartReport} label="Generate Chart Report">
          Download Chart as PDF
        </button>
</div>

      <ToastContainer />
      <Footer />
    </div>
  );
};

const thStyle = {
  border: "1px solid #ddd",
  borderBottom: "2px solid #ddd",
  padding: "17px",
  textAlign: "left",
  color: "#000",
  backgroundColor: "#858DA8",
  fontWeight: "bold",
  fontSize: "18px",
};

const tdStyle = {
  border: "1px solid #ddd",
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
