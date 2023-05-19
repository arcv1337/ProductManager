import productModel from "../db/models/productModel.js";

export default class ProductManagerMongo {
  getProducts = async () => {
    const products = await productModel.find({});
    return products;
  };

  getProductById = async (idProducto) => {
    const product = await productModel.findOne({ _id: idProducto });

    if (!product) {
      return {
        code: 404,
        status: 'Error',
        message: 'Producto no encontrado',
      };
    }

    return {
      code: 200,
      status: 'OK',
      message: product,
    };
  };

  addProduct = async ({ title, description, price, thumbnail, code, stock }) => {
    const newProduct = await productModel.create({
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    });

    return {
      code: 201,
      status: 'Success',
      message: newProduct,
    };
  };

  updateProduct = async (id, updatedFields) => {
    const updatedProduct = await productModel.findByIdAndUpdate(
      id,
      updatedFields,
      { new: true }
    );

    if (!updatedProduct) {
      return {
        code: 404,
        status: 'Error',
        message: 'Producto no encontrado',
      };
    }

    return {
      code: 200,
      status: 'OK',
      message: updatedProduct,
    };
  };

  deleteProduct = async (idProduct) => {
    const deletedProduct = await productModel.findByIdAndDelete(idProduct);

    if (!deletedProduct) {
      return {
        code: 404,
        status: 'Error',
        message: 'Producto no encontrado',
      };
    }

    return {
      code: 200,
      status: 'OK',
      message: deletedProduct,
    };
  };
}