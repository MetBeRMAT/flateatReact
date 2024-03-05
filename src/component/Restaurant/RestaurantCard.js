import { Link } from "react-router-dom";
import { useAtom } from "jotai";
import { currentUser } from "../../App";
import Guanto from "./GuantoThanos.png"

export default function RestaurantCard(props) 
{
  const [user] = useAtom(currentUser);

  function Card({ foodTypes, open, name, distance, restaurantprice}) 
  {
    return (
      <div className="card mb-4" style={{ width: "100%", height: "100%", backgroundColor: '#fff', boxShadow: '10px 8px 8px rgba(0, 0, 0, 0.1)', position: 'relative' }}>
  <img
    className="card-img-top"
    src={"https://citynews-romatoday.stgy.ovh/~media/horizontal-mid/52295577773865/unnamed-2020-07-27t134402-606-2.jpg"}
    alt="Restaurant Image"
    style={{ height: "200px", objectFit: "cover" }}
  />

  <div className="card-body">
    <div className="restaurant-info">
      <h1 className="card-title" style={{ fontSize: '1.5rem',fontWeight: 'bold' }}>{name}'s Restaurant</h1>
      <h3 className="card-text"  style={{ fontSize: '1.2rem'}}>
      {foodTypes.join(', ')}
      </h3>
    </div>
  </div>

  <div className="status-info" style={{ position: 'absolute', top: '155px', right: '10px', backgroundColor: 'rgba(255, 255, 255, 1)', padding: '10px', borderRadius: '50px' }}>
    <h3>
      {open ? "OPEN" : "CLOSED"}
    </h3>
  </div >
    {distance != null && 
    (
      <>
      <h3 style={{ fontSize: '1rem', marginTop: '5px', marginLeft: '20px' }}>
        {(distance/1000).toFixed(2)} km
      </h3>
      <h3 style={{ fontSize: '1rem', marginTop: '5px', marginLeft: '20px' }}>
        Consegna: {(distance * restaurantprice).toFixed(2)}&euro;
      </h3>
      </>
    )}
      <div className="action-buttons" style={{ position: 'absolute', bottom: '10px', right: '10px', textAlign: 'right' }}>
        <button type="button" className="btn">
          {user ? 
            <Link className="nav-link" to={`/RestaurantDetail/${props.id}/${user.id}`}>
              <img src={Guanto} alt="More details" style={{ width: '50px', height: '50px' }} />
            </Link>
          : <></>}
        </button>
      </div>
</div>

    );
  }

  return (
    <div className="container" >
      <div className="row justify-content-center mt-4">
        <div className="col">
          <Card
            id={props.id}
            distance={props.distance}
            foodTypes={props.foodTypes}
            open={props.open}
            name={props.name}
            addToCart={props.addToCart}
            restaurantprice={props.restaurantprice}
          />
        </div>
      </div>
    </div>
  );
}
