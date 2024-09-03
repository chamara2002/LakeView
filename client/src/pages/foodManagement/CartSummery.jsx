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
            <span>{item.name}</span>
            <span>Quantity: {item.quantity}</span>
            <span>Price: Rs. {item.price.toFixed(2)}</span>
            <span>Total: Rs. {(item.price * item.quantity).toFixed(2)}</span>
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
    padding: '10px ',
    borderBottom: '1px solid #ccc',
  },
  cartTotal: {
    paddingTop: '20px',
    fontSize: '20px',
    fontWeight: 'bold',
  },
};

export default CartSummary;
