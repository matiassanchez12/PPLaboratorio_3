import { ejecutarGET, ejecutarPOST } from "./apiMaterias.js";

let bodyTabla = document.getElementById("bodytabla");
// let modal = document.getElementById("modal");

window.addEventListener("unload", cargarListadoMaterias());

function cargarListadoMaterias() {
  let arrayMaterias = [];

  ejecutarGET("http://localhost:3000/materias", (auxMaterias) => {
    arrayMaterias = auxMaterias;

    if (arrayMaterias != null) {
      arrayMaterias.forEach((materia) => {
        agregarMateria(materia);
      });
    }
  });
}

function agregarMateria(materia) {
  if (materia != null) {
    let newRow = document.createElement("tr");

    newRow
      .appendChild(document.createElement("td"))
      .appendChild(document.createTextNode(materia.id));

    newRow
      .appendChild(document.createElement("td"))
      .appendChild(document.createTextNode(materia.nombre));

    newRow
      .appendChild(document.createElement("td"))
      .appendChild(document.createTextNode(materia.cuatrimestre));

    newRow
      .appendChild(document.createElement("td"))
      .appendChild(document.createTextNode(materia.fechaFinal));

    newRow
      .appendChild(document.createElement("td"))
      .appendChild(document.createTextNode(materia.turno));

    // newRow.addEventListener("dblclick", mostrarModal);

    bodyTabla.appendChild(newRow);
  }
}
