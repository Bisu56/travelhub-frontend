import React, { useState } from 'react';
import { Form, Button, ListGroup, Alert, Container } from 'react-bootstrap';
import axios from 'axios';

function Flights() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Change this URL later to your Django backend
      const response = await axios.get('http://localhost:8000/api/flights/', {
        params: { from, to, date }
      });
      setFlights(response.data);
    } catch (error) {
      alert('No flights found or server error. For now, try dummy data.');
      // Dummy data for testing
      setFlights([
        { id: 1, airline: 'Nepal Airlines', from: 'Kathmandu', to: 'Dubai', price: 450, date: date }
      ]);
    }
    setLoading(false);
  };

  return (
    <div className="page">
      <Container>
        <h2 className="text-center my-5">Search Flights</h2>
        <Form onSubmit={handleSearch}>
          <Form.Group className="mb-3">
            <Form.Label>From</Form.Label>
            <Form.Control type="text" value={from} onChange={(e) => setFrom(e.target.value)} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>To</Form.Label>
            <Form.Control type="text" value={to} onChange={(e) => setTo(e.target.value)} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Date</Form.Label>
            <Form.Control type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
          </Form.Group>
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? 'Searching...' : 'Search Flights'}
          </Button>
        </Form>

        {flights.length > 0 && (
          <>
            <h3 className="mt-5">Available Flights</h3>
            <ListGroup>
              {flights.map((flight) => (
                <ListGroup.Item key={flight.id}>
                  <strong>{flight.airline}</strong> → {flight.from} to {flight.to} on {flight.date || date}
                  <span className="float-end">
                    <strong>${flight.price}</strong>
                    <Button variant="success" size="sm" className="ms-3">Book Now</Button>
                  </span>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </>
        )}
      </Container>
    </div>
  );
}

export default Flights;