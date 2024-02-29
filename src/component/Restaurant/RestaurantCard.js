// RestaurantCard.js
import { Link } from "react-router-dom";
import FoodCard from "./FoodCard";

export default function RestaurantCard(props) {
  function Card({ foodTypes, open, name, distance, addToCart }) {
    return (
      <div className="card text-center text-bg-success">
        <div className="card-body text-bg-success">
          <h5 style={{ fontFamily: "Lucida Handwriting,cursive" }} className="card-title">Restaurant {name}</h5>
          <dl className="row">
            <dt className="col-sm-3 text-center"></dt>
            <dt className="col-sm-9 text-center" style={{ fontFamily: "Times New Roman,Serif" }}>
              Type of food:
              {foodTypes.map((f, index) => (
                <div key={index} className="mb-2">
                  <FoodCard name={f} />
                  <button className="btn btn-success btn-sm" onClick={() => addToCart(f)}>
                    Aggiungi
                  </button>
                </div>
              ))}
            </dt>
            <dt className="col-sm-4 mt-2">{open ? "Open" : "Closed"}</dt>
            {distance != null ? <div className="col-sm-12 mt-2"> {distance} </div> : <></>}
          </dl>
        </div>
        <Link to={`/order/${props.id}`} className="btn btn-danger">
          Ordina ora
        </Link>
      </div>
    );
  }

  function CardGrid() {
    return (
      <div className="row justify-content-center mt-4">
        <div className="col-12 col-sm-6">
          <Card
            distance={props.distance}
            foodTypes={props.foodTypes}
            open={props.isOpen}
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
