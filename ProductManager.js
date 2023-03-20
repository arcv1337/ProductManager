class ProductManager {
    constructor(){
        this.products = [];
    }

    getProducts(){
        return this.products;
    }

    addProduct(title, description, price, thumbnail, code, stock){
        let idProducto = this.products.length;

        const producto = {
            title:title,
            description:description,
            price:price,
            thumbnail:thumbnail,
            code:code,
            stock:stock,
            id:++idProducto
        }
        if (producto.title === null ||producto.title  === ''){
            return console.log('Insert the title')
        }
        if (producto.description === null ||producto.description  === ''){
            return console.log('Insert a description')
        }
        if (producto.code === null || producto.code === ''){
            return console.log('Insert a code')
        }
        this.products.push(producto);
        return this.products;
    }

    getProductById(idProducto){   
        let producto = this.products.find(producto=> products.id === idProducto)

        if(producto){
            return producto;
        }
        else{
            return console.log('not found')
        }
    }

}

const nuevoProd = new ProductManager();
nuevoProd.addProduct('Prueba', 'Es una prueba de producto', 200, 'Sin imagen', 'abc123', 25);

nuevoProd.addProduct();

console.log(nuevoProd.getProducts());