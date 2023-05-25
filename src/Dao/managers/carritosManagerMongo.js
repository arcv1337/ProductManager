import cartModel from "../db/models/cartModel.js"

const path = "./files/Carritos.json";

export default class CartManagerMongo {

    getShoppingCarts = async () => {
     const carts = await cartModel.find({})
     return {
      code: 202,
      status: 'OK',
      message: carts
     };
    };
  
    getShoppingCartById = async (idCarrito) => {
      const cart = await cartModel.findOne({_id:idCarrito});
    
      if (!cart){
        return {
          code: 400,
          status: 'Error',
          message: 'No se ha encontrado un cart con ese ID'
        };
      };
      return {
        code: 202,
        status: 'OK',
        message: cart.products,
      };
    };
  
    addShoppingCart = async () => {
       const cart = await cartModel.create({});
       return {
        code: 202,
        status: 'Success',
        message: cart
       };
      };

      
    updateShoppingCart = async (cid, pid,) => {
        const shoppingCart = await cartModel.findOne({_id:cid});
        const prodIndex = shoppingCart.products.findIndex(cprod => cprod._id === pid);
        

        if (prodIndex === -1){
          const product = {
            _id: pid,
            quantity: 1
          }
          shoppingCart.products.push(product);
        }
        else {
          let total = shoppingCart.products[prodIndex].quantity;
          shoppingCart.products[prodIndex].quantity = total + 1;

        }

        const result = await cartModel.updateOne({_id:cid},{$set:shoppingCart});

        return {
          code: 202,
          status: 'OK',
          message: shoppingCart.products
        };

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