import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <Container>
      <h1 className="text-center my-5">Welcome to TravelHub</h1>
      <p className="text-center lead">Book flights, tours (Nepal & UAE), hotels, and cars all in one place!</p>

      <Row className="my-5">
        <Col md={3}>
          <Card>
            <Card.Body className="text-center">
              <Card.Title>✈️ Flights</Card.Title>
              <Card.Text>Find cheap flights worldwide</Card.Text>
              <Button as={Link} to="/flights" variant="primary">Book Now</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Body className="text-center">
              <Card.Title>🗺️ Tours</Card.Title>
              <Card.Text>Amazing packages for Nepal, UAE & more</Card.Text>
              <Button as={Link} to="/tours" variant="primary">Explore</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Body className="text-center">
              <Card.Title>🏨 Hotels</Card.Title>
              <Card.Text>Comfortable stays anywhere</Card.Text>
              <Button as={Link} to="/hotels" variant="primary">Book Stay</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Body className="text-center">
              <Card.Title>🚗 Cars</Card.Title>
              <Card.Text>Rent cars easily</Card.Text>
              <Button as={Link} to="/cars" variant="primary">Rent Now</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;