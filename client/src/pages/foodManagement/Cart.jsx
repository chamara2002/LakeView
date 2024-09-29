import React, { useState, useEffect } from "react";
import { useCart } from "./context/CartContext";
import NavBar from "../../components/core/NavBar";
import Footer from "../../components/core/Footer";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS

const Cart = () => {
  const { cart, dispatch } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Notify if the cart is empty when the component mounts
  useEffect(() => {
    if (cart.length === 0) {
      toast.warning("Your cart is empty. Please add items to your cart.");
    }
  }, [cart]); // Runs every time `cart` changes

  const handleRemove = (_id, name) => {
    if (window.confirm(`Are you sure you want to remove "${name}" from the cart?`)) {
      dispatch({ type: "REMOVE_FROM_CART", payload: _id });
      toast.success(`"${name}" has been removed from your cart.`);
    }
  };

  const handleQuantityChange = (_id, quantity) => {
    if (quantity < 1) return; // Prevent setting quantity less than 1
    dispatch({ type: "UPDATE_QUANTITY", payload: { _id, quantity } });
    toast.info(`Quantity updated for item.`);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const filteredCart = cart.filter((item) =>
    item.name.toLowerCase().includes(searchQuery)
  );

  // Calculate total prices
  const totalItemsPrice = cart.reduce(
    (total, item) => total + (item.price || 0) * item.quantity,
    0
  );

  const handlenavigate = () => {
    if (cart.length === 0) {
      toast.warning("Please include items in your cart before proceeding to checkout."); // Show notification if cart is empty
      return; // Prevent navigation
    }
    navigate("/foodPurchase");
    localStorage.setItem("cart", JSON.stringify(cart));
    toast.info(`Navigating to checkout...`);
  };

  return (
    <div style={pageStyle}>
      <NavBar name="foods" />
      <div style={cartStyle}>
        <h2 style={centeredHeadingStyle}>My Cart</h2>
        <input
          type="text"
          placeholder="Search your cart..."
          value={searchQuery}
          onChange={handleSearchChange}
          style={searchInputStyle}
        /><br />
        {filteredCart.length === 0 ? (
          <p style={{ color: "white" }}>Cart is Empty.</p>
        ) : (
          filteredCart.map((item) => (
            <div key={item._id} style={cartItemStyle}>
              <img
                src={item.imageUrl || "default-image-url.jpg"}
                alt={item.name}
                style={cartItemImageStyle}
              />
              <div style={cartItemDetailsStyle}>
                <h3>{item.name}</h3>
                <p>Rs.{(item.price || 0).toFixed(2)}</p>
                <p>Quantity: {item.quantity}</p>
                <p>
                  Total: Rs.{((item.price || 0) * item.quantity).toFixed(2)}
                </p>
                <button
                  onClick={() => handleRemove(item._id, item.name)}
                  style={buttonStyle}
                >
                  Remove
                </button>
                <button
                  onClick={() =>
                    handleQuantityChange(item._id, item.quantity + 1)
                  }
                  style={buttonStyle}
                >
                  +
                </button>
                <button
                  onClick={() =>
                    handleQuantityChange(item._id, item.quantity - 1)
                  }
                  style={buttonStyle}
                >
                  -
                </button>
              </div>
            </div>
          ))
        )}
        <div style={cartTotalStyle}>
          <h3>Total Price: Rs.{totalItemsPrice.toFixed(2)}</h3>
        </div>
        <button onClick={handlenavigate} style={checkoutButtonStyle} disabled={filteredCart.length === 0}>
          Proceed to checkout
        </button>
      </div>
      <Footer />
      <ToastContainer /> {/* Add the ToastContainer to your component */}
    </div>
  );
};

// Inline CSS styles
const pageStyle = {
  backgroundColor: "#161E38",
  padding: "20px",
  minHeight: "100vh",
};

const cartStyle = {
  maxWidth: "1200px",
  margin: "20px auto",
  padding: "20px",
  backgroundColor: "#1D284C",
  borderRadius: "8px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
};

const centeredHeadingStyle = {
  color: "white",
  textAlign: "center",
  margin: "20px 0",
};

const searchInputStyle = {
  padding: "10px",
  marginBottom: "20px",
  borderRadius: "4px",
  border: "1px solid #ccc",
  width: "30%",
  display: "block",
  margin: "0 auto",
};

const cartItemStyle = {
  display: "flex",
  alignItems: "center",
  padding: "15px",
  backgroundColor: "#858DA8",
  borderRadius: "8px",
  marginBottom: "20px",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
};

const cartItemImageStyle = {
  width: "100px",
  height: "100px",
  borderRadius: "8px",
  objectFit: "cover",
  marginRight: "20px",
};

const cartItemDetailsStyle = {
  flex: "1",
};

const cartTotalStyle = {
  textAlign: "right",
  marginTop: "30px",
  color: "white",
};

const checkoutButtonStyle = {
  display: "block",
  width: "20%",
  padding: "15px",
  backgroundColor: "#FFBB00",
  color: "Black",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "16px",
  marginTop: "20px",
  fontWeight: "bold",
  margin: "20px auto",
};

const buttonStyle = {
  padding: "10px 15px",
  backgroundColor: "#FFBB00",
  color: "Black",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  marginRight: "10px",
  fontSize: "14px",
  fontWeight: "bold",
};

buttonStyle[":hover"] = {
  backgroundColor: "#0056b3",
};

checkoutButtonStyle[":hover"] = {
  backgroundColor: "#218838",
};

export default Cart;
