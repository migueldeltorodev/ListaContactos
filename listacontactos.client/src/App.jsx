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
  const [contactos, setContactos] = useState([]); //variable que almacena los datos de la lista de contactos
  const [mostrarModal, setMostrarModal] = useState(false); //variable que es booleana para decidir si se muestra o no el Modal
  const [editar, setEditar] = useState(null); //variable que almacena la info de un contacto que puede ser editado

  //funcion primaria del CRUD de mostrar, donde se accede al endpoint de mostrar la lista y actualiza la variable contactos
  //con los valores que devuelve este endpoint/controller
  const mostrarContactos = async () => {
    const response = await fetch("/api/contacto/lista");
    if (response.ok) {
      const data = await response.json();
      setContactos(data);
    } else {
      console.log("error en la lista");
    }
  };

  //Esta funcion recibe un objeto contacto desde el Modal, el cual, mediante el controller guardar lo almacena en la base de datos
  //luego hace llamado al metodo mostrarContactos() para actualizar los contactos que se ven
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

  //metodo que recibe tambien un contacto desde el Modal y utiliza el controller de editar para realizar exactamente lo mismo que
  //el metodo de guardarContacto()
  const editarContacto = async (contacto) => {
    const response = await fetch("api/contacto/editar", {
      method: "PUT",
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

  //El hook principal de la aplicación que hace que el componente App se re-renderice cada vez que ocurre un cambio basicamente
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
              {/* Este componente de Button mediante el evento onClick recibe la funcion setMostrarModal y niega el que ya este
              es decir, si esta en false, lo pone en true, en ese caso, haría que el Modal apareciera en pantalla mediante el
              useState 
               */}
              <Button
                size="sm"
                color="success"
                onClick={() => setMostrarModal(!mostrarModal)}
              >
                Nuevo Contacto
              </Button>
              <hr></hr>
              {/* La tabla recibe primero que todo, todos los contactos, en su parametro data
              recibe el setEditar para que si el usuario presiona en Editar, este llame a un metodo que le manda a SetEditar el contacto 
              a editar, entonces como desde App se envió el metodo, el metodo de aqui tambien es llamado allá (es decir, el setEditar de aqui
              se pasa como referencia y entonces si es llamado allá, es como si fuera llamado aqui tambien)
              recibe el mostrarModal porque si presionan el boton Editar alla, la funcion hace que se muestre el modal mediante el metodo
              setMostrarModal que niega el mostrarModal que esté actualmente */}
              <TableContactos
                data={contactos}
                setEditar={setEditar}
                mostrarModal={mostrarModal}
                setMostrarModal={setMostrarModal}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
      <ModalContacto
        /* obviamente recibe el mostrarModal para manipular el atributo isOpen
      recibe como referencia setMostralModal, para cuando se culmine la tarea devolver el mostrarModal a false
      recibe guardarContacto la funcion, por referencia para cuando decida tocar en Guardar, se envien los datos de ese contacto (objeto)
      
      */
        mostrarModal={mostrarModal}
        setMostrarModal={setMostrarModal}
        guardarContacto={guardarContacto}
        editar={editar}
        setEditar={setEditar}
        editarContacto={editarContacto}
      />
    </Container>
  );
}

export default App;
