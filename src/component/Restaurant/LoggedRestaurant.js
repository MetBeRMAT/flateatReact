import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useAtom } from "jotai";
import { currentUser } from "../../App";
import RestaurantCard from "./RestaurantCard";

export default function LoggedRestaurant()
{
    const [user, setUser] = useAtom(currentUser);

    const [restaurants, setRestaurants] = useState([]);
    const [filtered, setTheFilter] = useState([]);

    

    useEffect(
        () => 
        {
          LoggedView();
        }, 
        []
      );
    
      const LoggedView = () => 
      {

        axios.get("/restaurants/user/"+user.id)
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
    const searchDistance = useRef(null);

    function calcDistance(restaurant, maxDistance)
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

        setTheFilter(restaurants.filter(r => searchFood(r, keyFood) && back(r, maxDistance)))
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

    function filterBack()
    {
        let maxDistance = searchDistance.current.value;
        setTheFilter(restaurants.filter(r => back(r, maxDistance)))
    }

    function back(r, maxDistance)
    {
        if(maxDistance == "")
        return true;

        if(r.distance > maxDistance)
        return false;
        else
        return true;
    }

      return(
            <>
            <div className="row gy-5 p-1" >
                <div className="col-3 p-4" style={{backgroundColor:"violet", height:"50%"}}>
                <div className="input-group mb-3" syle={{backgroundColor:"violet"}}>
                    <div > Search Multiple Foods by Spacing Them
                    <input name="type" ref={searchType} type="text"placeholder="Type"/>
                    </div>
                </div>
                <div htmlFor="customRange3" className="form-label">
                    Distanza Massima (km): 1414 
                </div>
                <input type="number" ref={searchDistance} />  
                {/* <input type="range" ref={searchDistance} className="form-range" min={0} max={1414}/> */}
                <br />
                <br />
                    <button class="btn btn-primary" onClick={startSearch}> Search </button>
                </div>
                <div className="col cols-2 g-4" style={{marginTop:"1.2%"}}>
                    {filtered.map(f => <RestaurantCard {...f} open={f.open} distance={f.distance}/>)}
                </div>
            </div>
            </>
  );
}