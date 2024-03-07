import React, { useRef, useState } from "react";
import { useAtom } from "jotai";
import { currentOpenCart, currentPrice, currentRestaurant, currentUser } from "../../App";
import { currentCart } from "../../App";
import { Link } from "react-router-dom";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import logo from "./logo.png";
import carrello from "./carrello.png";

export default function Navbar() {

  const [user, setUser] = useAtom(currentUser);
  const [isCartOpen, setIsCartOpen] = useAtom(currentOpenCart);

  const [cartItems, setCartItems] = useAtom(currentCart);
  const [restaurant, setRestaurant] = useAtom(currentRestaurant);
  const [t, setTotalPrice] = useAtom(currentPrice);

  const handleCartClick = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleNavigation = () => {
    setIsCartOpen(false);
  };

  const removeFromCart = (index) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    setCartItems(updatedCart);
  };


  const updateQuantity = (index, event) => {
    const updatedCart = [...cartItems];
    const newQuantity = parseInt(event.target.value);

    if (newQuantity === 0) {
      const updatedCart = cartItems.filter((item, i) => i !== index);
      setCartItems(updatedCart)
    }
    else {
      const updatedCart = [...cartItems]
      updatedCart[index].quantity = newQuantity;
      setCartItems(updatedCart);
    }
  };

  function totalPrice(cartItems) {
    let tot = 0;
    for (let i = 0; i < cartItems.length; i++)
      tot += cartItems[i].price * cartItems[i].quantity;
    setTotalPrice(tot);
    return tot;
  }

  function totalDelivery(cartItems) {
    if (totalPrice(cartItems) == 0)
      return 0

    return totalPrice(cartItems) + restaurant.deliveryPricePerUnit;
  }

  return (
    <>
      <nav style={{ zIndex: 9999, position: 'sticky', top: 0, backgroundColor: '#071c2c', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 40px' }}> {/* Dimensioni raddoppiate */}
        <div style={{ marginRight: '20px' }}> {/* Spostato il logo più a sinistra */}
          <Link to="/">
            <img src={logo} alt="Logo" style={{ width: '120px', height: 'auto' }} /> {/* Triplicato le dimensioni del logo */}
          </Link>
        </div>
        <div style={{ marginLeft: '10px', marginRight: '10px' }}> {/* Spostato i link più a sinistra */}
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', color: 'white' }}>
              <button onClick={() => setUser(null)} style={{ marginRight: '30px', backgroundColor: 'red', border: 'none', color: 'white', cursor: 'pointer', padding: '5px 20px', fontSize: '16px', fontWeight: 'bold', borderRadius: '20px' }}>
                Logout
              </button>
              <button className="btn" onClick={handleCartClick} >
                <img src={carrello} alt="Logo" style={{ width: '40px', height: '40px', marginLeft: '10px' }} />
              </button>
              {isCartOpen && (
                <div
                  style={{
                    position: "fixed",
                    top: "120px",
                    right: "10px",
                    backgroundColor: "#154360",
                    padding: "40px",
                    width: "400px",
                    height: "auto",
                    border: "1px solid black",
                    borderRadius: "5px",
                    zIndex: 9999,
                  }}
                >
                  {/* Il resto del contenuto del carrello rimane invariato */}
                  <ul style={{ listStyleType: "none", padding: 0 }}>
                    {cartItems && cartItems.map(({ ...item }, index) => (
                      <li key={index} style={{ display: "flex", alignItems: "center", marginBottom: "5px", padding: "10px" }}>
                        <button className="btn" style={{ padding: 0, marginRight: "5px" }} onClick={() => removeFromCart(index)}>
                          <img src="https://static.vecteezy.com/ti/vettori-gratis/p1/6082529-icona-del-cestino-vettoriale.jpg" alt="Remove" style={{ width: '20px', height: '20px' }} />
                        </button>

                        <select
                          value={item.quantity}
                          onChange={(event) => updateQuantity(index, event)}
                          style={{ width: "50px", marginRight: "5px" }}
                        >
                          {[...Array(11).keys()].map((value) => (
                            <option key={value} value={value}>{value === 0 ? "0 (Rimuovi)" : value === 10 ? "10+" : value}</option>
                          ))}
                        </select>
                        <div style={{ flex: 1 }}>{item.name}</div>
                        <p style={{ margin: "0", marginLeft: "10px" }}>{item.price.toFixed(2)}&euro;</p>
                      </li>
                    ))}
                  </ul>

                  <div style={{ marginTop: "10px" }}>
                    <p style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "5px" }}>Totale provissorio: {totalDelivery(cartItems).toFixed(2)}&euro;</p>
                  </div>
                  <Link
                    className="nav-link active btn"
                    aria-current="page"
                    to="/deliverypage"
                    onClick={handleNavigation}
                    style={{
                      position: "absolute",
                      bottom: "10px",
                      right: "10px",
                      backgroundColor: "red", // Colore di sfondo rosso
                      color: "white", // Testo bianco
                      padding: "5px 20px", // Spaziatura interna
                      borderRadius: "5px", // Bordo arrotondato
                      textDecoration: "none", // Rimuove la sottolineatura
                    }}
                  >
                    Buy now
                  </Link>


                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" style={{ color: 'white', textDecoration: 'none', marginRight: '20px', fontWeight: 'bold' }}>Login</Link>
              <Link to="/register" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>Register</Link>
            </>
          )}
        </div>
      </nav>
    </>
  );
}
