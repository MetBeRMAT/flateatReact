import { Link } from "react-router-dom";
import FoodCard from "./FoodCard";


export default function RestaurantCard(props) {

  function Card({ foodTypes, open, name, phone, x, y, distance }) {
    return (
      <div className="card text-bg-success">
        <Link to={`/restaurants/${props.id}`} className="text-decoration-none">
          <div className="card text-bg-success">
            <h3 style={{ fontFamily: "Lucida Handwriting,cursive" }} className="card-title">Restaurant {name}</h3>
            <dl className="row">
              <dt className="col-sm-3"></dt>
              <dt style={{ fontFamily: "Times New Roman,Serif" }}>Type of food: {foodTypes.map(f => <FoodCard key={f} name={f} />)}</dt>
              <dt className="col-sm-3"></dt>
              <dd className="col-sm-9">
                <p></p>
                <p></p>
              </dd>
              <dt style={{ fontFamily: "Times New Roman,Serif" }} className="col-sm-4">{open ? "Open" : "Closed"}</dt>
              {distance != null ? <div> {distance} </div> : <></>}
            </dl>
          </div>
        </Link>
        <Link to={`/order/${props.id}`} className="btn btn-danger">
          Ordina ora
        </Link>
      </div>
    );
  }

  function CardGrid() {
    return (
      <div className="row row-cols-2 g-4">
        <Card distance={props.distance} foodTypes={props.foodTypes} open={props.isOpen} name={props.name} />
      </div>
    );
  }

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <CardGrid />
          </div>
        </div>
      </div>
    </>
  );
}
