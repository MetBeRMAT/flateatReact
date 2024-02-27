import { useEffect, useState } from "react";


export default function Register()
{
    const [newUser, setNewUser] = useState({
        mail:"",
        password:""
        // phone:"",
        // positionX:"",
        // postiionY:""
    });

    const inEmail = useRef(null);
    const inPw = useRef(null);

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
        let accettable = false;
        let email = inEmail.current.value;
        let pw = inPw.current.value;

        if(email.includes("@") && email.includes(".it") || email.includes(".com") && regex.test(pw))
        {   accettable = true;
            registerUser();
        }
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
                        <input type="password" ref={inPw} class="form-control" id="password" name="password" required placeholder="Requires 8char, 1BIGCHAR, 1number"/>
                    </div>
                    <button class="btn btn-primary" onclick={checkRegister}> Register </button>
                    <br></br>
                </div>
                </div>
            </div>
        </>
    )
}