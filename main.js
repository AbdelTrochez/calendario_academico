// Valores para actividad
// Clases, Feriado, Examenes, Recuperaciones, Charlas, Practica

const tabla = document.querySelector("#tabla");

fetch("calendario.json")
  .then(response => response.json())
  .then(json => {
    json.forEach(data => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${data.semana}</td>
        <td>${data.inicio}</td>
        <td>${data.fin}</td>
        <td>${data.actividad}</td>
        <td></td>
      `;

      // Aplicar estilos según el valor de la actividad
      switch(data.actividad) {
        case "Examenes":
          row.classList.add("table-warning");
          break;
        case "Feriado":
          row.classList.add("table-dark");
          row.classList.add("text-light");
          break;
        case "Recuperaciones":
          row.classList.add("table-danger");
          break;
        case "Charlas":
          row.classList.add("table-success");
          break;
        case "Practica":
          row.classList.add("table-info");
          break;
        default:
          break;
      }

      // Aplicar estilos según la fecha actual y las fechas del evento
      const hoy = new Date();
      const inicio = new Date(data.inicio.split("/").reverse().join("-"));
      const fin = new Date(data.fin.split("/").reverse().join("-"));
      if (fin <= hoy) {
        row.querySelector("td:last-child").classList.add("bg-success");
      } else if (inicio <= hoy && fin > hoy) {
        row.querySelector("td:last-child").classList.add("bg-primary");
      }

      tabla.appendChild(row);
    });
  })
  .catch(error => console.log(error));
