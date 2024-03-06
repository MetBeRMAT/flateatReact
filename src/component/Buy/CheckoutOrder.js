import axios from "axios";
import { currentCart, currentPrice, currentRestaurant, currentUser } from "../../App";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { useAtom } from 'jotai';
import { useState } from "react";
import { useLocation, useSearchParams } from 'react-router-dom';


export default function CheckoutOrder() {
    dayjs.extend(utc);
    dayjs.extend(timezone);


    const [cartItems, setCartItems] = useAtom(currentCart);
    const [restaurant, setRestaurant] = useAtom(currentRestaurant);
    const [queryParameters] = useSearchParams();
    const [user, setUser] = useAtom(currentUser);
    const [deliveryTotal, setTotalPrice] = useAtom(currentPrice)

    const [deliverySentBack, setSentBack] = useState([]);

    const [uniqueNames, setNames] = useState([]);

    let notes = queryParameters.get("notes")
    let shippingTime = queryParameters.get("deliveryTime")
    let pay = queryParameters.get("paymentMethod")

    let orario = dayjs().tz("Europe/Rome");
    orario = orario.hour(shippingTime.split(":")[0]);
    orario = orario.minute(shippingTime.split(":")[1]);
    orario = orario.add(restaurant.distance * 2, "minute").format("HH:mm");

    const [delivery, setDelivery] = useState({
        distance: restaurant.distance,
        expected_arrival: orario,
        notes: notes,
        paymenthMethod: pay,
        restaurant_id: restaurant.id,
        user_id: user.id
    });

    function startTransaction() {
        let deliveryId;
        axios.post("/delivery", delivery).then(
            (response) => {
                setSentBack(response.data);
                deliveryId = response.data.id;
                let list = [...cartItems];
                let countedItems = {};

                for (let i = 0; i < cartItems.length; i++) {
                    let quantity = 0;
                    for (let k = 0; k < cartItems.length; k++) {
                        if (i !== k && cartItems[i].name === cartItems[k].name) {
                            quantity++;
                        }
                    }
                    list[i].quantity = quantity + 1;
                    countedItems[cartItems[i].name] = true;
                }

                list = list.filter((item, index) => {
                    return cartItems.findIndex(d => d.name === item.name) === index;
                });
                console.log(list);


                for (let j = 0; j < list.length; j++) {
                    let dishToDelivery = {
                        dish_id: list[j].id,
                        delivery_id: deliveryId,
                        price: deliveryTotal,
                        quantity: list[j].quantity
                    }

                    console.log(dishToDelivery);

                    axios.post("/dishToDelivery", dishToDelivery)
                }
            }
        )
    }


    return (
        <>
            <div class="card">
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-6">
                            <p><strong>Shipped at:</strong> {shippingTime}</p>
                            <p><strong>Expected arrival:</strong> {orario.toString()}</p>
                        </div>
                        <div class="col-md-6">
                            <p><strong>Your notes:</strong> {notes}</p>
                        </div>
                    </div>
                    <div class="row row-cols-3 g-4" style={{marginTop: "0%"}}>
                        { cartItems.map(i => <ShowCart {...i} />) }
                    </div>
                    <p><strong>Total price:</strong> </p>
                    <button class="btn btn-success" onclick="startTransaction()">Checkout Order</button>
                </div>
            </div>
        </>
    );

    function ShowCart(props) {
        return (
            <>
                <div> {props.name} </div>
            </>
        )
    }
}

