import axios from "axios";
import { useAtom } from "jotai";
import { useEffect, useRef, useState } from "react";
import { currentUser } from "../../App";
import RestaurantCard from "./RestaurantCard";


export default function AllRestaurants() 
{
  const [user, setUser] = useAtom(currentUser);

  const [restaurants, setRestaurants] = useState([]);
  const [filtered, setTheFilter] = useState([]);

  useEffect(
    () => 
    {
        Data();
    }, 
    []
  );

  const Data = () => 
  {
    axios.get("/restaurant")
      .then((response) => {
        setRestaurants(response.data);
        setTheFilter(response.data);
      })
      .catch((error) => {
        console.error("Errore durante il recupero dei dati dei ristoranti:", error);
      });
  };

  const searchType = useRef(null);
  const searchDistance = useRef(null);

  function calcDist(restaurant, maxDistance)
  {
    if(maxDistance == "")
      return true;

    let userX = user.positionX;
    let userY = user.positionY;
    let ourX = Math.abs(userX - restaurant.positionX); 
    let ourY = Math.abs(userY - restaurant.positionY);

    ourX *= ourX;
    ourY *= ourY;

    let ourIpotenusa = Math.sqrt(ourX + ourY);
    if(ourIpotenusa < maxDistance)
      return true;
    else
      return false;
  }

  function startSearch()
  {
    let keyFood = searchType.current.value;
    let maxDistance = searchDistance.current.value;

    setTheFilter(restaurants.filter(r => r.foodTypes.filter(f => f == keyFood) || calcDist(r, maxDistance)))
  }

  function searchDi()
  {
    let maxDistance = searchDistance.current.value;

    setTheFilter(restaurants.filter(r => calcDist(r, maxDistance)))
  }

  return (
    <>
      <div className="row gy-5">
        <div className="col-3 p-4">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon2">
              Tipo Cibo:
            </span>
            <input name="type" ref={searchType} type="text"placeholder="Type"/>
          </div>
          <label htmlFor="customRange3" className="form-label">
            Distanza Massima (km): 1414 ma Lorenzo non sa graficare la scritta vera
          </label>
          {/* <input type="range" ref={searchDistance} className="form-range" min={0} max={1414}/> */}
          <input type="number" ref={searchDistance} />  
          <br />
          <br />
          {
            user ? <button class="btn btn-primary" onClick={searchDi}> Search </button> :
            <div> You have to be logged :c</div>
          }
        </div>
        <div className="col-9">
          <div className="row gy-5">
             {filtered.map(f => <RestaurantCard {...f} />)}
          </div>
        </div>
      </div>
    </>
  );
  }