import React from "react";
import { Table, Button } from "reactstrap";

function TableContactos({
  data,
  setEditar,
  mostrarModal,
  setMostrarModal,
  eliminarContacto,
}) {
  //Esta funcion le envia los datos de un contacto en especifico al componente App. una vez es presionado el boton
  //Editar, primero actualiza el contacto con setEditar, que lo recibe desde App y luego mediante setMostrarModal hace que el modal
  //se muestre, ya que esta negando el false
  const enviarDatos = (contacto) => {
    setEditar(contacto);
    setMostrarModal(!mostrarModal);
  };

  return (
    /* Basicamente una tabla, todos son componentes de reactstrap, entonces reciben los datos de data, y mediante el .map
    los muestran uno a uno en cada fila    
    */
    <Table striped responsive>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Correo</th>
          <th>Telefono</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {data.length < 1 ? (
          <tr>
            <td colSpan="4">Sin registros</td>
          </tr>
        ) : (
          data.map((item) => (
            <tr key={item.idContacto}>
              <td>{item.nombre}</td>
              <td>{item.correo}</td>
              <td>{item.telefono}</td>
              <td>
                <Button
                  color="primary"
                  size="sm"
                  className="me-2"
                  onClick={() => enviarDatos(item)}
                >
                  Editar
                </Button>
                <Button
                  color="danger"
                  size="sm"
                  onClick={() => eliminarContacto(item.idContacto)}
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </Table>
  );
}

export default TableContactos;
