import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useAtom } from "jotai";
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
      UnloggedView();
    }, 
    []
  );

  const UnloggedView = () => 
  {
    axios.get("/restaurants")
      .then((response) => {
        setRestaurants(response.data);
        setTheFilter(response.data);
        // setTheFilter(filtered.filter(r => r.isOpen)); remove comment when ready :D
      })
      .catch((error) => {
        console.error("Errore durante il recupero dei dati dei ristoranti:", error);
      });
  };



  const searchType = useRef(null);

  function startSearch()
    {
        let keyFood = searchType.current.value;

        setTheFilter(restaurants.filter(r => searchFood(r, keyFood)))
    }

  function searchFood(r, f)
    {
        if(f == "")
        return true;

        let foodArray = f.split(" ");
        
        for(let i = 0; i < r.foodTypes.length; i++)
        {
            for(let k = 0; k < foodArray.length; k++)
            {
                if(r.foodTypes[i] == foodArray[k])
                return true;
            }
        }
        return false;
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
          <br />
        <button class="btn btn-primary" onClick={startSearch}> Search </button>
        </div>
        <div className="col-9">
          <div className="row row-cols-2 g-4" style={{marginTop:"0%"}}>
             {filtered.map(f => <RestaurantCard {...f} />)}
          </div>
        </div>
      </div>
    </>
  );
  }