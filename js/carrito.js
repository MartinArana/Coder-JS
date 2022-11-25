const pintarCarrito = () => {
    modalContainer.innerHTML = "";
    modalContainer.style.display = "flex";
    const modalHedear = document.createElement("div");
    modalHedear.className = "modal_header"
    modalHedear.innerHTML = `
    <h2 class="modal_header_title">Carrito de compras</h2>
    `;
    modalContainer.append(modalHedear);

    const modalbutton = document.createElement("h2");
    modalbutton.innerText = "x";
    modalbutton.className = "modal_header_button";

    modalbutton.addEventListener("click", () => {
        modalContainer.style.display = "none";
    });

    modalHedear.append(modalbutton);


    carrito.forEach((product) => {
        let carritoContent = document.createElement("div");
        carritoContent.className = "modal-content"
        carritoContent.innerHTML = `
            <img src ="${product.img}">
            <h3>${product.nombre}</h3>
            <p class="parrafos">$${product.precio}</p>
            <span class="restar"> - </span>
            <p>Cantidad:${product.cantidad}</p>
            <span class="sumar"> + </span>
            <p>Total: $${product.cantidad * product.precio}</p>
            <span class="delete_product"> ❌ </span>
        `;
        modalContainer.append(carritoContent);


        let restar = carritoContent.querySelector(".restar")

        restar.addEventListener("click", () => {
            if (product.cantidad !== 1) {
                product.cantidad--;
            }
            saveLocal();
            pintarCarrito();
        });

        let sumar = carritoContent.querySelector(".sumar")

        sumar.addEventListener("click", () => {
            product.cantidad++;
            saveLocal();
            pintarCarrito();
        });

        let eliminar = carritoContent.querySelector(".delete_product")

        eliminar.addEventListener("click", () => {
            eliminarProducto(product.id);
        });

        // let eliminar = document.createElement("span");
        // eliminar.innerText = "❌";
        // eliminar.className = "delete_product";
        // carritoContent.append(eliminar);

        // eliminar.addEventListener("click", (eliminarProducto));
    });


    const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);

    const totalVenta = document.createElement("div");
    totalVenta.className = ("total_content");
    totalVenta.innerHTML = `
    Total a pagar: $${total}
    `;
    modalContainer.append(totalVenta);
};

verCarrito.addEventListener("click", pintarCarrito);

const eliminarProducto = (id) => {
    const foundID = carrito.find((element) => element.id === id);

    carrito = carrito.filter((carritoId) => {
        return carritoId !== foundID;
    });

    carritoCont();
    saveLocal();
    pintarCarrito();
};

const carritoCont = () => {
    cantidadCarrito.style.display = "block";

    const carritoLength = carrito.length;
    localStorage.setItem("carritoLength", JSON.stringify(carritoLength))

    cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"));
}

carritoCont();