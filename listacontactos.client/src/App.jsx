import React, { useEffect, useState } from "react";
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
  const [contactos, setContactos] = useState([]);

  const mostrarContactos = async () => {
    const response = await fetch("/api/contacto/lista");
    if (response.ok) {
      const data = await response.json();
      setContactos(data);
    } else {
      console.log("error en la lista");
    }
  };

  useEffect(() => {
    mostrarContactos();
  }, []);

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
              <TableContactos data={contactos} />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
