import fs from "fs";


const path = "./files/Productos.json";

export default class ProductManager {

  getProducts = async () => {
    if (fs.existsSync(path)) {
      const data = await fs.promises.readFile(path, "utf-8");
      const products = JSON.parse(data);
      return products;
    } else {
      return [];
    }
  };

  getProductById = async (idProducto) => {
    let producto = await this.getProducts();
    let productById = producto.find((producto) => producto.id === idProducto);
   /*  console.log(productById); */
        if (productById) {
          return productById;
        }
        else  {
          return console.log("Producto no encontrado");
        }
 };
  

  addProducts = async (product) => {
    const products = await this.getProducts();
    if (products.length === 0) {
      product.id = 1;
    } else {
      product.id = products[products.length - 1].id + 1;
    }

    products.push(product);

    await fs.promises.writeFile(path, JSON.stringify(products, null, "\t"));

    return product;
  };


  updateProducts = async (id, titulo, descripcion, precio, thumbnail, code, stock) => {
    const products = await this.getProducts();
    const productToUpdate = products.findIndex((product) => product.id === id);
    console.log(products)
    if (productToUpdate === -1) {
      return "Producto no encontrado";
    }
  
    const updatedProduct = {
      ...products[productToUpdate],
      titulo: titulo,
      descripcion: descripcion,
      precio: precio,
      thumbnail: thumbnail,
      code: code,
      stock: stock
    };
  
    products[productToUpdate] = updatedProduct;
  
    await fs.promises.writeFile(path, JSON.stringify(products, null, "\t"));
  
    return updatedProduct;
  };

  deleteProducts = async (id_product) => {
    const productos = await this.getProducts();
    const index = productos.findIndex(product => product.id === id_product);
    if (index !== -1) {
      const deletedProduct = productos.splice(index, 1)[0];
      await fs.promises.writeFile(path, JSON.stringify(productos, null, "\t"));
      return deletedProduct;
    }
  }
}

