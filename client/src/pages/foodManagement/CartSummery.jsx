import React, { useState, useEffect } from 'react';
import { useCart } from '../../pages/foodManagement/context/CartContext';

const CartSummary = () => {
    const [cart, setCart] = useState([]);

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
            <h2 style={styles.header}>Cart Summary</h2>
            <table style={styles.cartTable}>
                <thead>
                    <tr style={styles.tableHeader}>
                        <th>Item</th>
                        <th>Quantity</th>
                        <th>Price (Rs.)</th>
                        <th>Total (Rs.)</th>
                    </tr>
                </thead>
                <tbody>
                    {cart.map((item) => (
                        <tr key={item._id} style={styles.tableRow}>
                            <td>{item.name}</td>
                            <td>{item.quantity}</td>
                            <td>{item.price.toFixed(2)}</td>
                            <td>{(item.price * item.quantity).toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div style={styles.cartTotal}>
                <h3>Total Price: Rs. {calculateTotalPrice()}</h3>
                {localStorage.setItem('total', calculateTotalPrice())}
            </div>
        </div>
    );
};

const styles = {
  cartSummary: {
    padding: '30px',
    backgroundColor: '#161E38',
    borderRadius: '10px',
    width: '60%',
    margin: '20px auto',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease',
  },
  header: {
    textAlign: 'center',
    color: '#ffffff',
    marginBottom: '20px',
    fontSize: '1.2em',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    fontWeight: 'bold',
  },
  cartTable: {
    width: '100%',
    borderCollapse: 'separate',
    borderSpacing: '0 20px', // Adds space between rows for visual separation
  },
  tableHeader: {
    backgroundColor: '#1D284C',
    color: '#fff',
    textAlign: 'center',
    padding: '10px 20px',
    borderRadius: '8px 8px 0 0', // Rounds the top corners of the header
  },
  tableRow: {
    backgroundColor: '#858DA8',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)', // Soft shadow for rows
    transition: 'background-color 0.3s ease', // Smooth hover effect
    color: '#000000',
    fontWeight: 'bold',
  },
  tableCell: {
    padding: '15px 25px', // Adjusts spacing inside each cell (more padding)
    textAlign: 'left',
    minWidth: '150px', // Minimum width for each column to increase spacing
  },
  evenRow: {
    backgroundColor: '#f7f7f7', // Slightly different color for alternating rows
  },
  cartTotal: {
    paddingTop: '20px',
    fontSize: '1.3em',
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000000',
    marginTop: '20px',
    backgroundColor: '#ffffff',
    padding: '15px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
  },
};

export default CartSummary;
