import axios from "axios";
import { currentUser } from "../../App";
import { useAtom } from 'jotai';
import TicketCard from "./TicketCard";
import { useEffect, useState } from "react";
import React from "react";
import { Link } from "react-router-dom";

export default function TicketPage() {
    const [user, setUser] = useAtom(currentUser);
    const [tickets, setTickets] = useState([]);

    function deleteTicket(id)
    {
        let clone = [...tickets];
        let pos = clone.findIndex(t => t.id ==id);
        clone.splice(pos,1);
        setTickets(clone);
    }

    useEffect(
        () => {
            if (user.id == 6) {
                axios.get("/tickets").then(
                    (response) => {
                        setTickets(response.data)
                    }
                );
            }
            else {
                axios.get("/tickets/" + user.id).then(
                    (response) => {
                        setTickets(response.data)
                    }
                );
            }
        },
        []
    )

    if (user.id == 6) {
        return (
            <>

                <div style={{ background: 'linear-gradient(to right, #ffffff, #154360)', minHeight: '100vh', color: '#fff' }}>
                    <div className="container">
                        <div className="row">
                            <div className="col-12 text-start"> {/* Aggiungi la classe text-start qui */}
                                <Link to="/" className="btn rounded-pill m-3" style={{ backgroundColor: '#154360', color: '#fff', padding: '10px 20px', textDecoration: 'none'}}>Back</Link>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-12">
                                <h1 className="text-center" style={{ color: '#000', marginBottom: "100px", marginTop: "50px" }}> Whose has awakened the ultimate admin from his slumber?</h1>
                            </div>
                        </div>
                        {tickets.length > 0 &&
                            <div className="row">
                                {tickets.map((ticket, index) => (
                                    <div key={index} className="col-md-4 mb-2">
                                        <TicketCard deleteTicket={deleteTicket} id={ticket.id} text={ticket.text} userOfTicket={ticket.userOfTicket}/>
                                    </div> 
                                ))}
                            </div>
                        }
                    </div>
                </div>







            </>
        );
    }
    else {

        return (
            <>
                <div className="row" style={{ minHeight: 'calc(100vh)', display: 'flex', background: 'linear-gradient(to right, #ffffff, #154360)', color: '#000' }}>
                    <div className="container">
                        <h1 className="text-center" style={{ fontSize: '6rem', fontWeight: 'bold', marginTop: '20px' }}> Your tickets </h1>
                        <div className="row justify-content-center p-4 m-4">
                            {tickets.map(ticket => <TicketCard deleteTicket={deleteTicket} id={ticket.id} text={ticket.text} userOfTicket={ticket.userOfTicket}/>)}
                        </div>
                        <Link to="/replyform" className="btn btn-warning" style={{ position: 'absolute', bottom: '570px', left: '20px' }}> Wanna Complain More? Leave us another Ticket</Link>
                    </div>
                </div>
            </>
        );
    }
}