import React from "react";
import { Link } from "react-router-dom";
import { useAtom } from "jotai";
import { currentUser } from "../../App";
import homeIcon from "./home-icon.png"; // Importa l'immagine per il pulsante Home

export default function Navbar() {
    const [user, setUser] = useAtom(currentUser);

    return (
        <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "orange" }}>
            <div className="container-fluid">
                <div className="d-flex align-items-center"> {/* Wrapper div per contenere i link "Home" e "Ristorante" */}
                    <Link className="navbar-brand btn btn-success me-3" to="/" style={{ backgroundColor: "#ffff00", borderColor: "#ffff00", backgroundImage: `url(${homeIcon})`, backgroundSize: "cover", width: "50px", height: "50px" }}></Link> {/* Link "Home" */}
                    <Link className="nav-link active btn btn-warning me-auto" aria-current="page" to="/restaurant" style={{ backgroundColor: "#ffff00", borderColor: "#ffff00", backgroundSize: "cover", width: "100px", height: "50x" }}>RESTAURANT</Link> {/* Link "Ristorante" con la classe me-auto per spostarlo a sinistra */}
                </div>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav ms-auto"> {/* Utilizzo la classe ms-auto per spostare gli elementi a destra */}
                        {user ?
                            <button className="btn btn-warning me-2" onClick={() => setUser(null)}>LOG OUT</button>
                            :
                            <>
                                <Link className="nav-link active btn btn-warning me-2" aria-current="page" to="/login"  style={{ backgroundColor: "#ffff00", borderColor: "#ffff00", width: "70px", height: "40px" }}>LOGIN</Link>
                                <Link className="nav-link active btn btn-warning" aria-current="page" to="/register" style={{ backgroundColor: "#ffff00", borderColor: "#ffff00",width: "100px", height: "40px" }}>REGISTER</Link>
                            </>
                        }
                    </div>
                </div>
            </div>
        </nav>
    );
}