import { useAtom } from "jotai";
import { currentUser } from "../../App";
import axios from "axios";
import { Link } from "react-router-dom";

export default function TicketCard(props)
{
    function closeTicket()
    {
        axios.delete("/tickets/"+props.id).then();
    }

    const [user, setUser] = useAtom(currentUser);

    if(user.id != 6)
        return(
            <>
                <div class="card shadow-sm col-md-4 mb-2" style={{width: "15rem;"}}>
                    <div class="card-body">
                        <h5 class="card-title">Ticket #{props.id}</h5>
                        <p class="card-text">{props.text}</p>
                    </div>
                    <Link className="nav-link" to={`/ShowReplies/${props.id}`}>
                        My Replies 
                    </Link>
                    <div className="btn btn-danger" onClick={closeTicket}> Close Ticket </div>
                </div>
            </>
        );
    else
        return(
            <>
                <div class="card shadow-sm col-md-4 mb-2" style={{width: "15rem;"}}>
                    <div class="card-body">
                        <h5 class="card-title">From {props.userOfTicket.mail}</h5>
                        <h6 className="card-title">#{props.id}</h6>
                        <p class="card-text">{props.text}</p>
                    </div>
                    <Link className="btn btn-dark" to={`/ShowReplies/${props.id}`}>
                        My Replies 
                    </Link>
                    <div className="btn btn-danger" onClick={closeTicket}> Close Ticket </div>
                </div>
            </>
        );
}