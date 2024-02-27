import { useAtom } from "jotai";
import { useEffect, useRef, useState } from "react";
import { currentUser } from "../../App";
import axios from "axios";

export default function Login()
{
    const [logg, setLog] = useState(false);
    const [show, setShow] = useState(true);
    const [user, setUser] = useAtom(currentUser);
    const [users, setUsers] = useState([]);
    
    useEffect(
        ()=>
        {
            axios.get("/users").then(
                (response)=>
                {
                    setUsers(response.data);
                }
            );
        },
        []
    )

    const inEmail = useRef(null);
    const inPw = useRef(null); 

    function log()
    {
        let keyEmail = inEmail.current.value;
        let keyPw = inPw.current.value;
        for(let i = 0; i < users.length; i++)
        {
            if(users[i].email == keyEmail && users[i].password == keyPw)
            {
                setUser(users[i]);
                setLog(true);
                return;
            }
            else
                setShow(false);
                alert("Utente non trovato, psw o email errate");
        }
    }   

    return(
        <>
        <div class="container">
                <div class="row justify-content-center">
                <div class="col-md-6">
                    <h2 class="text-center mb-4">Loginnati su GiasTEat</h2>
                    <div class="form-group">
                        <label for="guildName">Email: </label>
                        <input type="text" ref={inEmail} class="form-control" required />
                    </div>
                    <div class="form-group">
                        <label for="password">Password:</label>
                        <input type="password" ref={inPw} class="form-control" required/>
                    </div>
                    <button class="btn btn-primary" onclick={log}> Login </button>
                    <br></br>
                </div>
                {
                    logg ? <div>login avvenuta con successo</div> : 
                    show ? <p></p> :
                    <div>login errata</div>
        }
                </div>
            </div>
        </>
    )
}