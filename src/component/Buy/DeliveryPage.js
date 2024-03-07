import { Form, Button, Card } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import CheckoutOrder from './CheckoutOrder';
import { FaCcVisa, FaCcMastercard, FaCcAmex } from 'react-icons/fa';

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

const DeliveryPage = () => {
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
    <div style={{ background: 'linear-gradient(to right, #ffffff, #154360)', minHeight: '100vh', color: '#000', padding: '60px', justifyContent: 'center', alignItems: 'center' }}>
  <div className="container">
    <h2 style={{ marginBottom: '60px', fontSize: '2.5rem', fontWeight: 'bold', textAlign: 'center' }}>Scelta dell'orario di consegna</h2>
    <Form>
      <Form.Group className="mb-3">
        <Form.Label style={{ fontSize: '1.2rem' }}>Orario di consegna</Form.Label>
        <Form.Control as="select" onChange={(e) => setDeliveryTime(e.target.value)} value={deliveryTime} style={{ marginBottom: '15px' }}>
          <option value="">Seleziona un orario</option>
          {availableTimes.map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label style={{ fontSize: '1.2rem' }}>Note</Form.Label>
        <Form.Control as="textarea" rows={3} onChange={(e) => setNotes(e.target.value)} value={notes} placeholder="Allergie, scale, citofono..." style={{ marginBottom: '15px' }} />
      </Form.Group>
      <Form.Group className="mb-3" style={{ position: 'relative' }}>
        <Form.Label style={{ fontSize: '1.2rem' }}>Payment Method</Form.Label>
        <div className="d-flex align-items-center justify-content-between">
          <Form.Control as="select" value={paymentMethod} onChange={(e) => setPayment(e.target.value)} style={{ marginBottom: '15px' }}>
            <option value="">Seleziona un metodo di pagamento</option>
            <option value="Visa">Visa</option>
            <option value="MasterCard">MasterCard</option>
            <option value="AmericanExpress">American Express</option>
          {paymentMethod === 'Visa' && (
            <FaCcVisa className="mt-2" size={20} />
          )}
          {paymentMethod === 'MasterCard' && (
            <FaCcMastercard className="mt-2" size={20} />
          )}
          {paymentMethod === 'AmericanExpress' && (
            <FaCcAmex className="mt-2" size={20} />
          )}
          </Form.Control>
        </div>
        <div className="d-flex justify-content-end">
          <Link className="btn btn-danger" to={`/checkout?notes=${notes}&deliveryTime=${deliveryTime}&paymentMethod=${paymentMethod}`}>
            Checkout
          </Link>
        </div>
      </Form.Group>
    </Form>
  </div>
</div>





  );
};

export default DeliveryPage;
