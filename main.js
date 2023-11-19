const stockmanager = function (item, nombre, marca, stock, precio) {
  this.item = item;
  this.nombre = nombre;
  this.marca = marca;
  this.stock = stock;
  this.precio = precio;
  this.lugar = lugar;
  this.observacion = observacion;
};

const formModal = document.getElementById("modal-container");
const closeFormButton = document.getElementById("cerrar-modal");

let list = new stockmanager(
  "ID",
  "Nombre",
  "Marca",
  "Stock",
  "Precio",
  "Lugar",
  "Observación"
);

let bien1 = new stockmanager(0, "", "", "", "", "", "");
let inventario = [];

inventario.push(bien1);
const nombreUsuario = sessionStorage.getItem("nombreUsuario");
const nombreUsuarioDiv = document.getElementById("nombreUsuarioDiv");

const formatUsuario = (nombreUsuario) => {
  return new Promise((resolve, reject) => {
    if (nombreUsuario) {
      const usuarioFormateado =
        nombreUsuario.charAt(0).toUpperCase() + nombreUsuario.slice(1);
      resolve(usuarioFormateado);
    } else {
      reject(mostrarMensajeInicioSesion);
    }
  });
};

const mostrarMensajeInicioSesion = () => {
  nombreUsuarioDiv.innerHTML = `
    <div class="divusuario">
      No has iniciado sesión.
    </div>
    <div>
      <p><a href="index.html">Inicia sesión</a></p>
    </div>
  `;
};

formatUsuario(nombreUsuario)
  .then((usuarioFormateado) => {
    nombreUsuarioDiv.innerHTML = `
      <div>
        <img src="img/user.png" alt="Logo" width=20px>
      </div>
      <div>
        Bienvenido, ${usuarioFormateado}
      </div>
      <div class="salirsesion">
        <img src="img/salir.png" alt="Logo" width=20px class="salir-imagen"><div class="textosalir">Cerrar sesion</div>
      </div>
    `;

    const salirImagen = document.querySelector(".salir-imagen");
    salirImagen.addEventListener("click", () => {
      sessionStorage.removeItem("nombreUsuario");
      mostrarMensajeInicioSesion();
    });
  })
  .catch((error) => {
    mostrarMensajeInicioSesion();
    console.error(error);
  });

function obtenerInventario() {
  return new Promise((resolve, reject) => {
    if (inventario.length > 0) {
      const datos = localStorage.getItem("StockManager");

      if (datos !== null && datos !== undefined) {
        const bienesEnLocalStorage = JSON.parse(datos);
        inventario = bienesEnLocalStorage;
        resolve(inventario);
      } else {
        reject("No se encontraron datos en el almacenamiento local.");
      }
    } else {
      reject("El inventario está vacío.");
    }
  });
}

obtenerInventario()
  .then((inventarioActualizado) => {
    Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 4000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    }).fire({
      icon: "success",
      title: "Datos cargados correctamente",
    });
  })
  .catch((error) => {
    Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 4000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    }).fire({
      icon: "error",
      title: "Error al cargar datos",
    });
  });

const filtrarBtn = document.getElementById("filtrar");
filtrarBtn.addEventListener("click", () => {
  filtrarInventario();
});

const panelBtn = document.getElementById("panel");
panelBtn.addEventListener("click", () => {
  panel();
});

const agregarBtn = document.getElementById("agregar");
agregarBtn.addEventListener("click", () => {
  formModal.style.display = "block";
  agregarProducto();
});

const mostrarInventario = document.getElementById("mostrarinv");
mostrarInventario.addEventListener("click", () => {
  mostrarInv();
});

function mostrarInv() {
  const div1 = document.getElementById("div1");
  div1.innerHTML = "";
  const resultadoTable = document.getElementById("resultado");
  resultadoTable.innerHTML = "";
  const newRow = resultadoTable.insertRow();
  if (inventario.length === 1) {
    Swal.fire({
      icon: "error",
      title: "No hay items en Inventario",
      text: "Ingrese nuevo producto",
    });
  }

  if (inventario.length > 0) {
    for (let x in list) {
      const celda = newRow.insertCell();
      celda.textContent = list[x];
    }
  }
}

