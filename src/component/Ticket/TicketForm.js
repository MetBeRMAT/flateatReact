import axios from "axios";
import { useRef, useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
import { currentUser } from "../../App";
import { useAtom } from "jotai";

export default function TicketForm() {
    const [user, setUser] = useAtom(currentUser);

    const [ticket, setTicket] = useState({
        text: ""
    })

    let navigate = useNavigate();

    const writtenTicket = useRef(null);

    function submit() {
        ticket.text = writtenTicket.current.value;
        axios.post("/tickets/" + user.id, ticket).then(
            navigate("/ticket")
        )
    }

    function back() {

    }

    return ( //Da aggiungere i vari ref
        <>
            <div style={{ backgroundColor: '#154360', minHeight: 'calc(88.7vh)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '20px' }}>
                <h1 className="row justify-content-center align-items-center" style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#fff', marginTop: '30px', marginBottom: '100px' }}> Leave us a Ticket </h1>
                <div className="row justify-content-center align-items-center" style={{ width: "40%", backgroundColor: '#f0f0f0' }}>
                    <div className="card shadow-sm col-md-6 mb-2" style={{ width: "200%", backgroundColor: '#f0f0f0' }}>
                        <div className="card-title justify-content-center text-center" placeholder="" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#000', backgroundColor: '#f0f0f0' }}>
                            tell us your problem
                        </div>

                        <div className="card-body" style={{ backgroundColor: '#f0f0f0', padding: '20px' }}>
                            <textarea ref={writtenTicket} style={{ width: "100%", minHeight: '150px', fontSize: '1rem' }}> </textarea>
                        </div>

                        <div className="card-footer" style={{ backgroundColor: '#f0f0f0', padding: '20px' }}>
                            <div className="d-flex justify-content-between">
                                <button style={{ width: "45%" }} className="btn btn-primary" onClick={submit}>Submit</button>
                                <button style={{ width: "45%", textDecoration: 'none' }} className="btn btn-primary"><a href="javascript:history.back()" style={{ color: "white", textDecoration: 'none' }}>Back</a></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}