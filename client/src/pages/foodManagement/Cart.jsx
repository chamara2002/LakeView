import React, { useState } from 'react';
import { useCart } from '../foodManagement/context/CartContext';
import styles from '../../pages/foodManagement/styles/cart.module.css';
import NavBar from '../../components/core/NavBar';
import Footer from '../../components/core/Footer';

const Cart = () => {
  const { cart, dispatch } = useCart();
  const [searchQuery, setSearchQuery] = useState(''); // State for search query

  const removeFromCart = (id) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const filteredCart = cart.filter((item) =>
    item.name.toLowerCase().includes(searchQuery)
  );

  return (
    <div>
      <NavBar name="foods" />
      <div className={styles.cart}>
        <h2>Your Cart</h2>
        <input
          type="text"
          placeholder="Search your cart..."
          value={searchQuery}
          onChange={handleSearchChange}
          className={styles.searchInput} // Assuming you want to style the search input
        />
        {filteredCart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          filteredCart.map((item) => (
            <div key={item.id} className={styles.cartItem}>
              <img src={item.imageUrl} alt={item.name} className={styles.cartItemImage} />
              <div className={styles.cartItemDetails}>
                <h3>{item.name}</h3>
                <p>Rs.{item.price.toFixed(2)}</p>
              </div>
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          ))
        )}
      </div>
      <Footer></Footer>
    </div>
  );
}

export default Cart;
