import axios from "axios";
import { currentCart, currentPrice, currentRestaurant, currentUser } from "../../App";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { useAtom } from 'jotai';
import { useState } from "react";
import { useLocation, useSearchParams } from 'react-router-dom';
import { Link } from "react-router-dom";


export default function CheckoutOrder(props) {
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
        axios.post("/delivery/" + restaurant.id + "/" + user.id, delivery).then(
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
                    let dishToDelivery =
                    {
                        dish_id: list[j].id,
                        delivery_id: deliveryId,
                        price: deliveryTotal,
                        quantity: list[j].quantity
                    }


                    axios.post("/dishToDelivery/" + dishToDelivery.dish_id + "/" + deliveryId, dishToDelivery)
                }
                alert("Ordine completato con successo");
            }
        )
    }

    const [orderCompleted, setOrderCompleted] = useState(false);

    const handleCheckout = () => {
        startTransaction();
        setOrderCompleted(true);
    };

    return (
        <div className="card" style={{ background: 'linear-gradient(to right, #ffffff, #154360)', color: '#000', minHeight: '100vh', marginLeft: '20px' }}>
            <div className="card-body" style={{ paddingRight: '20px', display: orderCompleted ? 'none' : 'block' }}>
                <h3 style={{ fontWeight: 'bold', color: 'black', marginBottom: '60px' }}>Riepilogo dell'ordine</h3>
                <h5 style={{ fontWeight: 'bold' }}>Prodotti</h5>
                <div className="row row-cols-3 g-4" style={{ marginTop: "0%" }}>
                    <div style={{ padding: '5px', marginBottom: '10px', marginLeft: '-5px' }}>
                        {cartItems.map((item, index) => (
                            <div key={index} style={{ marginBottom: '10px', backgroundColor: 'white', borderRadius: '10px', padding: '5px 10px', maxWidth: '70%' }}>
                                <div><strong style={{ marginRight: "20px" }}>{item.quantity}</strong> Menù: <span style={{ marginLeft: '10px' }}>{item.name}</span></div>
                            </div>
                        ))}
                    </div>
                </div>
                <hr style={{ maxWidth: "40%", color: "red" }} />
                <div className="row">
                    <div className="col-md-6 d-flex flex-column">
                        <div>
                            <h5 style={{ fontWeight: 'bold', marginTop: '60px' }}>Dettagli di Consegna</h5>
                            <p style={{ marginBottom: '10px', backgroundColor: 'white', borderRadius: '10px', padding: '5px 10px', maxWidth: '30%' }}><strong>Shipped at:</strong> {shippingTime}</p>
                            <p style={{ marginBottom: '60px', backgroundColor: 'white', borderRadius: '10px', padding: '5px 10px', maxWidth: '30%' }}><strong>Expected arrival:</strong> {orario.toString()}</p>
                        </div>
                        <div>
                            <h5 style={{ fontWeight: 'bold' }}>Note</h5>
                            <p style={{ marginBottom: '60px', backgroundColor: 'white', borderRadius: '10px', padding: '5px 10px', maxWidth: '60%' }}> {notes}</p>
                        </div>
                    </div>
                </div>

                <hr style={{ maxWidth: "40%", color: "red" }} />
                <p style={{ marginBottom: '20px', backgroundColor: 'white', borderRadius: '10px', padding: '5px 10px', maxWidth: '15%', marginTop: "60px" }}><strong style={{ marginRight: "20px" }}>Total price: {(deliveryTotal + restaurant.deliveryPricePerUnit).toFixed(2)}&euro;</strong></p>

                <div className="d-flex">
                    <form style={{ marginRight: '10px' }}>
                        <Link to="/deliverypage">
                            <button className="btn btn-link" type="submit" onClick={startTransaction} style={{ color: '#fff', backgroundColor: '#154360', marginTop: "50px" }}>Back</button>
                        </Link>
                    </form>
                    <form>
                        <button className="btn btn-success" type="submit" onClick={handleCheckout} style={{ backgroundColor: 'red', marginTop: "50px" }}>Checkout Order</button>
                    </form>
                </div>
            </div>
            {orderCompleted && (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'rgba(0, 0, 0, 0.5)', color: '#fff', padding: '20px', borderRadius: '10px', zIndex: '999' }}>
                    <h4>Ordine completato con successo</h4>
                </div>
            )}
        </div>
    );
}
