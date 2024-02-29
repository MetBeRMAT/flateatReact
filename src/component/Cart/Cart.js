import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [newItem, setNewItem] = useState('');

  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  const handleChange = (e) => {
    setNewItem(e.target.value);
  };

  const handleAddToCart = () => {
    if (newItem.trim() !== '') {
      addToCart(newItem);
      setNewItem('');
    }
  };

  const removeFromCart = (index) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    setCartItems(updatedCart);
  };

  return (
    <div className="container mt-4">
      <h2>Carrello</h2>
      <ul className="list-group">
        {cartItems.map((item, index) => (
          <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
            {item}
            <button className="btn btn-danger" onClick={() => removeFromCart(index)}>
              Rimuovi
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-4">
        <input type="text" value={newItem} onChange={handleChange} />
        <button className="btn btn-primary ms-2" onClick={handleAddToCart}>
          Aggiungi
        </button>
      </div>
    </div>
  );
};

export default Cart;
