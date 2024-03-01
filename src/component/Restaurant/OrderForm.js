import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const OrderForm = () => {
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [deliveryTime, setDeliveryTime] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    // Effetto per eseguire azioni quando l'orario di consegna cambia
    console.log('Orario di consegna selezionato:', deliveryTime);
  }, [deliveryTime]);

  const handleItemNameChange = (e) => {
    setItemName(e.target.value);
  };

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10);
    setQuantity(isNaN(newQuantity) ? 1 : newQuantity);
  };

  const calculateTotalPrice = () => {
    const unitPrice = 10;
    const newTotalPrice = quantity * unitPrice;
    setTotalPrice(newTotalPrice);
  };

  const handleDeliveryTimeChange = (e) => {
    setDeliveryTime(e.target.value);
  };

  const handleNotesChange = (e) => {
    setNotes(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    console.log('Riepilogo ordine:', { itemName, quantity, totalPrice, deliveryTime, notes });
  };

  
  const userDistance = 3;


  const deliveryInterval = 15;

 
  const calculateDeliveryTimes = () => {
    const now = new Date();
    const currentTime = now.getTime() + userDistance * 2 * 60 * 1000;
    const roundedTime = Math.ceil(currentTime / (deliveryInterval * 60 * 1000)) * (deliveryInterval * 60 * 1000);

    const availableTimes = [];
    for (let i = roundedTime; i < roundedTime + 24 * 60 * 60 * 1000; i += deliveryInterval * 60 * 1000) {
      const time = new Date(i);
      availableTimes.push(`${time.getHours()}:${('0' + time.getMinutes()).slice(-2)}`);
    }

    return availableTimes;
  };

  const deliveryTimes = calculateDeliveryTimes();

  return (
    <Container>
      <h2 className="mt-4 mb-4">Riepilogo d'ordine</h2>
      <Form onSubmit={handleSubmit}>
     
        <Row className="mb-3">
          <Form.Group as={Col} controlId="deliveryTime">
            <Form.Label>Orario di consegna:</Form.Label>
            <Form.Control as="select" value={deliveryTime} onChange={handleDeliveryTimeChange}>
              <option value="">Seleziona un orario</option>
              {deliveryTimes.map((time, index) => (
                <option key={index} value={time}>
                  {time}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="notes">
            <Form.Label>Note:</Form.Label>
            <Form.Control as="textarea" value={notes} onChange={handleNotesChange} />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Col>
            <Button variant="success" type="submit">
              Invia ordine
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default OrderForm;
