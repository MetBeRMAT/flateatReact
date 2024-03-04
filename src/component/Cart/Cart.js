// Cart.js
import React, { useState } from 'react';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [newItem, setNewItem] = useState('');

  const addToCart = (item) => {
    const newItemWithQuantity = { name: item, quantity: 1 }; // Iniziamo con quantità 1
    setCartItems([...cartItems, newItemWithQuantity]);
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
                <div>
                  {item.name} <span className="badge bg-primary">{item.quantity}</span>
                </div>
                <div>
                  {/* <button className="btn btn-success btn-sm me-1" onClick={() => incrementQuantity(index)}>
                    +
                  </button>
                  <button className="btn btn-warning btn-sm me-1" onClick={() => decrementQuantity(index)}>
                    -
                  </button>
                  
                  <button className="btn btn-danger btn-sm custom-btn me-1" onClick={() => removeFromCart(index)}>
               
                    Rimuovi
                  </button> */}
                </div>
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
