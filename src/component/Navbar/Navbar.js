import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAtom } from "jotai";
import { currentUser } from "../../App";
import homeIcon from "./home-icon.png";

export default function Navbar() {
  const [user, setUser] = useAtom(currentUser);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [cartItems, setCartItems] = useState([]);

  const handleCartClick = () => {
    setIsCartOpen(!isCartOpen);
  };

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  const removeFromCart = (index) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    setCartItems(updatedCart);
  };       

  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "orange" }}>
      <div className="container-fluid">
        <div className="d-flex align-items-center">


            {/* btn-success cambia colore */}

            
          <Link className="navbar-brand btn btn-succes me-3" to="/">
            <img src={homeIcon} alt="Home" style={{ width: "30px", height: "30px" }} />
          </Link>
          {user ? (
            <><Link
              className="nav-link active btn btn-warning me-auto"
              aria-current="page"
              to="/restaurantlogged"
            >
              RESTAURANT
            </Link>
            <Link
              className="nav-link active btn btn-warning me-auto"
              aria-current="page"
              to="/deliverypage"
            >
              Delivery
            </Link></>
            
          ) : (
            <Link className="nav-link active btn btn-warning me-auto" aria-current="page" to="/restaurant">
              RESTAURANT
            </Link>
          )}
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav ms-auto">
            {user ? (
              <button className="btn btn-warning me-2" onClick={() => setUser(null)}>
                LOG OUT
              </button>
            ) : (
              <>
                <Link className="nav-link active btn btn-warning me-2" aria-current="page" to="/login">
                  LOGIN
                </Link>
                <Link className="nav-link active btn btn-warning" aria-current="page" to="/register">
                  REGISTER
                </Link>
              </>
            )}
            <button className="btn btn-primary" onClick={handleCartClick}>
              Carrello
            </button>
          </div>
        </div>
      </div>
      {isCartOpen && (
        <div
          style={{
            position: "fixed",
            top: "50px",
            right: "10px",
            backgroundColor: "white",
            padding: "10px",
            border: "1px solid black",
          }}
        >
          <h3>Carrello</h3>
          <ul>
            {cartItems.map((item, index) => (
              <li key={index}>
                {item}
                <button className="btn btn-danger" onClick={() => removeFromCart(index)}>
                  Rimuovi
                </button>
              </li>
            ))}
          </ul>
          <h4>Aggiungi al carrello:</h4>
          <button className="btn btn-primary" onClick={() => addToCart("Pasta Carbonara")}>
            Aggiungi Pasta Carbonara
          </button>
          <button className="btn btn-primary" onClick={() => addToCart("Pizza Margherita")}>
            Aggiungi Pizza Margherita
          </button>
        </div>
      )}
    </nav>
  );
}
