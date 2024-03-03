// RestaurantCard.js
import { Link } from "react-router-dom";
import FoodCard from "./FoodCard";
import userEvent from "@testing-library/user-event";
import { useAtom } from "jotai";
import { currentUser } from "../../App";


export default function RestaurantCard(props) 
{
    const [user, setUser] = useAtom(currentUser);

  function Card({ foodTypes, open, name, distance, addToCart,id}) {
    return (
      <div className="card text-center text-bg-success  ">
        <div className="card-body text-bg-success">
        <h1 className="jumbotron-heading">{name}'s Restaurant</h1>
          <dl className="row">
            <dt className="col-sm-9 text-start" style={{marginTop:"1%"}}>
              TU NON HAI FAME?
              {foodTypes.map((f, index) => (
                <div key={index} className="mb-2 pl-0">
                  <FoodCard name={f} />
                  {/* <button className="btn btn-success btn-sm" onClick={() => addToCart(f)}>
                    Aggiungi
                  </button> */}
                </div>
              ))}
            </dt>
            <dt className="col-sm-3 mt-2" > We are {open ? "Open :D" : "Closed :c"}
            {distance != null ? <div className=" bg-warning p-2"> We are {distance}flattometri away </div> : <></>}
            </dt>
          </dl>
        </div>
        
        { user ?
        <button style={{marginLeft:"4%"}} class="btn btn-info position-absolute bottom-0 start-0" type="button"><Link class="nav-link" to={"/RestaurantDetail/"+id+"/"+user.id}>More details</Link></button> :
        <button style={{marginLeft:"4%"}}class="btn btn-info position-absolute bottom-0 start-0" type="button"><Link class="nav-link" to={"/RestaurantDetail/"+id}>More details</Link></button>
        }
      </div>
    );
  }

    function CardGrid() 
    {
        return (

        <div className="row justify-content-center mt-4">
        <div className="col-3 col-sm-6">
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
