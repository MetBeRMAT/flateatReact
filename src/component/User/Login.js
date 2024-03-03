import { useAtom } from "jotai";
import { useEffect, useRef, useState } from "react";
import { currentUser } from "../../App";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
 

export default function Login()
{
    let navigate = useNavigate();

    const [logg, setLog] = useState(false);
    const [user, setUser] = useAtom(currentUser);
    const [users, setUsers] = useState([]);
    const [showPassword,setShowPassword] = useState(false);
    const [password,setPassword] = useState("");
    
    function togglePasswordVisibility()
    {
        setShowPassword(!showPassword)
    }


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

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
      };
    
      return (
        <div style={{ backgroundColor: "#333333", minHeight: "calc(100vh - 50px)", display: "flex", alignItems: "center", justifyContent: "center", marginTop: "-20px" }}>
          <div class="container" style={{ width: "400px", backgroundColor: "#f0f0f0", padding: "20px", borderRadius: "8px" }}>
            <div class="row justify-content-center">
              <div class="col-md-12">
                <h2 class="text-center mb-4">Javeat</h2>
                <div class="form-group">
                  <label for="guildName">Email</label>
                  <input type="text" ref={inEmail} class="form-control" required />
                </div>
                <div class="form-group">
                  <label for="password">Password</label>
                  <div className="input-group">
                    <input 
                      type={showPassword ? "text" : "password"} 
                      ref={inPw} 
                      onChange={handlePasswordChange} 
                      class="form-control" 
                      required 
                    />
                    <button 
                      className="btn btn-outline-secondary" 
                      type="button" 
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>
                <div class="form-group mt-3 text-center">
                    <Link className="nav-link active" aria-current="page" to="/">
                        <button class="btn btn-primary rounded-pill px-3" onClick={log}> Login </button>
                    </Link>
                </div>
                <br></br>
              </div>
            </div>
          </div>
        </div>
      );
      
      
      
      
}