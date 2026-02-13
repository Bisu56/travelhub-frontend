import React from 'react';
import { Container } from 'react-bootstrap';

function Cars() {
  return (
    <div className="page">
      <Container>
        <h1 className="text-center my-5">Cars</h1>
        <p className="text-center lead">
          This is the page for cars. You can rent cars easily.
        </p>
      </Container>
    </div>
  );
}

export default Cars;
