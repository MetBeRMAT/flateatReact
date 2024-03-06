import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Replies from "./Replies";

export default function ShowReply() 
{
    let {id} = useParams();
    const [replies, setReplies] = useState([]);

    useEffect(
        ()=>
        {
            axios.get("/tickets/my/"+id).then(
                (response) =>
                {
                    setReplies(response.data);
                }
            )
        },
        []
    )

    return(
        <>
            <h1 className="text-center"> Replies of Ticket #{id} </h1>
                <div class="container">
                    <div class="row justify-content-center p-4 m-4">
                        {replies.map(r => <Replies {...r}/>)}
                    </div>
                </div>
        </>
    );
}