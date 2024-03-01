import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAtom } from "jotai";
import { currentUser } from "../../App";
import homeIcon from "./home-icon.png";
import { currentCart } from "../../App";

export default function Navbar() {
  const [user, setUser] = useAtom(currentUser);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useAtom(currentCart);

  const handleCartClick = () => {
    setIsCartOpen(!isCartOpen);
  };

  const removeFromCart = (index) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    setCartItems(updatedCart);
  }; 

  function totalPrice(cartItems) {
    let tot = 0;
    for (let i = 0; i < cartItems.length; i++)
      tot += cartItems[i].price;
    return tot;
  }

  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "orange" }}>
      <div className="container-fluid">
        <div className="d-flex align-items-center">
          <Link className="navbar-brand btn btn-success me-3" to="/">
            <img src={homeIcon} alt="Home" style={{ width: "30px", height: "30px" }} />
          </Link>
          {user ? (
            <>
              <Link className="nav-link active btn btn-warning me-auto" aria-current="page" to="/restaurantlogged">
                RESTAURANT
              </Link>
              <Link className="nav-link active btn btn-warning me-auto" aria-current="page" to="/deliverypage">
                Delivery
              </Link>
            </>
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
            { user ?
              <button className="btn btn-primary" onClick={handleCartClick}>
                Carrello
              </button> : <></>
            }
          </div>
        </div>
      </div>
      {isCartOpen && (
        <div
          style={{
            position: "fixed",
            top: "50px",
            right: "10px", // Mantieni il carrello alla destra dello schermo
            backgroundColor: "#ffffcc", // Cambia lo sfondo del carrello in giallo chiaro
            padding: "10px",
            width: "fit-content", // Imposta la larghezza in base al contenuto
            border: "1px solid orange", // Cambia il colore del bordo in arancione
            borderRadius: "5px", // Aggiungi bordi arrotondati
          }}
        >
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {cartItems && cartItems.map(({...item}, index) => 
              (
                <li key={index} style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
                  <button className="btn btn-danger" style={{ fontSize: "8px", marginRight: "5px" }} onClick={() => removeFromCart(index)}>
                    X
                  </button>
                  <span style={{ fontSize: "12px" }}>{item.name}</span> {/* Riduci la dimensione del testo dei pasti */}
                </li>
              ))}
          </ul>
          <div style={{ textAlign: "right", marginTop: "10px" }}>
            <p style={{ fontSize: "12px", fontWeight: "bold", marginBottom: "5px" }}>TOT: {totalPrice(cartItems)}</p>
          </div>
          <Link className="nav-link active btn btn-warning" aria-current="page" to="/deliverypage">
            BUY
          </Link>
        </div>
      )}
    </nav>
  );
}
