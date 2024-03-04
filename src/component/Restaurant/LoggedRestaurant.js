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

    useEffect(() => {
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

    function calcDistance(restaurant, maxDistance) {
        if (maxDistance === "") return true;

        let userX = user.positionX;
        let userY = user.positionY;
        let ourX = Math.abs(userX - restaurant.positionX);
        let ourY = Math.abs(userY - restaurant.positionY);

        ourX *= ourX;
        ourY *= ourY;

        let ourIpotenusa = Math.sqrt(ourX + ourY);
        if (ourIpotenusa < maxDistance) return true;
        else return false;
    }

    function startSearch() {
        let keyFood = searchType.current.value;
        let maxDistance = searchDistance.current.value;

        setTheFilter(restaurants.filter(r => searchFood(r, keyFood) && back(r, maxDistance)))
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

    function filterBack() {
        let maxDistance = searchDistance.current.value;
        setTheFilter(restaurants.filter(r => back(r, maxDistance)))
    }

    function back(r, maxDistance) {
        if (maxDistance === "") return true;

        if (r.distance > maxDistance) return false;
        else return true;
    }

    useEffect(() => {
        // Ricalcola le categorie ogni volta che i ristoranti cambiano
        const allCategories = restaurants.flatMap(restaurant => restaurant.foodTypes);
        const uniqueCategories = [...new Set(allCategories)];
        setCategories(uniqueCategories);
    }, [restaurants]);

    return (
        <>
            <div className="container mt-6">

                <div className="row">
                    <div style={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}>
                        <h5 className="text">Search Multiple Foods by Spacing Them:</h5>
                        <input name="type" ref={searchType} type="text" placeholder="Type" />
                        
                        <h5 className="text"> Distanza Massima (km): 1414 </h5>
                        <input type="number" ref={searchDistance} />
                        <button className="btn btn-primary" onClick={startSearch}> 
                            Search 
                        </button>
                            
                        <button className="btn btn-bg btn-primary" type="button" onClick={filterBack}>
                            Reset Filtri
                        </button>
                    </div>
                </div>

                <div className="col-sm-9" style={{ width: "100%", height: "50%" }}>
                        <div className="row row-cols-1 row-cols-md-3 g-4">
                    {filtered.map((f) => (
                            <div key={f.id} className="col-12 col-md-4 mb-4">
                                <RestaurantCard {...f} open={f.open} distance={f.distance} />
                            </div>
                    ))}
                        </div>
                </div>
                
                <div className="mt-4">
                    <button className="btn btn-primary" type="button">
                        <Link className="text-white" to="/restaurantlogged">
                            Torna al Ristorante
                        </Link>
                    </button>
                </div>
            </div>
        </>
    );
}
