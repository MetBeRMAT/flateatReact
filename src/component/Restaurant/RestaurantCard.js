import { Link } from "react-router-dom";
import { useAtom } from "jotai";
import { currentRestaurant, currentUser } from "../../App";

export default function RestaurantCard(props) {
  const [user] = useAtom(currentUser);
  const [restaurant, setRestaurant] = useAtom(currentRestaurant)

  function Card({ foodTypes, open, name, distance, restaurantprice, average, img }) {

    if (user) {
      return (
        <div className="card mb-4" style={{ width: "100%", height: "100%", backgroundColor: '#fff', boxShadow: '10px 8px 8px rgba(0, 0, 0, 0.1)', position: 'relative' }}>
          <img
            className="card-img-top"
            src={img}
            alt="Restaurant Image"
            style={{ height: "200px", objectFit: "cover" }}
          />

          <div className="card-body">
            <div className="restaurant-info">
              <h1 className="card-title" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{name}'s Restaurant</h1>
              <h3 className="card-text" style={{ fontSize: '1.2rem' }}>
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
                <Link to={`/reviewpage/${props.id}/${user.id}`} style={{ textDecoration: 'none' }}>
                  <h3 style={{ fontSize: '1rem', marginTop: '5px', marginLeft: '20px', color: average > 8 ? 'green' : average >= 6 && average <= 8 ? 'green' : 'green' }}>
                    ★ {average} {average > 8 ? "Eccellente" : average >= 6 && average <= 8 ? 'Buono' : 'Pessimo'}
                  </h3>
                </Link>
                <h3 style={{ fontSize: '1rem', marginTop: '5px', marginLeft: '20px' }}>
                  {(distance).toFixed(2)} m
                </h3>
                <h3 style={{ fontSize: '1rem', marginTop: '5px', marginLeft: '20px' }}>
                  Consegna: {(distance * restaurantprice).toFixed(2)}&euro;
                </h3>
              </>
            )}
          <div className="action-buttons" style={{ position: 'absolute', bottom: '10px', right: '10px', textAlign: 'right' }}>
            <button type="button" className="btn btn-danger rounded-circle">
              <Link className="nav-link" to={`/RestaurantDetail/${props.id}/${user.id}`}>
                Details
              </Link>
            </button>
          </div>
        </div>

      );
    }
    else if (!user) 
    {
      return (
        <div className="card mb-4" style={{ width: "100%", height: "100%", backgroundColor: '#fff', boxShadow: '10px 8px 8px rgba(0, 0, 0, 0.1)', position: 'relative' }}>
          <img
            className="card-img-top"
            src={img}
            alt="Restaurant Image"
            style={{ height: "200px", objectFit: "cover" }}
          />

          <div className="card-body">
            <div className="restaurant-info">
              <h1 className="card-title" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{name}'s Restaurant</h1>
              <h3 className="card-text" style={{ fontSize: '1.2rem' }}>
                {foodTypes.join(', ')}
              </h3>
            </div>
          </div>

          <div className="status-info" style={{ position: 'absolute', top: '155px', right: '10px', backgroundColor: 'rgba(255, 255, 255, 1)', padding: '10px', borderRadius: '50px' }}>
            <h3>
              {open ? "OPEN" : "CLOSED"}
            </h3>
          </div >
            <Link to={`/reviewpage/${props.id}`} style={{ textDecoration: 'none' }}>
              <h3 style={{ fontSize: '1rem', marginTop: '5px', marginLeft: '20px', color: average > 8 ? 'green' : average >= 6 && average <= 8 ? 'green' : 'green' }}>
                ★ {average} {average > 8 ? "Eccellente" : average >= 6 && average <= 8 ? 'Buono' : 'Pessimo'}
              </h3>
            </Link>
            
          <div className="action-buttons" style={{ position: 'absolute', bottom: '10px', right: '10px', textAlign: 'right' }}>
            <button type="button" className="btn btn-danger rounded-circle">
              <Link className="nav-link" to={`/RestaurantDetail/${props.id}`}>
                Details
              </Link>
            </button>
          </div>
        </div >
      );
    }
  }

  if (user) {
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
              average={props.average}
              img={props.imgUrl}
            />
          </div>
        </div>
      </div>
    );
  }
  else if (!user) {
    return (
      <div className="container" >
        <div className="row justify-content-center mt-4">
          <div className="col">
            <Card
              id={props.id}
              foodTypes={props.foodTypes}
              open={props.open}
              name={props.name}
              restaurantprice={props.restaurantprice}
              average={props.average}
              img={props.imgUrl}
            />
          </div>
        </div>
      </div>
    );
  }

}


