import { Link } from "react-router-dom";
import FoodCard from "./FoodCard";
import userEvent from "@testing-library/user-event";
import { useAtom } from "jotai";
import { currentUser } from "../../App";
import RestaurantDetail from "./RestaurantDetail";


export default function RestaurantCard(props) {
  const [user, setUser] = useAtom(currentUser);

  function Card({ foodTypes, open, name, distance, addToCart, id }) {
    return (
      <div className="card mb-4" style={{ width: "100%", height: "100%" }}>
        <img
          className="card-img-top"
          src={"https://citynews-romatoday.stgy.ovh/~media/horizontal-mid/52295577773865/unnamed-2020-07-27t134402-606-2.jpg"}
          alt="Restaurant Image"
          style={{ height: "200px", objectFit: "cover" }}
        />

      <div className="card-body bg-warning">
  <div className="restaurant-info">
    <h1 className="card-title">{name}'s Restaurant</h1>
    <h3 className="card-text">{foodTypes}</h3>
  </div>
  <div className="status-info">
    <h3>
      Status: {open ? "OPEN :D" : "CLOSED :c"}
    </h3>
    <h3> 
      {distance != null ? (
        <h3>
          We are {distance} flattometri away
        </h3>
      ) : (
        <></>
      )}
    </h3>
  </div>
  <div className="action-buttons">
    <button type="button" className="btn btn-danger">
      <Link className="nav-link" to={`/RestaurantDetail/${props.id}/${user.id}`}>
        More details
      </Link>
    </button>
  </div>
</div>

    </div>
  );
}
 

    function CardGrid() 
    {
        return (


          <div className="action-buttons">
            <div className="row">
              <div className="col-6">
                <Link className="btn btn-danger" to={`/RestaurantDetail/${props.id}/${user.id}`}>
                  More details
                </Link>
              </div>
              <div className="col-6 d-flex justify-content-end">
                <Link className="btn btn-success" to="/reviewpage">
                  Reviews
                </Link>
              </div>
            </div>
          </div>
    );
  }

  function CardGrid() {
    return (
      <div className="row justify-content-center mt-4">
        <div className="col">
          <Card
            id={props.id} distance={props.distance}
            foodTypes={props.foodTypes}
            open={props.open}
            name={props.name}
            addToCart={props.addToCart}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <CardGrid />
    </div>
  );
}
