import { Link } from "react-router-dom";
import { useAtom } from "jotai";
import { currentUser } from "../../App";

export default function Navbar()
{
    const [user, setUser] = useAtom(currentUser);

    return(
        <>
            <nav class="navbar navbar-expand-lg bg-body-tertiary">
                <div class="container-fluid">
                    <Link class="navbar-brand btn btn-success" to="/">Home</Link>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div class="navbar-nav">
                        {   
                            user ?  
                            <Link class="nav-link active btn btn-warning" aria-current="page" to="/restaurantlogged">Restaurant</Link> :
                            <Link class="nav-link active btn btn-warning" aria-current="page" to="/restaurant">Restaurant</Link>
                        }
                        {
                            user ? <Link class="btn btn-warning" area-current="page" onClick={() => setUser(null)}> Logout </Link>
                            : <Link class="nav-link active btn btn-warning" aria-current="page" to="/login">Login</Link>
                        }
                        <Link class="nav-link active btn btn-warning" aria-current="page" to="/register">Register</Link>
                    </div>
                    </div>
                </div>
            </nav>
        </>
    );
}