import React from "react";
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

function RegisterAlert({onClose}) {
  return (
    <Container fluid>
      <Row className="text-center justify-content-center mt-0">
        <Alert className="text-center alert alert-success my-auto py-3" onClose={onClose} dismissible>
          <h5 className="alert-text">Lead cadastrado com sucesso!</h5>
        </Alert>
      </Row>
    </Container>
  )
}

export default RegisterAlert