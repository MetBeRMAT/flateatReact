import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
        Reply ancora vuote :c
        </>
    );
}