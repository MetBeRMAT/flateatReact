// import axios from "axios";
// import { useEffect, useState } from "react";
// import RestaurantCard from "./RestaurantCard";

// export default function AllRestaurants() 
// {
//   const [restaurants, setRestaurants] = useState([]);
//   const [filter, setFilter] = useState({ foodType: "", maxDistance: 1414 });

//   const isShowable = (restaurant, filter) => 
//   {
//     const { foodType, maxDistance } = filter;

//     if (
//       (foodType &&
//         !restaurant.map(r => r.foodTypes.toLowerCase().includes(foodType.toLowerCase()) &&
//         r.distance > maxDistance)
//     )) 
//     {
//       return false;
//     }

//     return true;
//   };

//   useEffect(
//     () => 
//     {
//         Data();
//     }, 
//     []
//   );

//   const Data = () => 
//   {
//     axios.get("/restaurants")
//       .then((response) => {
//         setRestaurants(response.data);
//       })
//       .catch((error) => {
//         console.error("Errore durante il recupero dei dati dei ristoranti:", error);
//       });
//   };

//   const foodTypeInputChange = (e) => 
//   {
//     setFilter({
//       ...filter,
//       foodType: e.target.value
//     });
//   };

//   const maxDistanceInputChange = (e) => {
//     const inputValue = e.target.value;
  
//     //è un numero positivo?
//     const isValidInput = /^\d+(\.\d+)?$/.test(inputValue);
  
//     //se l'input è valido aggiorna lo stato, altrimenti no
//     setFilter({
//       ...filter,
//       maxDistance: isValidInput ? parseFloat(inputValue) : filter.maxDistance
//     });
//   };

//   return (
//     <>
//       <div className="row gy-5">
//         <div className="col-3 p-4">
//           <div className="input-group mb-3">
//             <span className="input-group-text" id="basic-addon2">
//               Tipo Cibo:
//             </span>
//             <input
//               type="text"
//               className="form-control"
//               onChange={foodTypeInputChange}
//             />
//           </div>
//           <label htmlFor="customRange3" className="form-label">
//             Distanza Massima (km): {filter.maxDistance} km
//           </label>
//           <input
//             type="range"
//             className="form-range"
//             min={0}
//             max={50} // Modifica il valore massimo in base alle tue esigenze
//             value={filter.maxDistance}
//             onChange={maxDistanceInputChange}
//           />
//           <br />
//           <br />
//         </div>
//         <div className="col-9">
//           <div className="row gy-5">
//             {/* {restaurants.map((restaurant) => (
//               <RestaurantCard key={restaurant.id} {...restaurant} />
//             ))} */}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
