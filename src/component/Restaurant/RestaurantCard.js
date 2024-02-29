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
      <div className="card text-center text-bg-success">
        <Link to={`/restaurant/${props.id}`} className="text-decoration-none">
          <div className="card-body text-bg-success">
            <h5 style={{ fontFamily: "Lucida Handwriting,cursive" }} className="card-title">Restaurant {name}</h5>
            <dl className="row">
              <dt className="col-sm-3 text-center"></dt>
              <dt className="col-sm-9 text-center" style={{ fontFamily: "Times New Roman,Serif" }}>
                Type of food: {foodTypes.map(f => <FoodCard key={f} name={f} />)}
              </dt>
              <dt className="col-sm-4 mt-2">{open ? "Open" : "Closed"}</dt>
              {distance != null ? <div className="col-sm-12 mt-2"> {distance} </div> : <></>}
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

            <div className="row justify-content-center mt-4">
        <div className="col-12 col-sm-6">
                  <Card id={props.id} distance={props.distance} foodTypes={props.foodTypes} open={props.isOpen} name={props.name} />
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
