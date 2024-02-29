import { Link } from "react-router-dom";

export default function RestaurantCard(props)
{
    function Card({ foodTypes,isOpen ,name, phone, x, y}) 
    {
        return (
            // la visualizzo in colonne da tre ed ho impostato lo stato isOpen e tutti i tipi di cibi associati
            // Solo che bisogna dare una controllata a isOpen dato che mi da sempre Closed 

                <div class="card">
                    <div class="card-img-overlay">
                        <h3 style={{fontFamily:"Lucida Handwriting,cursive"}} class="card-title">Restaurant {name}</h3>
                        <dl class="row">
                            <dt class="col-sm-3"></dt>
                                <dd class="col-sm-9">
                                    <p></p>
                                    <p></p>
                                </dd>

                            <dt style={{fontFamily:"Times New Roman,Serif"}}>Type of food: {foodTypes}</dt>
                            <dt class="col-sm-3"></dt>
                            <dd class="col-sm-9">
                                <p></p>
                                <p></p>
                            </dd>

                            <dt style={{fontFamily:"Times New Roman,Serif"}} class="col-sm-3">{isOpen ? "Open" : "Closed"}</dt>

                        </dl>
                        {/* <button class="btn btn-info position-absolute bottom-0 end-0" type="button"><Link class="nav-link" to={"/RestaurantDetail/"+title}>Details</Link></button> */}
                    </div>
                
            </div>
        );
    }

    function CardGrid() 
    {
        return (

            <div className="row row-cols-2 g-4">
                <Card foodTypes={props.foodTypes} isOpen={props.isOpen} name={props.name} />
            </div>
        );
    }

    return(
        <>
            {/* ho richiamato la CardGrid di sopra ho solo richiamato la funzione senza che visualizzi una nuova card dentro il return */}


                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <CardGrid/>
                        </div>
                    </div>
                </div>
        {/* <dl class="row text-bg-success m-3">
            <dt class="col-sm-3"></dt>
                <dd class="col-sm-9">
                    <p></p>
                    <p></p>
                </dd>
            <dt style={{fontFamily:"Times New Roman,Serif"}} class="col-sm-3">Restaurant: {props.name}</dt>
            <dt class="col-sm-3"></dt>
            <dd style={{fontFamily:"Times New Roman,Serif"}} class="col-sm-3">WeFlat are on: ({props.positionX} - {props.positionY})</dd>
            <p><button class="btn btn-info " type="button"><Link class="nav-link" to={"/restaurantdetail/"+props.id}>Details</Link></button></p>
        </dl> */}
        </>
    );
}