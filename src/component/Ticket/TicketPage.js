import { response } from "express";
import { currentUser } from "../../App";
import { useAtom } from 'jotai';
import TicketCard from "./TicketCard";
import axios from "axios";
import { useEffect, useState } from "react";

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
            <h1>CIAO JAVA JAVA</h1>
                <div class="container">
                    <div class="row">
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
            <h1> CIAO UTENTE BRUTTO CHE NON SEI JAVA JAVA</h1>
                <div class="container">
                    <div class="row">
                        {tickets.map(t => <TicketCard {...t}/>)}
                    </div>
                </div>
            </>
        );
    }
}