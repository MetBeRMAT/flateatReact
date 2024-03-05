import React, { useState } from "react";
import { useAtom } from "jotai";
import { currentPrice, currentRestaurant, currentUser } from "../../App";
import homeIcon from "./home-icon.png";
import { currentCart } from "../../App";
import { Link } from "react-router-dom";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import loginIcon from "./login-icon.png";
import logoutIcon from "./logout-icon.jpg";
import carrelloIcon from "./carrello-icon.png";
import logo from "./logo.png";

export default function Navbar() 
{
  
  const [user, setUser] = useAtom(currentUser);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [cartItems, setCartItems] = useAtom(currentCart);
  const [restaurant,setRestaurant] = useAtom(currentRestaurant);
  const [t, setTotalPrice] = useAtom(currentPrice);
  
  const handleCartClick = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleNavigation = () => 
  {
    setIsCartOpen(false);
  };

  const removeFromCart = (index) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    setCartItems(updatedCart);
  }; 

  const incrementQuantity = (index) => {
    const updatedCart = [...cartItems];
    updatedCart[index].quantity += 1;
    setCartItems(updatedCart);
    console.log(updatedCart.quantity)
  };

  const decrementQuantity = (index) => {
    const updatedCart = [...cartItems];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
      setCartItems(updatedCart);
    }
  };

  function totalPrice(cartItems) {
    let tot = 0;
    for (let i = 0; i < cartItems.length; i++)
      tot += cartItems[i].price;
    setTotalPrice(tot);
    return tot;
  }

  function totalDelivery(cartItems)
  {
    if(totalPrice(cartItems)==0)
      return 0

    return totalPrice(cartItems)+restaurant.deliveryPricePerUnit;
  }

  return (
    <nav >
      {/* <div className="container-fluid">
        <div className="d-flex align-items-center"> */}
          {/* <Link className="navbar-brand me-3 " to="/">
            <img src={logo} alt="Home" style={{ width: "250px", height: "70px" }} />
          </Link> */}
          {/* {user ? (
            <>
              <Link  className="nav-link active btn me-2 px-3" aria-current="page" to="/restaurantlogged" onClick={handleNavigation}>
                <button type="button" class="btn btn-outline-dark">Restaurant</button>
              </Link>
              <Link className="nav-link active btn me-2 px-3" aria-current="page" to="/deliverypage">
                <button type="button" class="btn btn-outline-dark">Delivery</button> 
              </Link>
            </>
          ) : (
            <Link className="nav-link active btn me-2 px-3" aria-current="page" to="/restaurant">
              <button type="button" class="btn btn-outline-dark">Restaurant</button>
            </Link>
          )}
        </div> */}
          <div>
      {/* Prima navbar */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', borderBottom: '1px solid gray', height: '150px' }}>
        {/* Contenuto della prima navbar */}
        <div style={{ marginLeft: '150px', display: 'flex', alignItems: 'center' }}>
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={loginIcon} style={{ width: '40px', height: '40px', marginRight: '5px' }}></img>
            <span style={{ fontWeight: 'bold' }}>Benvenuto</span><span style={{ marginLeft: '5px' }}>{user.mail}</span>
          </div>
          ) : (
            <>
              <Link to="/login" style={{ textDecoration: 'none', color: 'black', fontWeight: 'bold', marginRight: '10px' }}>LOGIN</Link>
              <span style={{ marginRight: '10px' }}>or</span>
              <Link to="/register" style={{ textDecoration: 'none', color: 'black', fontWeight: 'bold', marginRight: '20px' }} >REGISTER</Link>
            </>
          )}
        </div>
        <div style={{ flex: 1, textAlign: 'center' }}>
          <Link to="/">
            <img src={logo} alt="Logo" style={{ marginTop:'35px',width: '250px', height: '40px', marginLeft: 'auto', marginRight: '110px' }} />
          </Link>
        </div>
        <Link to="/">
          <img src="https://cdn.discordapp.com/attachments/1211969925933961216/1214340369915846697/Screenshot_2024-03-04_233323-removebg-preview.png?ex=65f8c199&is=65e64c99&hm=36eb4d341f270c5977bc3606532b10a087e10435f8e0c6af42d55744f5a1e6ca&" alt="Icona" style={{ width: '60px', height: '60px', marginRight: '150px' }} />
        </Link>
      </div>
  </div>

        
        {/* <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav ms-auto">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <Link to="/login" style={{textDecoration: 'none', color: 'black', fontWeight: 'bold'}}>LOGIN</Link>
              <span style={{margin: '0 5px'}}>or</span>
            <Link to="/register" style={{textDecoration: 'none', color: 'black', fontWeight: 'bold'}}>REGISTER</Link> */}
              
                {/* <li className="nav-item dropdown pe-3">
                      <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" data-bs-target="#navbarDropdown" aria-expanded="false">
                      <img src={loginIcon} alt="login" style={{ width: "30px", height: "30px" }}/>
                    </a>
                      <ul className="dropdown-menu dropdown-menu-end " id="navbarDropdown">
                        { user ? 
                          <li><Link className="dropdown-item" to="/" onClick={() => setUser(null)}><img src={logoutIcon} alt="logout" style={{width: "30px", height: "30px" }}/>Logout</Link></li>
                                :
                          <>
                          <li><Link className="dropdown-item" to="/login">Login</Link></li>
                          <li><Link className="dropdown-item" to="/register">Register</Link></li>
                          </>
                        }
                      </ul>
                </li> */}
              {/* </ul> */}
            {/* { user ?
              <button className="btn" onClick={handleCartClick}>
                <img src={carrelloIcon} alt="Home" style={{ width: "30px", height: "30px" }} />
              </button> : <></>
            } */}
          {/* </div> */}
        {/* </div>
      </div> */}
      {/* {isCartOpen && (
        <div
          style={{
            position: "fixed",
            top: "90px",
            right: "10px", // Mantieni il carrello alla destra dello schermo
            backgroundColor: "#ffffcc", // Cambia lo sfondo del carrello in giallo chiaro
            padding: "40px",
            width: "fit-content", // Imposta la larghezza in base al contenuto
            border: "1px solid orange", // Cambia il colore del bordo in arancione
            borderRadius: "5px", // Aggiungi bordi arrotondati
          }}
        >
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {cartItems && cartItems.map(({...item}, index) => 
              (
                <li key={index} style={{ display: "flex", alignItems: "center", marginBottom: "5px", padding:"10px" }}>
                  <button className="btn btn-danger" style={{ fontSize: "8px", marginRight: "5px" }} onClick={() => removeFromCart(index)}>
                    X
                  </button>
                  <button className="btn btn-primary" style={{ fontSize: "8px", marginRight: "5px" }} onClick={() => incrementQuantity(index)}>
                    +
                  </button>
                  {console.log(cartItems)}
                </li>
              ))}
          </ul>
          <div style={{ textAlign: "right", marginTop: "10px" }}>
            <p style={{ fontSize: "12px", fontWeight: "bold", marginBottom: "5px" }}>TOT: &euro;{totalPrice(cartItems).toFixed(2)}</p>
            <p style={{ fontSize: "12px", fontWeight: "bold", marginBottom: "5px" }}>CONSEGNA: &euro;{totalDelivery(cartItems).toFixed(2)}</p>
          </div>
          <Link className="nav-link active btn btn-warning" aria-current="page" to="/deliverypage" onClick={handleNavigation}>
            BUY
          </Link>
        </div>
      )} */}
    </nav>
  );
}
