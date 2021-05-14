export function ejecutarPOST(materiaJSON, url, callback) {
  let peticionHttp = new XMLHttpRequest();

  peticionHttp.onreadystatechange = () => {
    if (peticionHttp.readyState === 4 && peticionHttp.status === 200) {
      let res = JSON.parse(peticionHttp.responseText);

      callback(res);
    }
  };

  peticionHttp.open("POST", url, true);

  let datosToString = JSON.stringify(materiaJSON);

  peticionHttp.setRequestHeader("Content-type", "application/json");

  peticionHttp.send(datosToString);
}

export function ejecutarGET(url, callback) {
  let peticionHttp = new XMLHttpRequest();

  peticionHttp.open("GET", url, true);

  peticionHttp.onreadystatechange = () => {
    
    if (peticionHttp.readyState === 4 && peticionHttp.status === 200) {
      let listadoMaterias = JSON.parse(peticionHttp.responseText);

      callback(listadoMaterias);
    }
  };
  peticionHttp.send();
}
