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


   updateProducts = async (id_product) => {
    const productos = await this.getProducts();
    let updateById = productos.find((product) => product.id === id_product);  
    // Actualizamos el stock
    updateById.stock = 1;
    if (updateById) {
      await fs.promises.writeFile(path, JSON.stringify(productos, null, "\t"));
      productos.push(updateById);
      await fs.promises.writeFile(path, JSON.stringify(productos, null, "\t"));
      console.log("El producto se modificó con exito")
    } 
    else
     {
      return console.log("No existe producto con ese número de ID");
    }
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