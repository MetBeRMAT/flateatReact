import { Form, Button, Card } from 'react-bootstrap';
import Cart from '../Cart/Cart';
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import CheckoutOrder from './CheckoutOrder';

const calculateAvailableTimes = () => {
  // Orario attuale
  const now = new Date();
  const currentHours = now.getHours();
  const currentMinutes = now.getMinutes();

  // Orario minimo disponibile (ora attuale + 2 minuti per unità di distanza)
  let minAvailableHours = currentHours;
  let minAvailableMinutes = currentMinutes + 2;

  // Se supera i 60 minuti, aggiorna le ore e i minuti di conseguenza
  if (minAvailableMinutes >= 60) {
    minAvailableHours += 1;
    minAvailableMinutes -= 60;
  }

  // Calcola gli orari disponibili a scatti di 15 minuti
  const availableTimes = [];
  for (let hours = minAvailableHours; hours < 24; hours++) {
    for (let minutes = 0; minutes < 60; minutes += 15) {
      // Verifica se l'orario è superiore all'orario attuale + 2 minuti
      if (hours > minAvailableHours || (hours === minAvailableHours && minutes >= minAvailableMinutes)) {
        const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
        availableTimes.push(formattedTime);
      }
    }
  }

  return availableTimes;
};

const DeliveryPage = () => 
{
  const [deliveryTime, setDeliveryTime] = useState('');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPayment] = useState('');
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const availableTimes = calculateAvailableTimes();

  let jsonParam = {
    notes: notes,
    shippingTime: deliveryTime,
    paymentMethod: paymentMethod
  }


  return (
    <div className="container mt-5">
      <h2>Scelta dell'orario di consegna</h2>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Orario di consegna</Form.Label>
          <Form.Control as="select" onChange={(e) => setDeliveryTime(e.target.value)} value={deliveryTime}>
            <option value="">Seleziona un orario</option>
            {availableTimes.map((time) => (
              <option key={time} value={time}>
                {time} {console.log(deliveryTime)}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Note</Form.Label>
          <Form.Control as="textarea" rows={3} onChange={(e) => setNotes(e.target.value)} value={notes} />
          <Form.Label>Payment Method</Form.Label>
          <input type="text" class="form-control" value={paymentMethod} onChange={(e) => setPayment(e.target.value)}/>
        </Form.Group>
        <Link className="btn btn-secondary" to={"/checkout?notes="+notes+"&"+"deliveryTime="+deliveryTime+"&"+"paymentMethod="+paymentMethod}>
          Checkout 
        </Link> 
      </Form>
    </div>
  );
};

export default DeliveryPage;
