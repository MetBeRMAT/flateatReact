import { currentUser } from "../../App";

import { useAtom } from "jotai";
export default function Homepage()
{
    const [user, setUser] = useAtom(currentUser);
    return(
        <>
            {user ? <p> Utente loggato {user.mail}</p> : <p>Utente non loggato</p>}
            <div class="card position-absolute top-50 start-50 translate-middle" style={{width: "18rem;"}}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Flatland13_Lineland.jpg/220px-Flatland13_Lineland.jpg" class="card-img-top" alt="..." />
                <div class="card-body">
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                </div>
            </div>
        </>
    );
}