export default function FoodCard(props)
    {
        return(

            <>
            <div class="col-md-4">
                <div className="card text-center mb-3" style={{width:"17rem", marginLeft:"-15%", marginTop:"5%"}}>
                            <div className="col-12"> 
                                <label for="quest" className="form-label"> mangiami  {props.id}</label>
                            </div>
                            <div className="col-12"> 
                                <label for="quest" className="form-label">{props.name}</label>
                            </div>
                </div>
            </div>
            </>
        
        );
    }