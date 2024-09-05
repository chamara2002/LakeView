import { useState,useEffect } from 'react';
import React from 'react';
import { useCart } from '../../pages/foodManagement/context/CartContext';


const CartSummary = () => {
    const [cart,setCart] =  useState([]);

    useEffect(() => {
        setCart(JSON.parse(localStorage.getItem('cart')));
    }, []);

  if (!cart || cart.length === 0) {
    return <div>No items in the cart</div>;
  }

  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  console.log("Cart State:", cart);

  return (
    <div style={styles.cartSummary}>
      <h2>Cart Summary</h2>
      <ul style={styles.cartList}>
  {cart.map((item) => (
    <li key={item._id} style={styles.cartItem}>
      <span style={styles.cartItemName}>{item.name}</span>
      <span style={styles.cartItemPrice}>Quantity: {item.quantity}</span>
      <span style={styles.cartItemPrice}>Price: Rs. {item.price.toFixed(2)}</span>
      <span style={styles.cartItemTotal}>Total: Rs. {(item.price * item.quantity).toFixed(2)}</span>
    </li>
  ))}
</ul>

      <div style={styles.cartTotal}>
        <h3>Total Price: Rs. {calculateTotalPrice()}</h3>
        {localStorage.setItem('total',calculateTotalPrice())}
      </div>
    </div>
  );
};

const styles = {
  cartSummary: {
    padding: '20px',
    backgroundColor: '#f4f4f4',
    borderRadius: '8px',
    width: '50%',
    margin: '0 auto',
  },
  cartList: {
    listStyleType: 'none',
    padding: '0',
  },
  cartItem: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '20px ',
    borderBottom: '1px solid #ccc',
  },
  cartTotal: {
    paddingTop: '20px',
    fontSize: '20px',
    fontWeight: 'bold',
  },
  cartList: {
    listStyleType: 'none',  // Removes the default bullet points
    padding: 0,             // Removes default padding
    margin: 0,              // Removes default margin
  },
  cartItem: {
    display: 'flex',
    justifyContent: 'space-between',  // Distributes space between the elements evenly
    alignItems: 'center',
    padding: '10px',
    marginBottom: '10px',
    backgroundColor: '#f4f4f4',
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Adds a subtle shadow to each item
    padding: '10px',
  },
  cartItemName: {
    fontWeight: 'bold',
    fontSize: '1.1em',
  },
  cartItemPrice: {
    color: '#333',
  },
  cartItemTotal: {
    color: '#007bff',
    fontWeight: 'bold',
  },
};

export default CartSummary;
