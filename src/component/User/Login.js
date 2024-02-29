import { useAtom } from "jotai";
import { useEffect, useRef, useState } from "react";
import { currentUser } from "../../App";
import axios from "axios";
import { useNavigate } from "react-router-dom";
 

export default function Login()
{
    let navigate = useNavigate();

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
            if(users[i].mail == keyEmail && users[i].password == keyPw)
            {
                setUser(users[i]);
                setLog(true);
                return;
            }
        }
        
        alert("Login errata"); 
    }   

    return(
        <>
        <div class="container">
                <div class="row justify-content-center">
                <div class="col-md-6">
                    <h2 class="text-center mb-4">Loginnati su GiasTEat</h2>
                    <div class="form-group">
                        <label for="guildName">Email: </label>
                        <input type="text" ref={inEmail} class="form-control" required/>
                    </div>
                    <div class="form-group">
                        <label for="password">Password:</label>
                        <input type="text" ref={inPw} class="form-control" required/>
                    </div>
                    <button class="btn btn-primary" onClick={log}> Login </button>
                    <br></br>
                </div>
                {
                    logg ? <div>login avvenuta con successo</div> : 
                    
                    <div>login errata</div>
        }
                </div>
            </div>
        </>
    )
}