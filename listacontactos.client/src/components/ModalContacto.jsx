import React, { useEffect, useState } from "react";
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

function ModalContacto({
  mostrarModal,
  setMostrarModal,
  guardarContacto,
  editar,
  setEditar,
  editarContacto,
}) {
  //Tenemos el useState, el objeto arriba que define lo que es un contacto, entonces, el contacto, cada vez que se escriba
  //algo en algun input, mediante el metodo actualizarDato, se va a ir actualizando
  const [contacto, setContacto] = useState(modeloContacto);

  const actualizarDato = (e) => {
    console.log(e.target.name + " : " + e.target.value);
    setContacto({
      ...contacto,
      [e.target.name]: e.target.value,
    });
  };

  //Se ejecuta al final cuando se presiona en Guardar, y le envia a App el contacto nuevo
  const enviarDatos = () => {
    //Si el id del contacto es 0, es decir, es nuevo, xq el contacto originalmente recibe como definicion el objeto modeloContacto
    //entonces se llama a la funcion guardarContacto, y guarda un contacto nuevo
    if (contacto.idContacto == 0) {
      guardarContacto(contacto);
    } else {
      //en caso contrario, entonces llama a la funcion editarContacto, con el contacto actual, que va siendo actualizado
      //y lo guarda.
      editarContacto(contacto);
    }
    setContacto(modeloContacto);
  };

  //Cuando se cierra el modal hay que devolver editar a null
  const cerrarModal = () => {
    setMostrarModal(!mostrarModal);
    setEditar(null);
  };

  //creamos un useEffect() para que nada mas cargue el Modal, se muestre la información del contacto recibido (variable editar)
  useEffect(() => {
    if (editar != null) {
      setContacto(editar);
    } else {
      setContacto(modeloContacto);
    }
  }, [editar]);

  return (
    <Modal isOpen={mostrarModal}>
      <ModalHeader>
        {contacto.idContacto == 0 ? "Nuevo Contacto" : "Editar Contacto"}
      </ModalHeader>
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
        <Button color="danger" size="sm" onClick={cerrarModal}>
          Cerrar
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default ModalContacto;
