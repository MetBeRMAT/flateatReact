import axios from "axios";

export default function Replies(props) //From ShowReply
{

    function closeReply()
    {
        axios.delete("/replies/"+props.id);
    }

    return(
    <>
    <div class="card shadow-sm col-md-4 mb-2" style={{width: "15rem;"}}>
        <div class="card-body">
            <p class="card-text">{props.text}</p>
        </div>
        <div className="btn btn-danger disabled" style={{width:"100%"}}>Close</div>
    </div>
    </>
    );
}