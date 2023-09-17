let nombre = prompt("Ingrese su nombre");

let apellido = prompt("Apellido?");

if (nombre && nombre) {
  console.log("Hola, " + nombre);
} else if (nombre != "") {
  console.log("Por favor, Ingrese su nombre");
} else {
  console.log("Por favor, Ingrese su nombre");
}

if (apellido && apellido) {
} else if (apellido != "") {
  console.log("Vuelva a ingresar su apellido");
} else {
  console.log("Vuelva a ingresar su apellido");
}

alert("Bienvenido, " + nombre + " " + apellido);

let documento = parseInt(
  prompt("Ahora su numero de documento para poder ingresar")
);

if (documento > 11111111) {
  console.log("Muchas gracias");
} else if (documento != "") {
  console.log("Vuelve a ingresar su documento");
} else {
  console.log("Vuelve a ingresar su documento");
}

console.log(documento);

// parte de calculo
//desea hacer la operacion en dolares o euros

let pesos = parseInt(prompt("Escriba el total en pesos que desea invertir"));

// pesos = 300.000

let dolarHoy = parseInt(prompt("Ingrese cuanto esta el dolar"));

// dolarHoy = 730

//let euroHoy = parseInt(prompt("Escriba a cuanto esta el euro hoy"));

//euroHoy = 800

let total = pesos * dolarHoy;

alert(pesos + " x " + dolarHoy + " = " + total);

//este es el total, desea comprar ?
//si / no
// si = este es el total
//no = Muchas gracias
