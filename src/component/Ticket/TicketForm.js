import axios from "axios";
import { useRef, useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
import { currentUser } from "../../App";
import { useAtom } from "jotai";

export default function TicketForm()
{
    const [user, setUser] = useAtom(currentUser);

    const [ticket, setTicket] = useState({
        text:""
    })

    let navigate = useNavigate();

    const writtenTicket = useRef(null);

    function submit()
    {
        ticket.text = writtenTicket.current.value;
        axios.post("/tickets/"+user.id, ticket).then(
            navigate("/ticket")
        )
    }

    function back()
    {

    }

    return( //Da aggiungere i vari ref
        <>
        <div className="container ">
        <h1 className="row justify-content-center align-items-center"> Leave us a Ticket </h1>
            <div class="row justify-content-center align-items-center">
                <div class="row justify-content-center p-4 m-4"></div>
                <div class="card shadow-sm col-md-4 mb-2" style={{width: "15rem;"}}>
                    <div class="card-title justify-content-center text-center">
                        Diccici
                    </div>

                    <div class="card-body"> 
                        <textarea ref={writtenTicket} style={{width:"100%"}}> </textarea>
                    </div>

                    <div className="card-footer">
                        <div className="d-flex justify-content-between">
                            <button style={{width:"25%"}} className="btn btn-primary" onClick={submit}>Submit</button>
                            <button style={{width:"25%"}} className="btn btn-primary"><a href="javascript:history.back()" style={{color:"white"}}>Back</a></button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        </>
    );
}