import React, { useState } from "react";
import { useCart } from "./context/CartContext";
import NavBar from "../../components/core/NavBar";
import Footer from "../../components/core/Footer";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, dispatch } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleRemove = (_id) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: _id });
  };

  const handleQuantityChange = (_id, quantity) => {
    if (quantity < 1) return; // Prevent setting quantity less than 1
    dispatch({ type: "UPDATE_QUANTITY", payload: { _id, quantity } });
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
    navigate("/foodPurchase");
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  return (
    <div>
      <NavBar />
      <div style={cartStyle}>
        <h2>Your Cart</h2>
        <input
          type="text"
          placeholder="Search your cart..."
          value={searchQuery}
          onChange={handleSearchChange}
          style={searchInputStyle}
        />
        {filteredCart.length === 0 ? (
          <p>Your cart is empty</p>
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
                  onClick={() => handleRemove(item._id)}
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
        <button onClick={handlenavigate} style={checkoutButtonStyle}>
          Proceed to checkout
        </button>
      </div>
      <Footer />
    </div>
  );
};

// Inline CSS styles
const cartStyle = {
  maxWidth: "1200px",
  margin: "20px auto",
  padding: "20px",
  backgroundColor: "#f9f9f9",
  borderRadius: "8px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
};

const searchInputStyle = {
  padding: "10px",
  marginBottom: "20px",
  borderRadius: "4px",
  border: "1px solid #ccc",
  width: "100%",
};

const cartItemStyle = {
  display: "flex",
  alignItems: "center",
  padding: "15px",
  backgroundColor: "#fff",
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
};

const checkoutButtonStyle = {
  display: "block",
  width: "100%",
  padding: "15px",
  backgroundColor: "#28a745",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "16px",
  marginTop: "20px",
};

const buttonStyle = {
  padding: "10px 15px",
  backgroundColor: "#007bff",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  marginRight: "10px",
  fontSize: "14px",
};

buttonStyle[":hover"] = {
  backgroundColor: "#0056b3",
};

checkoutButtonStyle[":hover"] = {
  backgroundColor: "#218838",
};

export default Cart;
