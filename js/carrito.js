
let carrito = cargarCarrito();


let sectionCelulares = document.getElementById("section-celular");
let sectionCarrito = document.getElementById("section-carrito");


let totalCompra = document.createElement("div");
totalCompra.innerHTML = "<h2>Total: $</h2>";
sectionCarrito.appendChild(totalCompra);

let montoTotalCompra = document.createElement("h2");
montoTotalCompra.innerText = "0";
totalCompra.appendChild(montoTotalCompra);

let cantidadCelulares = document.createElement("div");
cantidadCelulares.innerHTML = "<h3>Celulares: </h3>";
sectionCarrito.appendChild(cantidadCelulares);

let cantCelulares = document.createElement("h3");
cantCelulares.innerText = "0";
cantidadCelulares.appendChild(cantCelulares);

let botonFinalizar = document.createElement("button");
botonFinalizar.innerText = "Finalizar compra";
sectionCarrito.appendChild(botonFinalizar);
botonFinalizar.setAttribute("class", "boton");



botonFinalizar.onclick = () => {
  const precioFinal = montoTotalCompra.innerText;
  
  Swal.fire({
    title: '¿Deseas finalizar tu compra?',
    text: `Total a pagar: $${precioFinal}`,
    showCancelButton: true,
    confirmButtonColor: '#008f39',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si',
    cancelButtonText: 'No'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Compra confirmada',
        '¡Gracias por comprar con nosotros!',
        'success'
      )
      vaciarCarrito();
    }
  })
}


for (const celular of celulares) {
  let container = document.createElement("div");
  container.setAttribute("class", "card-celular");
  container.innerHTML = ` <div class="img-container">
                            <img src="${celular.imagen}" alt="${celular.nombre}" class="img-celular"/>
                            </div>
                            <div class="info-celular">
                            <p class="font">${celular.nombre}</p>
                            <strong class="font">$${celular.precio}</strong>
                            <button class="boton" id="btn${celular.id}"> Agregar al carrito </button>
                            </div>`;
  sectionCelulares.appendChild(container);

  document.getElementById(`btn${celular.id}`).onclick = () => agregarAlCarrito(`${celular.id}`);
}




function agregarAlCarrito(id) {
  carrito.push(celulares.find(p => p.id == id));
  localStorage.setItem("carrito", JSON.stringify(carrito));
  calcularTotalCarrito();
}

function calcularTotalCarrito() {
  let total = 0;
  for (const celular of carrito) {
    total += celular.precio;
  }
  montoTotalCompra.innerText = total;
  cantCelulares.innerText = carrito.length;
}

function vaciarCarrito() {
  montoTotalCompra.innerText = "0";
  cantCelulares.innerText = "0";
  localStorage.clear();
  carrito = [];
}


function cargarCarrito() {
  let carrito = JSON.parse(localStorage.getItem("carrito"));
  if (carrito == null) {
    return [];
  } else {
    return carrito;
  }
}

