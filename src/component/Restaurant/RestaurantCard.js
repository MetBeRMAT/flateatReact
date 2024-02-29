import { Link } from "react-router-dom";
import FoodCard from "./FoodCard";
import userEvent from "@testing-library/user-event";
import { useAtom } from "jotai";
import { currentUser } from "../../App";


export default function RestaurantCard(props) 
{
    const [user, setUser] = useAtom(currentUser);

  function Card({ foodTypes, open, name, phone, x, y, distance , id}) {
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
        <button class="btn btn-info position-absolute bottom-0 end-0" type="button"><Link class="nav-link" to={"/RestaurantDetail/"+id+"/"+user.id}>Details</Link></button>
      </div>
    );
  }

    function CardGrid() 
    {
        return (

            <div className="row row-cols-2 g-4">
                <Card id={props.id} distance={props.distance} foodTypes={props.foodTypes} open={props.isOpen} name={props.name} />
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
