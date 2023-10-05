let nombre = prompt("Ingrese su nombre");

let apellido = prompt("Apellido?");

if (nombre.trim() === "") {
  alert("nombrenoválido");
}

if (nombre != "") {
  console.log("Hola, " + nombre);
} else {
  console.log("Por favor, Ingrese su nombre");
}

if (apellido != "") {
} else {
  console.log("Vuelva a ingresar su apellido");
}

alert(
  "Bienvenido, " +
    nombre +
    " " +
    apellido +
    " , esta ingresando a el banco Money. "
);

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

let pesos = parseInt(prompt("Escriba el total en pesos que desea invertir"));

let dolarHoy = parseInt(prompt("Ingrese cuanto esta el dolar"));

let total = pesos * dolarHoy;

let inversion = confirm(" El total es, " + total + " queres comprar? ");

if (inversion == true) {
  let transaccion = prompt(
    " donde desea que el dinero sea depositado?, Cuenta bancaria, efectivo o plazo fijo"
  );

  switch (transaccion) {
    case "cuenta bancaria":
      alert(
        "lo esperamos entre el dia 10 y 15 a partir de las 10 hs hasta las 20hs para confirmar esta transaccion, gracias por confiar en banco Money"
      );
      break;

    case "efectivo":
      alert(
        "su dinero puede ser transferido dentro de 48hs, gracias por confiar en banco Money"
      );
      break;

    case "plazo fijo":
      alert(
        "el dinero sera ingresado a un nuevo plazo fijo, para confirmar esta accion y programar la cantidad de dias ingrese en el link que enviamos a su Gmail, gracias por confiar en banco Money"
      );

    default:
      alert(
        "No tenemos disponible esa opcion, para cualquier consulta llame al 0800-111-5050, gracias"
      );
  }
}

const usuarioJefe = {
  nombre: "Rafael",
  apellido: "Rossi",
  Trabajo: "Guardavidas",
  saldo: 200000,
};

class usuario {
  constructor(nombre, apellido, trabajo, saldo) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.trabajo = trabajo;
    this.saldo = saldo;
  }
}

const usuario1 = new usuario("Marcelo", "Rossi", "Guardavidas", 700000);
const usuario2 = new usuario("Nahir", "Gomez", "Abogada", 200000);
const usuario3 = new usuario("Esteban", "Garcia", "", 30000);

console.log(usuario3.saldo);

if ("saldo" in usuario3) {
  saldo <= 30000;
} else {
  ("No hay saldo suficiente para comprar");
}
if (saldo > 30000) {
} else {
  ("Que moneda desea comprar?");
}

if ("trabajo" in usuario3) {
  console.log(usuario3.trabajo);
} else {
  ("No tiene trabajo, de lo contrario comunicarse con personal. Muchas gracias");
}

console.log(usuario3.trabajo);
