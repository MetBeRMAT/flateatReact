import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Replies from "./Replies";

export default function ShowReply() {
    let { id } = useParams();
    const [replies, setReplies] = useState([]);

    useEffect(
        () => {
            axios.get("/tickets/my/" + id).then(
                (response) => {
                    setReplies(response.data);
                }
            )
        },
        []
    )

    return (
        <>
            <div style={{ backgroundColor: '#154360', minHeight: 'calc(88.7vh)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', marginBottom: '20px' }}>
                <h1 className="text-center" style={{ color: "#fff", marginBottom: "20px" }}> Replies of Ticket #{id} </h1>
                <div class="container">
                    <div class="row justify-content-center p-4 m-4">
                        {replies.map(r => <Replies {...r} />)}
                    </div>
                </div>
            </div>
        </>
    );
}