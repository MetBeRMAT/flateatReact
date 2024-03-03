export default function FoodCard(props)
    {
        return(

            <>
            <div class="col">
                <div className=" text-start mb-3" style={{marginLeft:"5%", marginTop:"-1%"}}>
                            
                            <div className="col-12"> 
                            </div>
                                <p for="quest" className="form-label">· {props.name}</p>
                </div>
            </div>
            </>
        
        );
    }