inventario.forEach((producto, index) => {
  if (producto.item > 0) {
    const row = resultadoTable.insertRow();
    const itemCell = row.insertCell(0);
    const nombreCell = row.insertCell(1);
    const marcaCell = row.insertCell(2);
    const stockCell = row.insertCell(3);
    const precioCell = row.insertCell(4);
    const lugarCell = row.insertCell(5);
    const observacionCell = row.insertCell(6);
    const eliminarCell = row.insertCell(7);

    itemCell.textContent = producto.item;
    nombreCell.textContent = producto.nombre;
    marcaCell.textContent = producto.marca;
    stockCell.textContent = producto.stock;
    precioCell.textContent = producto.precio;
    lugarCell.textContent = producto.lugar;
    observacionCell.textContent = producto.observacion;

    const eliminarButton = document.createElement("button");
    eliminarButton.classList.add("elimBtn");
    const modificarButton = document.createElement("button");
    modificarButton.classList.add("modBtn");
    eliminarButton.textContent = "Eliminar";
    modificarButton.textContent = "Modificar";

    eliminarButton.addEventListener("click", () => {
      resultadoTable.deleteRow(row.rowIndex);
      inventario.splice(index, 1);
      localStorage.setItem("StockManager", JSON.stringify(inventario));
    });

    modificarButton.addEventListener("click", () => {
      Swal.fire({
        title: "Modificar Producto",
        html: `
    <div><label for="nombre">Nombre Inmueble: </label>
    <input id="nombre" type="text" required value="${producto.nombre}">
   </div> <br>
    <div><label for="marca">Marca:</label>
    <input id="marca" type="text" required value="${producto.marca}"></div>
    <br>
   <div> <label for="stock">Stock:</label>
    <input id="stock" type="number" step="1" required value="${producto.stock}"></div>
    <br>
   <div> <label for="precio">Precio:</label>
    <input id="precio" type="number" step="1" required value="${producto.precio}"></div>
    <br>
   <div> <label for="lugar">Lugar:</label>
    <input id="lugar" type="text" required value="${producto.lugar}"></div>
    <br>
   <div>  <label for="observacion">Observación:</label>
    <textarea id="observacion" rows="2" style="resize: none;" required value="${producto.observacion}"></textarea></div>
    <br>
    `,
        showCancelButton: true,
        confirmButtonText: "Aceptar",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          const newNombre = document.getElementById("nombre").value;
          const newMarca = document.getElementById("marca").value;
          const newStock = document.getElementById("stock").value;
          const newPrecio = document.getElementById("precio").value;
          const newLugar = document.getElementById("lugar").value;
          const newObservacion = document.getElementById("observacion").value;

          producto.nombre = newNombre;
          producto.marca = newMarca;
          producto.stock = newStock;
          producto.precio = newPrecio;
          producto.lugar = newLugar;
          producto.observacion = newObservacion;

          nombreCell.textContent = newNombre;
          marcaCell.textContent = newMarca;
          stockCell.textContent = newStock;
          precioCell.textContent = newPrecio;
          lugarCell.textContent = newLugar;
          observacionCell.textContent = newObservacion;

          localStorage.setItem("StockManager", JSON.stringify(inventario));
        }
      });
    });
    eliminarCell.appendChild(eliminarButton);
    eliminarCell.appendChild(modificarButton);
  }
});

let x = 10;
let y = 20;

const columnWidths = [12, 27, 27, 27, 27, 27, 30];
const fontSize = 8;

let headers = Object.keys(inventario[0]);
headers.forEach((header, i) => {
  doc.setFontSize(10);
  doc.rect(x, y, columnWidths[i], 10);
  doc.text(header, x + 2, y + 6);
  x += columnWidths[i];
});

x = 10;
y += 10;
doc.setFontSize(fontSize);

inventario.slice(1).forEach((id) => {
  Object.values(id).forEach((cell, i) => {
    doc.rect(x, y, columnWidths[i], 10);
    doc.text(cell.toString(), x + 2, y + 6);
    x += columnWidths[i];
  });
  x = 10;
  y += 10;
});

