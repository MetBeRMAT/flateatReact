
export default function DishCard(props)
{
    return(
        <>
        <div class="col-md-3" style={{marginLeft:"5%"}}>
            <div className="card text-center mb-3" style={{width:"17rem", marginLeft:"-15%", marginTop:"5%"}}>
                        <div className="col-12"> 
                            <label for="quest" className="form-label">Our sexy Dish# {props.id}</label>
                        </div>
                        <div className="col-12"> 
                            <label for="quest" className="form-label">{props.name}</label>
                            <p> Category: {props.category}</p>
                        </div>
            </div>
        </div>
        </>
    );
}