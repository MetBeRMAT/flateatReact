import { Link } from "react-router-dom";
import axios from "axios";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { currentUser } from "../../App"
import { useAtom } from "jotai";;

export default function Register() {
  const navigate = useNavigate();

  const [user, setUser] = useAtom(currentUser);
  const [log, setLog] = useState(false);
  const [show, setShow] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const [newUser, setNewUser] = useState({
    mail: "",
    password: "",
    phone: "",
    positionX: "",
    positionY: ""
  });

  const inEmail = useRef(null);
  const inPw = useRef(null);
  const inX = useRef(null);
  const inY = useRef(null);
  const inNum = useRef(null);

  function registerUser() {
    newUser.mail = inEmail.current.value;
    newUser.password = inPw.current.value;
    newUser.phone = inNum.current.value;
    newUser.positionX = inX.current.value;
    newUser.positionY = inY.current.value;



    axios.post("/users/register", newUser).then(
      (response) => {
        console.log(response.data);
        setUser(response.data);
        setNewUser({
          mail: "",
          password: "",
          phone: "",
          positionX: "",
          positionY: ""
        })
      }
    ).then(navigate("/"))
  }

  function checkRegister() {
    let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,}$/;

    let email = inEmail.current.value;
    let pw = inPw.current.value;

    let emailRegex = /^(?:[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)?@gmail\.com|[a-zA-Z0-9]+\.[a-zA-Z0-9]+@libero\.it)$/;

    if (
      emailRegex.test(email) &&
      (
        !email.includes(" ") && regex.test(pw)
      )
      &&
      (
        inX.current.value >= 0 && inX.current.value <= 1000 && inY.current.value >= 0 && inY.current.value <= 1000
      )
    ) {
      setLog(true); //Da commentare queste tre righe

      registerUser();

    }
    else
      alert("Credeziali invalide")
      setShow(false);
  }


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div style={{ backgroundColor: '#154360', minHeight: 'calc(88.7vh)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
      <div
        className="container"
        style={{
          width: "400px",
          backgroundColor: "#f0f0f0",
          padding: "50px",
          borderRadius: "8px"
        }}
      >
        <div className="row justify-content-center">
          <div className="col-md-12">
            <h2 className="text-center mb-4">Create your account</h2>
            <div className="form-group" style={{ marginBottom: "15px" }}>
              <input
                type="text"
                ref={inEmail}
                className="form-control"
                placeholder="Email"
                required
              />
            </div>
            <div className="form-group" style={{ marginBottom: "15px" }}>
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  ref={inPw}
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
            <div className="form-group" style={{ marginBottom: "15px" }}>
              <input
                type="text"
                ref={inX}
                className="form-control"
                placeholder="Position X"
              />
            </div>
            <div className="form-group" style={{ marginBottom: "15px" }}>
              <input
                type="text"
                ref={inY}
                className="form-control"
                placeholder="Position Y"
              />
            </div>
            <div className="form-group" style={{ marginBottom: "15px" }}>
              <input
                type="text"
                ref={inNum}
                className="form-control"
                placeholder="Phone Number"
              />
            </div>
            <div className="form-group mt-3 text-center">
              <button
                className="btn btn-primary px-3"
                onClick={checkRegister}
                style={{ width: "100%", marginTop: "10px" }}
              >
                Register
              </button>
            </div>
            <div className="form-group text-center" style={{ marginTop: "20px" }}>
              Already have an account? <Link to="/login">Log in</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}