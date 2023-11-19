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
