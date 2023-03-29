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


  updateProduct(id_product) {
    let updateById = this.products.find((product) => product.id === id_product);  
    // Actualizamos el stock
    updateById.stock  = '5';
    if (updateById) {
      return updateById;
    } else {
      return console.log("No existe producto con ese número de ID");
    }
  }

  deleteProduct(id_product) {
    const productos = this.getProducts();
    const index = productos.findIndex(product => product.id === id_product);
    if (index !== -1) {
      const deletedProduct = productos.splice(index, 1)[0];
      fs.writeFileSync(this.path, JSON.stringify(productos));
      return deletedProduct;
    }
  }
}