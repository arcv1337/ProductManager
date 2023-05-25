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
  

 addProducts = async ({ title, description, price, thumbnail, code, stock }) => {
  const products = await this.getProducts();
  const newProduct = {
      id: (products.length + 1),
      title,
      description,
      price,
      thumbnail,
      status: true,
      code,
      stock,
  };
  products.push(newProduct);
  await fs.promises.writeFile(path, JSON.stringify(products, null, '\t'));
  return products;
};

  

updateProducts = async (id, updatedFields) => {
  const products = await this.getProducts();
  const productIndex = products.findIndex((product) => product.id === id);

  if (productIndex === -1) {
    throw new Error('Product not found');
  }

  const product = products[productIndex];
  const updatedProduct = {
    id: product.id,
    title: updatedFields.title || product.title,
    description: updatedFields.description || product.description,
    price: updatedFields.price || product.price,
    thumbnail: updatedFields.thumbnail || product.thumbnail,
    status: updatedFields.status || product.status,
    code: updatedFields.code || product.code,
    stock: updatedFields.stock || product.stock,
    
  };

  products[productIndex] = updatedProduct;
  await fs.promises.writeFile(path, JSON.stringify(products, null, 2));

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

