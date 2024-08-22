import React, { useEffect, useState } from "react";
import TableContactos from "./components/TableContactos";
import ModalContacto from "./components/ModalContacto";

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
  const [mostrarModal, setMostrarModal] = useState(false);

  const mostrarContactos = async () => {
    const response = await fetch("/api/contacto/lista");
    if (response.ok) {
      const data = await response.json();
      setContactos(data);
    } else {
      console.log("error en la lista");
    }
  };

  const guardarContacto = async (contacto) => {
    const response = await fetch("api/contacto/guardar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(contacto),
    });
    if (response.ok) {
      setMostrarModal(!mostrarModal);
      mostrarContactos();
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
              <Button
                size="sm"
                color="success"
                onClick={() => setMostrarModal(!mostrarModal)}
              >
                Nuevo Contacto
              </Button>
              <hr></hr>
              <TableContactos data={contactos} />
            </CardBody>
          </Card>
        </Col>
      </Row>
      <ModalContacto
        mostrarModal={mostrarModal}
        setMostrarModal={setMostrarModal}
        guardarContacto={guardarContacto}
      />
    </Container>
  );
}

export default App;
