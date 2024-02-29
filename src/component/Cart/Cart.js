// Cart.js
import React, { useState } from 'react';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [newItem, setNewItem] = useState('');

  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  const removeFromCart = (index) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    setCartItems(updatedCart);
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Carrello</h2>
        </div>
        <div className="card-body">
          <ul className="list-group">
            {cartItems.map((item, index) => (
              <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                {item}
                <button className="btn btn-danger btn-sm" onClick={() => removeFromCart(index)}>
                  Rimuovi
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="card-footer">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Aggiungi articolo"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
            />
            <button className="btn btn-primary" onClick={() => addToCart(newItem)}>
              Aggiungi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
