import { useAtom } from "jotai";
import { useEffect, useRef, useState } from "react";
import { currentUser } from "../../App";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


export default function Login() {
  let navigate = useNavigate();

  const [logg, setLog] = useState(false);
  const [user, setUser] = useAtom(currentUser);
  const [users, setUsers] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  function togglePasswordVisibility() {
    setShowPassword(!showPassword)
  }


  useEffect(
    () => {
      axios.get("/users").then(
        (response) => {
          setUsers(response.data);
        }
      );
    },
    []
  )

  const inEmail = useRef(null);
  const inPw = useRef(null);

  function log() {
    let keyEmail = inEmail.current.value;
    let keyPw = inPw.current.value;

    for (let i = 0; i < users.length; i++) {
      if (users[i].mail === keyEmail && users[i].password === keyPw) {
        setUser(users[i]);
        setLog(true);
        navigate("/");
        return;
      }
    }

    alert("Login errata");
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (

    <>
      <div style={{background: '#154360', minHeight: 'calc(88.7vh)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
        <div className="container" style={{ width: "400px", backgroundColor: "#f0f0f0", padding: "50px", borderRadius: "8px" }}>
          <div className="row justify-content-center">
            <div className="col-md-12">
              <h2 className="text-center mb-4">Login to your Account</h2>
              <div className="form-group">
                <input type="text" ref={inEmail} className="form-control" placeholder="Email" required />
              </div>
              <div style={{ marginBottom: "10px" }}></div>
              <div className="form-group">
                <div className="input-group">
                  <input
                    type={showPassword ? "text" : "password"}
                    ref={inPw}
                    onChange={handlePasswordChange}
                    className="form-control"
                    placeholder="Password"
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
              <div className="form-group mt-3 text-center">
                <Link to="/">
                  <button
                    className="btn btn-primary px-3"
                    onClick={log}
                    style={{ height: '38px', width: '100%', maxWidth: '100%', borderRadius: '8px', marginTop: "10px" }}>
                    Log in
                  </button>
                </Link>
              </div>
              <div className="form-group text-center" style={{ marginTop: "20px" }}>
                Don't have an account? <Link to="/register">Create an account</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}