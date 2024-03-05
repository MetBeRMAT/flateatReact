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
  const searchReview = useRef(null);

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

  function filterBack() {
    setTheFilter(restaurants.filter(r => back(r)))
  }

  function back(r) {
    if (r === "" || r !== "")
      return true;

  }

  return (
    <>
      <div className="row gy-5 ms-3 mt-1 p-4 me-3" style={{ backgroundColor: '#fff', color: '#000' }}>
        <div className="col-3 p-4">
          <hr />
          <div className="input m-3 align-items-center">
            <span className="input me-2" id="basic-addon2">
              <strong>Tipo Cibo:</strong>
            </span>
            <input name="type" ref={searchType} type="text" placeholder="Type" className="form-control border-0" />
          </div>
          <hr />
          <div className="input m-3 align-items-center">
            <span className="input me-2" id="basic-addon2">
              <strong>Recensioni:</strong>
            </span>
            <div>
              <input
                type="radio"
                id="ascending"
                name="reviewOrder"
                value="asc"
              />
              <label htmlFor="ascending">Crescente</label>
            </div>
            <div>
              <input
                type="radio"
                id="descending"
                name="reviewOrder"
                value="desc"
              />
              <label htmlFor="descending">Decrescente</label>
            </div>
          </div>
          <hr />
          <button className="btn" onClick={startSearch} style={{ marginTop: '10px'}}> 
            <strong>Search -&gt;</strong>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/CapShield05.jpg/220px-CapShield05.jpg" alt="Search" style={{ width: '70px', height: '70px' }} />
            
          </button>
          <br></br>
          <button className="btn" onClick={filterBack} style={{ marginTop: '10px'}}> 
            <strong style={{fontWeight: 'bold'}}>Reset -&gt;</strong>
            <img src="https://m.media-amazon.com/images/I/91YvoWlpgYL.jpg" alt="Search" style={{ width: '70px', height: '70px' }} />
          </button>
        </div>
        <div className="col-9">
          <div className="row row-cols-3 g-4" style={{ marginTop: "0%" }}>
            {filtered.map(f => <RestaurantCard {...f} />)}
          </div>
        </div>
      </div>
    </>

  );
  }