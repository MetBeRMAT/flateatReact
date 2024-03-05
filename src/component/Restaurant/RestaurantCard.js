import { Link } from "react-router-dom";
import { useAtom } from "jotai";
import { currentUser } from "../../App";

export default function RestaurantCard(props) {
  const [user] = useAtom(currentUser);

  function Card({ foodTypes, open, name, distance, addToCart, id }) {
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
      <h3 className="card-text">{foodTypes}</h3>
    </div>
    <div className="action-buttons">
      <button type="button" className="btn btn-danger">
        {user ? 
          <Link className="nav-link" to={`/RestaurantDetail/${props.id}/${user.id}`}>
            More details
          </Link>
        : <></>}
      </button>
    </div>
  </div>

  <div className="status-info" style={{ position: 'absolute', top: '155px', right: '10px', backgroundColor: 'rgba(255, 255, 255, 1)', padding: '10px', borderRadius: '50px' }}>
    <h3>
      {open ? "OPEN" : "CLOSED"}
    </h3>
  </div>
    {distance != null && (
      <h3>
        We are {distance} flattometri away
      </h3>
    )}
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
          />
        </div>
      </div>
    </div>
  );
}
