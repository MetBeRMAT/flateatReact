import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Navigate } from "react-router-dom";

export default function Register()
{
    const [log, setLog] = useState(false);
    const [show, setShow] = useState(true);

    const [newUser, setNewUser] = useState({
        mail:"",
        password:"",
        phone:"",
        positionX:"",
        postiionY:""
    });

    const inEmail = useRef(null);
    const inPw = useRef(null);
    const inX = useRef(null);
    const inY = useRef(null);
    const inNum = useRef(null);

    function registerUser()
    {
        axios.post("URL",newUser).then(
            (response)=>
            {
                setNewUser({
                    mail:"",
                    password:""
                    // phone:"",
                    // positionX:"",
                    // postiionY:""
                })
            }
        )
    }

    function checkRegister()
    {
        let regex =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,}$/;
        
        let email = inEmail.current.value;
        let pw = inPw.current.value;

        if(email.includes("@") && (email.includes("libero.it") || email.includes("gmail.com")) && !email.includes(" ") && regex.test(pw))
        {   
            setLog(true); //Da commentare queste tre righe
            inEmail.current.value = "";
            inPw.current.value = "";
            //registerUser();
        }
        else
            setShow(false);
    }

    function f()
    {
        setLog(false);
        setShow(true);
    }
    

    return(
        <>
        <div class="container">
                <div class="row justify-content-center">
                <div class="col-md-6">
                    <h2 class="text-center mb-4">Registrati su GiasTEat</h2>
                    <div class="form-group">
                        <label for="guildName">Email: </label>
                        <input type="text" ref={inEmail} class="form-control" id="guildName" name="guildName" required />
                    </div>
                    <div class="form-group">
                        <label for="password">Password:</label>
                        <input type="text" ref={inPw} class="form-control"/>
                    </div>
                    <div class="form-group">
                        <label for="number">Position X:</label>
                        <input type="text" ref={inX} class="form-control"/>
                    </div>
                    <div class="form-group">
                        <label for="number">Position Y:</label>
                        <input type="text" ref={inY} class="form-control"/>
                    </div>
                    <div class="form-group">
                        <label for="number">Phone Number:</label>
                        <input type="text" ref={inNum} class="form-control"/>
                    </div>
                    <button class="btn btn-primary" onClick={checkRegister}> Register </button>
                    <br></br>
                    <button class="btn btn-primary" onClick={f}>Click me c:</button>
                </div>
                </div>
        </div>
        {
            log ? <div>Registrazione avvenuta con successo</div> : 
            show ? <p></p> :
            <div>Registrazione errata</div>
        }
        </>
    );
}