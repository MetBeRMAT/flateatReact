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

                <div>
                    <div className="row">
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <Link to="/" className="btn rounded-pill m-3" style={{ backgroundColor: '#154360', color: '#fff', padding: '10px 20px', textDecoration: 'none' }}>Back</Link>
                                </div>
                            </div>
                            <div className="row justify-content-center">
                                <div className="col-12">
                                    <h1 className="text-center"> Whose has awakened the ultimate admin from his slumber?</h1>
                                </div>
                            </div>
                            <div className="row justify-content-center">
                                {tickets.map(t => <TicketCard {...t} />)}
                            </div>
                        </div>
                    </div>
                    <div className="navbar">
                        {/* Contenuto della navbar */}
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
                            {tickets.map(t => <TicketCard {...t} />)}
                        </div>
                        <Link to="/replyform" className="btn btn-warning" style={{ position: 'absolute', bottom: '570px', left: '20px' }}> Wanna Complain More? Leave us another Ticket</Link>
                    </div>
                </div>
            </>
        );
    }
}