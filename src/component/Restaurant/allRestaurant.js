import axios from "axios";
import { useAtom } from "jotai";
import { useEffect, useRef, useState } from "react";
import { currentUser } from "../../App";


export default function AllRestaurants() 
{
  const [user, setUser] = useAtom(currentUser);

  const [restaurants, setRestaurants] = useState([]);
  const [filtered, setTheFilter] = useState([]);
  const [filter, setFilter] = useState({ foodType: "", maxDistance: 1414 });

  useEffect(
    () => 
    {
        Data();
    }, 
    []
  );

  const Data = () => 
  {
    axios.get("/restaurants")
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

  const isShowable = (restaurant, filter) => 
  {
    const { foodType, maxDistance } = filter;

    if (
      (foodType &&
        !restaurant.map(r => r.foodTypes.toLowerCase().includes(foodType.toLowerCase()) &&
        calcDist(r, maxDistance))
    )) 
    {
      return false;
    }

    return true;
  };

  const foodTypeInputChange = (e) => 
  {
    setFilter({
      ...filter,
      foodType: e.target.value
    });
  };

  const maxDistanceInputChange = (e) => {
    const inputValue = e.target.value;
  
    //è un numero positivo?
    const isValidInput = /^\d+(\.\d+)?$/.test(inputValue);
  
    //se l'input è valido aggiorna lo stato, altrimenti no
    setFilter({
      ...filter,
      maxDistance: isValidInput ? parseFloat(inputValue) : filter.maxDistance
    });
  };

  function startSearch()
  {
    let keyFood = searchType.current.value;
    let maxDistance = searchDistance.current.value;

    setTheFilter(restaurants.filter(r => r.foodTypes == keyFood && calcDist(r, maxDistance)))
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
            Distanza Massima (km): {filter.maxDistance} km
          </label>
          <input type="range" ref={searchDistance} className="form-range" min={0} max={1414} value={filter.maxDistance}/>
          <br />
          <br />
          <button class="btn btn-primary" onClick={startSearch}> Search </button>
        </div>
        <div className="col-9">
          <div className="row gy-5">
            {/* 
              <RestaurantCard key={restaurant.id} {...filtered} /> */}
          </div>
        </div>
      </div>
    </>
  );
  }

