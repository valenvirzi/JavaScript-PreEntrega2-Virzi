/* 
~ CARRITO DE COMPRAS ~

- Crear array de objetos (productos) con las siguientes propiedades:
    + ID
    + Nombre
    + Precio
    + Stock

- Mostrar una lista de los productos con su información.
    + Donde se pueda elegir el producto y la cantidad a comprar
    + Limitando la compra a la cantidad de stock de cada producto

- Preguntar al usuario si quiere seguir sumando productos al carrito

- Crear un array donde se muestren los productos y cantidades seleccionados (Tipo carrito de compras)
    + Mostrar el subtotal de cada producto (Precio * Cantidad seleccionada)
    + Sumar los subtotales para dar el Total de la compra
    + Mostrar el valor total de la compra
    + Pedir confirmación de compra 
    
[Se puede hacer más complejo si se quiere pidiendo método de pago o información de envío, con/sin IVA, etc]
*/

function findProduct() {
  let id = Number(
    parseInt(prompt("Escribe el ID del producto que quieras sumar al carrito"))
  );

  let foundProduct = productList.find((product) => product.idProduct == id);
  return foundProduct;
}

function addToCart(foundProduct, unitsRequested) {
  foundProduct.stock -= unitsRequested;
  let subtotal = foundProduct.price * unitsRequested;
  let msg = `${unitsRequested}u. ${foundProduct.name}\n * Subtotal: $${subtotal}\n`;
  return {
    msg: msg,
    subtotal: subtotal,
  };
}

const productList = [
  {
    idProduct: 1,
    name: "Gorra",
    price: 3000,
    stock: 5,
  },
  {
    idProduct: 2,
    name: "Remera",
    price: 5000,
    stock: 7,
  },
  {
    idProduct: 3,
    name: "Buzo",
    price: 8000,
    stock: 3,
  },
  {
    idProduct: 4,
    name: "Pantalon",
    price: 6000,
    stock: 8,
  },
];

productList.forEach((product) => {
  console.log(`  ${product.name}
  ID del producto: #${product.idProduct}
  Precio por unidad: $${product.price}
  Stock: ${product.stock}u.`);
});

if (
  confirm(
    "[ABRA LA CONSOLA DEL NAVEGADOR]\n¡Bienvenido a SubliCom Textiles!\n¿Desea hacer una compra?"
  )
) {
  let cartMsg = `Resumen de la compra\n`;
  let total = 0;
  do {
    let foundProduct = findProduct();
    if (foundProduct) {
      let unitsRequested = Number(
        parseInt(
          prompt(`¿Cuántas unidades quieres del producto ${foundProduct.name}?`)
        )
      );

      if (unitsRequested > 0) {
        if (unitsRequested <= foundProduct.stock) {
          let resume = addToCart(foundProduct, unitsRequested);
          cartMsg += resume.msg;
          total += resume.subtotal;
          alert(cartMsg);
        } else {
          unitsRequested = 0;
          alert(
            `No puedes pedir más del stock disponible.\nEl stock disponible es ${foundProduct.stock}u.`
          );
        }
      } else if (isNaN(unitsRequested)) {
        alert("Debes ingresar un número");
      } else {
        alert("Debes elegir al menos 1 unidad");
      }
    } else {
      alert(
        "No se ha encontrado el producto con el ID ingresado, chequee la consola para ver los IDs válidos e inténtelo nuevamente"
      );
    }
  } while (confirm("¿Quiere seguir sumando productos al carrito?"));
  if (total > 0) {
    cartMsg += `El valor total de la compra es de: $${total}\n¿Quieres confirmar tu compra?`;
    if (confirm(cartMsg)) {
      alert("Tu compra ha sido realizada con éxito");
    } else {
      alert("Has cancelado tu compra");
    }
  } else {
    alert("¡Nos vemos!");
  }
} else {
  alert("¡Vuelve pronto!");
}
