import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useAtom } from "jotai";
import { currentUser } from "../../App";
import RestaurantCard from "./RestaurantCard";


export default function AllRestaurants() {
  const [user, setUser] = useAtom(currentUser);

  const [restaurants, setRestaurants] = useState([]);
  const [filtered, setTheFilter] = useState([]);
  const [order, setOrder] = useState('desc');
  const [categories, setCategories] = useState([]);

  useEffect(
    () => {
      UnloggedView();
    },
    []
  );

  const UnloggedView = () => {
    axios.get("/restaurant/nouser")
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

  function filterBack() {
    setTheFilter(restaurants.filter(r => back(r)))
  }

  function back(r) {
    if (r === "" || r !== "")
      return true;
  }

  function asc() {
    let toSort = [];
    toSort = [...filtered];
    toSort.sort((a, b) => a.average - b.average);
    setTheFilter(toSort);
  }

  function desc() {
    let toSort = [];
    toSort = [...filtered];
    toSort.sort((a, b) => b.average - a.average);
    setTheFilter(toSort);
  }

  function descending() {
    return order === 'desc';
  }

  function ascending() {
    return order === 'asc';
  }



  function startSearch() {
    let keyFood = searchType.current.value;

    let filterRestaurant = restaurants.filter(r => searchFood(r, keyFood));

    if (descending())
      filterRestaurant.sort((a, b) => b.average - a.average);
    else if (ascending())
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

  function filterBack() {
    setTheFilter(restaurants.filter(r => back(r)))
  }

  function back(r) {
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

  return (
    <>

      <div className="row" style={{ minHeight: 'calc(100vh)', display: 'flex', background: 'linear-gradient(to right, #ffffff, #154360)', color: '#000' }}>
        <h1 className="text-center mb-4 mt-4" style={{ fontWeight: 'bold', fontSize: '48px', color: '#000', marginLeft: 'auto', marginRight: 'auto' }}>Our Restaurants</h1>
        <div className="col-2 p-4" style={{ backgroundColor: 'red', borderRadius: '10px', marginLeft: '100px', marginRight: '100px', alignSelf: 'flex-start', background: 'red' }}> {/* Aggiunto il colore rosso direttamente qui */}
          <div className="input align-items-center" style={{ marginTop: '30px', marginBottom: '30px', textAlign: 'left' }}>
            <span className="input" id="basic-addon2">
              <strong style={{ color: '#154360' }}>Tipo Cibo:</strong>
            </span>
            <input name="type" ref={searchType} type="text" placeholder="Type" className="form-control border-0" style={{ color: '#fff', backgroundColor: '#154360' }} />
          </div>
          <br />
          <div className="input align-items-center" style={{ marginTop: '30px', marginBottom: '30px', color: '#154360', textAlign: 'left' }}>
            <span className="input" id="basic-addon2">
              <strong>Recensioni:</strong>
            </span>
            <div style={{ color: 'white' }}>
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
            <div style={{ color: 'white' }}>
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
          <br />
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button className="btn" onClick={startSearch} style={{ marginTop: '10px', color: '#154360', backgroundColor: 'transparent', border: 'none' }}>
              <strong style={{ color: '#fff' }}>SEARCH</strong>
            </button>
            <br></br>
            <button className="btn" onClick={filterBack} style={{ marginTop: '10px', color: '#154360', fontWeight: 'bold', backgroundColor: 'transparent', border: 'none' }}>
              <strong>RESET</strong>
            </button>
          </div>
        </div>
        <div className="col-8"> {/* Aggiunto align-self-start */}
          <div className="row row-cols-1 row-cols-md-3 g-4" style={{ marginTop: "0%" }}> {/* Impostato row-cols-1 row-cols-md-3 */}
            {filtered.map((f) => (
              <div className="col mb-4">
                <RestaurantCard key={f.id} {...f} average={f.average} restaurantprice={f.deliveryPricePerUnit} open={f.open} distance={f.distance} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

