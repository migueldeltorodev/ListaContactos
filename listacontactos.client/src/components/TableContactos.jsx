import React from "react";
import { Table, Button } from "reactstrap";

function TableContactos({ data }) {
  return (
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
                <Button color="primary" size="sm" className="me-2">
                  Editar
                </Button>
                <Button color="danger" size="sm">
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
