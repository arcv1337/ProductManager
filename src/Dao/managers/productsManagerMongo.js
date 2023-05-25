import productModel from "../models/productModel.js";

export default class ProductManagerMongo {
  getProducts = async (queryParams) => {
    const { limit = 10, page = 1, sort = '', query = '' } = queryParams;

    const filter = {};
    if (query) {
      filter.$or = [
        { category: { $regex: query, $options: 'i' } },
        { availability: { $regex: query, $options: 'i' } },
      ];
    }

    const totalProducts = await productModel.countDocuments(filter);

    const totalPages = Math.ceil(totalProducts / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;
    const nextPage = hasNextPage ? page + 1 : null;
    const prevPage = hasPrevPage ? page - 1 : null;

    const sortOptions = {};
    if (sort === 'asc') {
      sortOptions.price = 1;
    } else if (sort === 'desc') {
      sortOptions.price = -1;
    }

    const products = await productModel
      .find(filter)
      .sort(sortOptions)
      .skip((page - 1) * limit)
      .limit(limit);

    return {
      status: 'success',
      payload: products,
      totalPages,
      prevPage,
      nextPage,
      page,
      hasPrevPage,
      hasNextPage,
      prevLink: hasPrevPage ? `/api/products?limit=${limit}&page=${prevPage}&sort=${sort}&query=${query}` : null,
      nextLink: hasNextPage ? `/api/products?limit=${limit}&page=${nextPage}&sort=${sort}&query=${query}` : null,
    };
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