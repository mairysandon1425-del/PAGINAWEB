let imagenes = ["img/1.jpg","img/2.jpg","img/3.jpg","img/4.jpg"];
let i = 0;

setInterval(()=>{
    i++;
    if(i>=imagenes.length){i=0;}
    document.getElementById("slider").src=imagenes[i];
},3000);

/* CARRITO */
let carrito = [];
let contador = 0;

document.querySelectorAll(".boton").forEach((btn)=>{
    btn.addEventListener("click", ()=>{
        let card = btn.parentElement;
        let nombre = card.querySelector(".nombre").textContent;
        let precio = parseInt(card.querySelector(".precio").textContent.replace(/\D/g,""));

        let existe = carrito.find(p=>p.nombre===nombre);

        if(existe){
            existe.cantidad++;
        }else{
            carrito.push({nombre,precio,cantidad:1});
        }

        contador++;
        document.getElementById("contador").textContent = contador;

        renderCarrito();
    });
});

function abrirCarrito(){
    document.getElementById("modalCarrito").style.display="flex";
}

function cerrarCarrito(){
    document.getElementById("modalCarrito").style.display="none";
}

function renderCarrito(){
    let lista = document.getElementById("listaCarrito");
    let total = 0;
    lista.innerHTML = "";

    carrito.forEach((p,i)=>{
        total += p.precio * p.cantidad;

        lista.innerHTML += `
        <div class="item">
            <span>${p.nombre}</span>
            <div>
                <button onclick="restar(${i})">➖</button>
                ${p.cantidad}
                <button onclick="sumar(${i})">➕</button>
            </div>
            <span>$${(p.precio*p.cantidad).toLocaleString()}</span>
            <button onclick="eliminar(${i})">❌</button>
        </div>`;
    });

    document.getElementById("total").textContent = "Total: $" + total.toLocaleString();
}

function sumar(i){ carrito[i].cantidad++; contador++; actualizar(); }
function restar(i){ carrito[i].cantidad>1 ? carrito[i].cantidad-- : carrito.splice(i,1); contador--; actualizar(); }
function eliminar(i){ contador -= carrito[i].cantidad; carrito.splice(i,1); actualizar(); }

function actualizar(){
    document.getElementById("contador").textContent = contador;
    renderCarrito();
}