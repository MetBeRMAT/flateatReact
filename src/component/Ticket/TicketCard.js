import { useAtom } from "jotai";
import { currentUser } from "../../App";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function TicketCard(props) 
{
    
    function closeTicket() 
    {
        axios.delete("/tickets/" + props.id).then( () =>
            props.deleteTicket(props.id)
        );
    }

    const [user, setUser] = useAtom(currentUser);

    if (user.id !== 6)
        return (
            <div className="card shadow-sm col-md-4 mb-2" style={{ width: "15rem" }}>
                <div className="card-body">
                    <h5 className="card-title">Ticket #{props.id}</h5>
                    <p className="card-text">{props.text}</p>
                </div>
                <Link className="btn btn-dark" to={`/ShowReplies/${props.id}`}>
                    My Replies
                </Link>
                <div className="btn btn-danger" onClick={closeTicket}>Close Ticket</div>
            </div>
        );
    else
        return (
            <div className="card shadow-sm col-md-8 me-4 mb-2" style={{ width: "20rem", backgroundColor: "#f0f0f0" }}>
                <div className="card-body">
                    <h5 className="card-title mb-3">From {props.userOfTicket.mail}</h5>
                    <h6 className="card-title mb-3">#{props.id}</h6>
                    <p className="card-text mb-3">{props.text}</p>
                </div>
                <div className="d-flex justify-content-between mx-3 mb-3">
                    <Link className="btn" style={{ backgroundColor: '#071c2c', color: "white" }} to={`/ShowReplies/${props.id}`}>
                        Reply
                    </Link>
                    <div className="btn btn-danger" onClick={closeTicket}>Close Ticket</div> 
                </div>
            </div>
        );
}
