// import { currentCart, currentRestaurant, currentUser } from "../../App";
// import { useAtom } from 'jotai';
// import { useState } from "react";
// import { useLocation, useSearchParams } from 'react-router-dom';
// import axios from "axios";

// export default function CheckoutOrder()
// {
//     // const [cartItems, setCartItems] = useAtom(currentCart);
//     const [restaurant, setRestaurant] = useAtom(currentRestaurant);
//     const [queryParameters] = useSearchParams();
//     const [user, setUser] = useAtom(currentUser);

//     const [deliverySentBack, setSentBack] = useState([]);

//     let notes = queryParameters.get("notes") 
//     let orario = queryParameters.get("deliveryTime")
    
//     console.log(notes); //
//     console.log(orario);

//     const [delivery, setDelivery] = useState({
//         distance:"",
//         expected_arrival:"",
//         notes:"",
//         paymenthMethod:"",
//         restaurant_id:restaurant.id,
//         user_id:user.id
//     });

//     // @PostMapping("/delivery")        DA AGGIUNGERE IN BACK-END
//     // public Delivery postDelivery(@RequestBody DeliveryDtoR dto)
//     // {
//     //     Delivery delivery = conv.dtoRToDelivery(dto);
//     //     return delivery;
//     // }

//     function startTransaction()
//     {
//         axios.post("/delivery", delivery).then(
//             (response) =>
//             {
//                 setSentBack(response.data);
//             }
//         ),
//         []

//         for(let i = 0; i < cartItems.length; i++)   //UN DISHTODELIVERY per ogni DISH del carrello 
//         {                                           //ID della delivery -> deliverySentBack.id
//                                                     //ID Restaurant -> restaurant.id
//             // axios.post("/dishtodelivery", UNDISHDELCARRELLO)
//         }
//     }

//     return(
//         <>
//         <div className="d-flex justify-content-center">
//             <div className="col-2">
//                 Shipped at - {orario}
//                 Expected arrival - {orario + (restaurant.distance)}

//                 Your notes - {notes}
//             </div>
//             <div className="row row-cols-3 g-4" style={{marginTop:"0%"}}>
//                 {cartItems.map(i => <ShowCart {...i}/>)}
//                 Total price: 
//             </div>
//             <button className="btn btn-success" onClick="startTransaction">PAGAH</button>
//         </div>
//         </>
//     );

//     function ShowCart(props)
//     {
//         return(
//             <>
//                 <div> {props.name} </div>
//             </>
//         )
//     }
// }