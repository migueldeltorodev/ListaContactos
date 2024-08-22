import React, { useState } from "react";
import {
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Button,
} from "reactstrap";

const modeloContacto = {
  idContacto: 0,
  nombre: "",
  correo: "",
  telefono: "",
};

function ModalContacto({ mostrarModal, setMostrarModal, guardarContacto }) {
  const [contacto, setContacto] = useState(modeloContacto);

  const actualizarDato = (e) => {
    console.log(e.target.name + " : " + e.target.value);
    setContacto({
      ...contacto,
      [e.target.name]: e.target.value,
    });
  };

  const enviarDatos = () => {
    if (contacto.idContacto == 0) {
      guardarContacto(contacto);
    }
  };

  return (
    <Modal isOpen={mostrarModal}>
      <ModalHeader>Nuevo Contacto</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label>Nombre</Label>
            <Input
              name="nombre"
              onChange={(e) => actualizarDato(e)}
              value={contacto.nombre}
            />
          </FormGroup>
          <FormGroup>
            <Label>Correo Electrónico</Label>
            <Input
              name="correo"
              onChange={(e) => actualizarDato(e)}
              value={contacto.correo}
            />
          </FormGroup>
          <FormGroup>
            <Label>Teléfono</Label>
            <Input
              name="telefono"
              onChange={(e) => actualizarDato(e)}
              value={contacto.telefono}
            />
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" size="sm" onClick={enviarDatos}>
          Guardar
        </Button>
        <Button
          color="danger"
          size="sm"
          onClick={() => setMostrarModal(!mostrarModal)}
        >
          Cerrar
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default ModalContacto;
