import userEvent from "@testing-library/user-event";
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
        positionY:""
    });

    const inEmail = useRef(null);
    const inPw = useRef(null);
    const inX = useRef(null);
    const inY = useRef(null);
    const inNum = useRef(null);

    function registerUser()
    {
        newUser.mail = inEmail.current.value;
        newUser.password = inPw.current.value;
        newUser.phone = inNum.current.value;
        newUser.positionX = inX.current.value;
        newUser.positionY = inY.current.value;

        axios.post("/users/register",newUser).then(
            (response)=>
            {
                setNewUser({
                    mail:"",
                    password:"",
                    phone:"",
                    positionX:"",
                    positionY:""
                })
            }
        )
    }

    function checkRegister()
    {
        let regex =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,}$/;
        
        let email = inEmail.current.value;
        let pw = inPw.current.value;

        let emailRegex = /^(?:[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)?@gmail\.com|[a-zA-Z0-9]+\.[a-zA-Z0-9]+@libero\.it)$/;

        if(
            emailRegex.test(email) && 
            (
                !email.includes(" ") && regex.test(pw)
            ) 
            && 
            (
                inX.current.value >= 0 && inX.current.value <=1000 && inY.current.value >= 0 && inY.current.value <= 1000
            )
            )
        {   
            setLog(true); //Da commentare queste tre righe
            registerUser();
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