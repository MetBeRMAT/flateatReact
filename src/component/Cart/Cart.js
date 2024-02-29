import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (dish) => {
    setCartItems([...cartItems, dish]);
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
        {cartItems.map((dish, index) => (
          <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
            {dish}
            <button className="btn btn-danger" onClick={() => removeFromCart(index)}>
              <span aria-hidden="true">&times;</span>
            </button>
          </li>
        ))}
      </ul>

      <h2 className="mt-4">Menu Ristorante</h2>
      <button className="btn btn-primary mb-2 mr-2" onClick={() => addToCart('Pasta Carbonara')}>
        Aggiungi Pasta Carbonara
      </button>
      <button className="btn btn-primary mb-2 mr-2" onClick={() => addToCart('Pizza Margherita')}>
        Aggiungi Pizza Margherita
      </button>
      {/* Aggiungi altri piatti con bottoni simili */}
    </div>
  );
};

export default Cart;
