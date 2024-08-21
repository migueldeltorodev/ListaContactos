import React from "react";
import TableContactos from "./components/TableContactos";

import {
  Col,
  Container,
  Row,
  Card,
  CardHeader,
  Button,
  CardBody,
} from "reactstrap";

function App() {
  return (
    <Container>
      <Row className="mt-5">
        <Col sm="12">
          <Card>
            <CardHeader>
              <h5>Lista de Contactos:</h5>
            </CardHeader>
            <CardBody>
              <Button size="sm" color="success">
                Nuevo Contacto
              </Button>
              <hr></hr>
              <TableContactos></TableContactos>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
