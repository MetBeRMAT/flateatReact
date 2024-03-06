import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useAtom } from "jotai";
import { currentUser } from "../../App";
import RestaurantCard from "./RestaurantCard";
import { Link } from "react-router-dom";

export default function LoggedRestaurant() {
    const [user, setUser] = useAtom(currentUser);

    const [restaurants, setRestaurants] = useState([]);
    const [filtered, setTheFilter] = useState([]);    
    const [categories, setCategories] = useState([]);
    const [order, setOrder] = useState('desc');

    useEffect(() => 
    {
        LoggedView();
    }, []);

    const LoggedView = () => {
        axios.get("/restaurants/user/" + user.id)
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

    function startSearch() 
    {
        let keyFood = searchType.current.value;
        let maxDistance = searchDistance.current.value;

        let filterRestaurant = restaurants.filter(r => searchFood(r, keyFood) && goTheDistance(r, maxDistance));

        if(descending())
          filterRestaurant.sort((a, b) => b.average - a.average);
        else if(ascending())
          filterRestaurant.sort((a, b) => a.average - b.average);

          setTheFilter(filterRestaurant);
    }

    function searchFood(r, f) {
        if (f === "") return true;

        let foodArray = f.split(" ");

        for (let i = 0; i < r.foodTypes.length; i++) {
            for (let k = 0; k < foodArray.length; k++) {
                if (r.foodTypes[i] === foodArray[k]) return true;
            }
        }
        return false;
    }

    function goTheDistance(r, max)
    {
      if(max === '' || max == 0)
        return true;
    
      if(max > r.distance)
        return true;
      
        return false;
    }

    function filterBack() {
        let maxDistance = searchDistance.current.value;
        setTheFilter(restaurants.filter(r => back(r)))
    }

    function back(r) 
    {
        if (r === "" || r !== "") 
        return true;
        return false;
    }

    useEffect(() => {
        // Ricalcola le categorie ogni volta che i ristoranti cambiano
        const allCategories = restaurants.flatMap(restaurant => restaurant.foodTypes);
        const uniqueCategories = [...new Set(allCategories)];
        setCategories(uniqueCategories);
        desc();
    }, [restaurants]);

    function handleRangeChange(event) 
    {
        const rangeValue = event.target.value;
        document.getElementById('distanceValue').innerText = rangeValue;
    }

    function asc()
    {
      let toSort = [];
      toSort = [...filtered];
      toSort.sort((a, b) => a.average - b.average);
      setTheFilter(toSort);
      setOrder('asc');
    }

    function desc()
    {
      let toSort = [];
      toSort = [...filtered];
      toSort.sort((a, b) => b.average - a.average);
      setTheFilter(toSort);
      setOrder('desc');
    }

    function descending()
    {
      return order === 'desc';
    }

    function ascending()
    {
      return order === 'asc';
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
          <div>
            <h5 className="text"> Distanza Massima (km): <span id="distanceValue">0</span> </h5>
            <input 
                type="range" 
                ref={searchDistance} 
                className="form-range" 
                id="customRange1" 
                min="0" 
                max="1414" 
                onChange={handleRangeChange} 
            />
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
                checked={ascending()}
                onChange={asc}
              />
              <label htmlFor="ascending">Crescente</label>
            </div>
            <div>
              <input
                type="radio"
                id="descending"
                name="reviewOrder"
                value="desc"
                checked={descending()}
                onChange={desc}
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
                    {filtered.map((f) => (
                            <div  className="col-12 col-md-4 mb-4">
                                <RestaurantCard key={f.id} {...f} average={f.average} restaurantprice={f.deliveryPricePerUnit} open={f.open} distance={f.distance} />
                            </div>
                    ))}
                        </div>
                </div>
            </div>
        </>
    );
}

                        