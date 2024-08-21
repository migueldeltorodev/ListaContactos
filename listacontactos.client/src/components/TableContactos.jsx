import React from "react";
import { Table } from "reactstrap";

function TableContactos() {
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
      <tbody></tbody>
    </Table>
  );
}

export default TableContactos;