function filtrarInventario() {
  const input = document.getElementById("filtrarP").value;
  const palabraClave = input.trim().toUpperCase();
  const resultado = inventario.filter((producto) =>
    producto.nombre.toUpperCase().includes(palabraClave)
  );
  console.log(resultado);
  const div1 = document.getElementById("div1");
  div1.innerHTML = "";
  const resultadoTable = document.getElementById("resultado");
  resultadoTable.innerHTML = "";
  const newRow = resultadoTable.insertRow();

  if (inventario.length > 0) {
    if (input === "") {
      Swal.fire({
        icon: "warning",
        title: "Ingrese valores",
      });

      return;
    }
    for (let x in list) {
      const celda = newRow.insertCell();
      celda.textContent = list[x];
    }
    resultado.forEach((producto) => {
      if (producto.item > 0) {
        const row = resultadoTable.insertRow();
        const itemCell = row.insertCell(0);
        const nombreCell = row.insertCell(1);
        const marcaCell = row.insertCell(2);
        const stockCell = row.insertCell(3);
        const precioCell = row.insertCell(4);
        const lugarCell = row.insertCell(5);
        const observacionCell = row.insertCell(6);

        itemCell.textContent = producto.item;
        nombreCell.textContent = producto.nombre;
        marcaCell.textContent = producto.marca;
        stockCell.textContent = producto.stock;
        precioCell.textContent = producto.precio;
        lugarCell.textContent = producto.lugar;
        observacionCell.textContent = producto.observacion;
      }
    });
  } else {
    Swal.fire({
      icon: "warning",
      title: "No se encuentran coincidencias",
    });
  }
}

function agregarProducto() {
  let ultimoItem = inventario[inventario.length - 1].item;
  let itemInput = ultimoItem + 1;

  closeFormButton.addEventListener("click", () => {
    formModal.style.display = "none";
    form.remove();
  });
  const resultado = document.getElementById("resultado");
  resultado.innerHTML = "";
  const form = document.createElement("form");
  form.innerHTML = `
  <div class="addlabel"><label for="nombre-input">Nombre Inmueble: </label>
  <input id="nombre-input" type="text" required>
 </div> <br>
  <div class="addlabel"><label for="marca-input">Marca: </label>
  <input id="marca-input" type="text" required></div>
  <br>
 <div class="addlabel"> <label for="stock-input">Stock: </label>
  <input id="stock-input" type="number" step="1" required></div>
  <br>
 <div class="addlabel"> <label for="precio-input">Precio: </label>
  <input id="precio-input" type="number" step="1" required></div>
  <br>
 <div class="addlabel"> <label for="lugar-input">Lugar: </label>
  <input id="lugar-input" type="text" required></div>
  <br>
 <div class="addlabel">  <label for="observacion-input">Observación: </label>
  <input id="observacion-input" rows="2" style="resize: none;" required></div>
  <br>
 <button type="submit">Agregar</button>
  <button id="cancelar">Cancelar</button>
`;
  const div1 = document.querySelector(".modal-content");
  div1.appendChild(form);

  const cancelarBtn = document.getElementById("cancelar");
  cancelarBtn.addEventListener("click", function (event) {
    event.preventDefault;

    formModal.style.display = "none";
    form.remove();
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const nombreInput = document.getElementById("nombre-input").value.trim();
    const marcaInput = document.getElementById("marca-input").value.trim();
    const precioInput = parseFloat(
      document.getElementById("precio-input").value
    );
    const stockInput = parseInt(document.getElementById("stock-input").value);
    const lugarInput = document.getElementById("lugar-input").value.trim();
    const observacionInput = document
      .getElementById("observacion-input")
      .value.trim();

    if (
      isNaN(precioInput) ||
      isNaN(stockInput) ||
      stockInput <= 0 ||
      precioInput <= 0 ||
      nombreInput === "" ||
      marcaInput === "" ||
      lugarInput === "" ||
      observacionInput === ""
    ) {
      Swal.fire({
        icon: "error",
        title: "Porfavor ingresa valores validos",
      });
      return;
    }
  });

  const producto = new Inmueble(
    itemInput,
    nombreInput,
    marcaInput,
    stockInput,
    precioInput,
    lugarInput,
    observacionInput
  );

  if (inventario.some((elemento) => elemento.nombre === producto.nombre)) {
    Swal.fire({
      icon: "error",
      title: "El producto ya existe en la lista",
    });
    return;
  }

  inventario.push(producto);

  localStorage.setItem("Inmueble", JSON.stringify(inventario));

  Swal.fire({
    icon: "success",
    title: `Se ha agregado el producto "${producto.nombre}" a la lista.`,
  });
}
