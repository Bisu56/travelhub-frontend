import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="page">
      <div className="hero">
        <h1 className="display-3">Welcome to TravelHub</h1>
        <p className="lead">Book flights, tours (Nepal & UAE), hotels, and cars all in one place!</p>
      </div>

      <Container fluid className="my-5">
        <Row>
          <Col md={3}>
            <Card className="card">
              <Card.Body className="text-center">
                <Card.Title>✈️ Flights</Card.Title>
                <Card.Text>Find cheap flights worldwide</Card.Text>
                <Button as={Link} to="/flights" variant="primary">Book Now</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="card">
              <Card.Body className="text-center">
                <Card.Title>🗺️ Tours</Card.Title>
                <Card.Text>Amazing packages for Nepal, UAE & more</Card.Text>
                <Button as={Link} to="/tours" variant="primary">Explore</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="card">
              <Card.Body className="text-center">
                <Card.Title>🏨 Hotels</Card.Title>
                <Card.Text>Comfortable stays anywhere</Card.Text>
                <Button as={Link} to="/hotels" variant="primary">Book Stay</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="card">
              <Card.Body className="text-center">
                <Card.Title>🚗 Cars</Card.Title>
                <Card.Text>Rent cars easily</Card.Text>
                <Button as={Link} to="/cars" variant="primary">Rent Now</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;