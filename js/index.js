import { ejecutarGET, ejecutarPOST } from "./apiMaterias.js";

let bodyTabla = document.getElementById("bodytabla");
let modal = document.getElementById("modal");
let btnCerrarModal = document.getElementById("btncerrar");
let btnModificar = document.getElementById('btnModificar');

window.addEventListener("unload", cargarListadoMaterias());

btnModificar.addEventListener('click', modificarMateria);
btnCerrarModal.addEventListener("click", cerrarModal);

// document
//   .getElementById("btnEliminar")
//   .addEventListener("click", eliminarPersona);

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

    newRow.addEventListener("dblclick", mostrarModal);

    bodyTabla.appendChild(newRow);
  }
}

function mostrarModal(e) {
  let fila = e.target.parentNode;

  let id = document.getElementById("id");
  let nombre = document.getElementById("nombre");
  let cuatrimestre = document.getElementById(fila.childNodes[2].innerHTML);
  let fechaFinal = document.getElementById("fechaFinal");
  let turno = document.getElementById(fila.childNodes[4].innerHTML);

  //abro modal
  modal.setAttribute("style", "display: flex");
  //cargo form
  id.value = fila.childNodes[0].innerHTML;
  nombre.value = fila.childNodes[1].innerHTML;
  cuatrimestre.selected = true;
  fechaFinal.value = fila.childNodes[3].innerHTML;
  turno.checked = true;
}

function cerrarModal() {
  modal.setAttribute("style", "display: none");
}

function modificarMateria() {
  let id = document.getElementById("id");
  let cuatrimestre = document.getElementById("cuatrimestre");
  let nombre = document.getElementById("nombre");
  let fechaFinal = document.getElementById("fechaFinal");
  let turno = validarTurno(document.getElementsByName("turno"));

  var timestamp = Date.parse('foo');

  if (validarDatos(nombre.value, fechaFinal.value, turno)) {

    let auxMateria = {
      id : id.value,
      nombre: nombre.value,
      cuatrimestre : cuatrimestre.value,
      fechaFinal: fechaFinal.value,
      turno: turno,
    };

    validarDatosOk();

    isLoading(true);

    ejecutarPOST(auxMateria, "http://localhost:3000/editar", (respuesta) => {

    if (respuesta.type == "ok") {
        actualizarListado(auxMateria, true);

        isLoading(false);

        cerrarModal();
      } else {
        alert("error en el backend");
      }
    });
  }else{
      alert('error en el form');
  }
}

function actualizarListado(auxMateria, update) {
  let filas = bodyTabla.children;

  for (let index = 0; index < filas.length; index++) {
    let elemento = filas[index];

    let idMateria = elemento.childNodes[0].innerHTML;

    if (auxMateria.id === idMateria) {
      if (update == true) {
        elemento.childNodes[1].innerHTML = auxMateria.nombre;
        elemento.childNodes[3].innerHTML = auxMateria.fechaFinal;
        elemento.childNodes[4].innerHTML = auxMateria.turno;
      } else {
        bodyTabla.removeChild(elemento);
      }

      return true;
    }
  }
  return false;
}

function validarDatos(nombre, fecha, turno) {
  if (nombre.length < 6) {
    document.getElementById("nombre").classList.add("input-danger");
    return false;
  }

  var d = Date.parse('14-05-2021', "Y-m-d");
  console.log(d);

  if (fecha > '14-05-2021') {
    document.getElementById("fechaFinal").classList.add("input-danger");
    return false;
  }

  if (turno === null) {
    document.getElementById("turno").classList.add("input-danger");
    return false;
  }
  return true;
}

function validarDatosOk() {
  document.getElementById("nombre").classList.remove("input-danger");
  document.getElementById("fechaFinal").classList.remove("input-danger");
  document.getElementById("turno").classList.remove("input-danger");
}

function isLoading(estado) {
  let spinner = document.getElementById("cover-spin");

  if (estado === true) {
    spinner.setAttribute("style", "display: block");
  } else {
    spinner.setAttribute("style", "display: none");
  }
}

function validarTurno(turno) {
    if (turno[0].checked === true) {
      return turno[0].value;
    } else {
      return turno[1].value;
    }
  }