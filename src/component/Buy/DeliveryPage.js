import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import Cart from '../Cart/Cart';

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
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const availableTimes = calculateAvailableTimes();

  // Gestore della conferma dell'ordine
  const handleConfirmDelivery = () => {
    // Implementa la logica per confermare l'orario di consegna e passare alla pagina successiva
    console.log('Confermato orario di consegna:', deliveryTime);
    console.log('Note:', notes);

    // Esempio di aggiunta di un ordine al carrello quando viene confermato l'ordine
    // addToCart({ deliveryTime, notes });

    // Segna l'ordine come confermato
    setOrderConfirmed(true);
  };

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
                {time}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Note</Form.Label>
          <Form.Control as="textarea" rows={3} onChange={(e) => setNotes(e.target.value)} value={notes} />
        </Form.Group>
        <Button variant="primary" onClick={handleConfirmDelivery}>
          PAGA ORA
        </Button>
      </Form>
      
      {/* Visualizza il riepilogo dell'ordine solo se è stato confermato */}
      {orderConfirmed && (
        <Card className="mt-4">
          <Card.Header>Riepilogo Ordine</Card.Header>
          <Card.Body>
            <Cart />
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default DeliveryPage;
