import { Link } from "react-router-dom";

export default function RestaurantCard(props)
{
    function Card({ name, phone, opening , closing, x, y}) 
    {
        return (
                <div class="card text-bg-dark">
                    <div class="card-img-overlay">
                        <h3 style={{fontFamily:"Lucida Handwriting,cursive"}} class="card-title">Restaurant {name}</h3>
                        <dl class="row">
                            <dt class="col-sm-3"></dt>
                                <dd class="col-sm-9">
                                    <p></p>
                                    <p></p>
                                </dd>

                            <dt style={{fontFamily:"Times New Roman,Serif"}} class="col-sm-3">Our Phone: {phone}</dt>
                            <dt class="col-sm-3"></dt>
                            <dd class="col-sm-9">
                                <p></p>
                                <p></p>
                            </dd>

                            <dt style={{fontFamily:"Times New Roman,Serif"}} class="col-sm-3">{opening}/{closing}:</dt>
                            <dd style={{fontFamily:"Monaco,Monospace"}} class="d-flex col-sm-9 justify-content-end">({x},{y})</dd>

                        </dl>
                        {/* <button class="btn btn-info position-absolute bottom-0 end-0" type="button"><Link class="nav-link" to={"/RestaurantDetail/"+title}>Details</Link></button> */}
                    </div>
                </div>
        );
    }

    function CardGrid() 
    {
        return (

            <div>
                <Card name={props.name} phone={props.phone} opening={props.openingHour} closing={props.closingHour} x={props.positionX} y={props.positionY}/>
            </div>
        );
    }

    return(
        <>
        <div> Ristorante# {props.id} </div>
        <div> Nome: {props.name} <p>({props.positionX},{props.positionY})</p></div>
        <button class="btn btn-info " type="button"><Link class="nav-link" to={"/RestaurantDetail/"+props.id}>Details</Link></button>
        
        </>
    );
}