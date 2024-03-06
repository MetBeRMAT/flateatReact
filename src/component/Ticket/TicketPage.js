import axios from "axios";
import { currentUser } from "../../App";
import { useAtom } from 'jotai';
import TicketCard from "./TicketCard";
import { useEffect, useState } from "react";
import React from "react";
import { Link } from "react-router-dom";

export default function TicketPage()
{
    const [user, setUser] = useAtom(currentUser);
    const [tickets, setTickets] = useState([]);

    useEffect(
        ()=>
        {
            if(user.id == 6)
            {
                axios.get("/tickets").then(
                    (response)=>
                    {
                        setTickets(response.data)
                    }
                );
            }
            else
            {
                axios.get("/tickets/"+user.id).then(
                    (response)=>
                    {
                        setTickets(response.data)
                    }
                );
            }
        },
        []
    )

    if(user.id == 6)
    {
        return(
            <>
            <h1 className="text-center"> Whose has awakened the ultimate admin from his slumber?</h1>
                <div class="container">
                    <div class="row pt-2">
                        {tickets.map(t => <TicketCard {...t}/>)}
                    </div>
                </div>
            </>
        );
    }
    else
    {

        return(
            <>
            <h1 className="text-center"> Your tickets </h1>
                <div class="container">
                    <div class="row justify-content-center p-4 m-4">
                        {tickets.map(t => <TicketCard {...t}/>)}
                    </div>
                </div>
                <Link to="/replyform" className="btn btn-warning"> Wanna Complain More? Leave us another Ticket</Link>
            </>
        );
    }
}