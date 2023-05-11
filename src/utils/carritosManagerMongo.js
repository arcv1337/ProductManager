import cartModel from "../db/models/cartModel.js"

const path = "./files/Carritos.json";

export default class CartManagerMongo {

    getShoppingCarts = async () => {
      if (fs.existsSync(path)) {
        try {
          const data = await fs.promises.readFile(path, "utf-8");
          const shoppingCarts = JSON.parse(data);
          return shoppingCarts;
        } catch (error) {
          console.error(`Error parsing JSON: ${error.message}`);
          return [];
        }
      } else {
        return [];
      }
    };
  
    getShoppingCartById = async (idCarrito) => {
      let shoppingCarts = await this.getShoppingCarts();
      let shoppingCartById = shoppingCarts.find(
        (shoppingCart) => shoppingCart.id === parseInt(idCarrito)
      );
      if (shoppingCartById) {
        return shoppingCartById;
      } else {
        throw new Error("Carrito no encontrado");
      }
    };
  
    addShoppingCart = async () => {
       const cart = await cartModel.create({});
       return {
        code: 202,
        status: 'Success',
        message: cart
       };
      };

      
    updateShoppingCart = async (id, updatedFields) => {
      const shoppingCarts = await this.getShoppingCarts();
      const shoppingCartIndex = shoppingCarts.findIndex(
        (shoppingCart) => shoppingCart.id === id
      );
  
      if (shoppingCartIndex === -1) {
        throw new Error("Carrito no encontrado");
      }
  
      const shoppingCart = shoppingCarts[shoppingCartIndex];
      const updatedShoppingCart = {
        id: shoppingCart.id,
        products: updatedFields.products || shoppingCart.products,
      };
  
      shoppingCarts[shoppingCartIndex] = updatedShoppingCart;
      await fs.promises.writeFile(
        path,
        JSON.stringify(shoppingCarts, null, "\t")
      );
  
      return updatedShoppingCart;
    };
  
    deleteShoppingCart = async (idCarrito) => {
      const shoppingCarts = await this.getShoppingCarts();
      const index = shoppingCarts.findIndex(
        (shoppingCart) => shoppingCart.id === idCarrito
      );
      if (index !== -1) {
        const deletedShoppingCart = shoppingCarts.splice(index, 1)[0];
        await fs.promises.writeFile(
          path,
          JSON.stringify(shoppingCarts, null, "\t")
        );
        return deletedShoppingCart;
      }
    };
  }