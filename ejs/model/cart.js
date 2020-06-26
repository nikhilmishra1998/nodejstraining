const fs = require('fs');
const path = require('path');

const dirName = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
)
module.exports = class Cart {
    static addToCart(productId, price) {
        fs.readFile(dirName, (error, fileContent) => {
            let cart = {products:[], totalPrice:0};
            
            // Getting the previous cart
            if (!error) {
                cart = JSON.parse(fileContent);
            }

            // Analyzing the cart

            const existingProductIndex = cart.products.findIndex(p => p.id === productId);
            const existingProduct = cart.products[existingProductIndex];
            let updatedProduct;

            // Updating the cart data.
            if (existingProduct) {
                updatedProduct = {...existingProduct};
                updatedProduct.qty = updatedProduct.qty+1;
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedProduct;
            }
            else {
                updatedProduct = { id: productId, qty : 1};
                cart.products = [...cart.products, updatedProduct];
            }

            cart.totalPrice = cart.totalPrice + +price;
            fs.writeFile(dirName, JSON.stringify(cart), error => {
                if (error) {
                    console.log(error);
                }
            });
        });
    }

    static deleteCartItem (productId, price) {
        fs.readFile(dirName, (error, fileContent) => {
            if (error) {
                return;
            }
            const updatedCart = {...JSON.parse(fileContent)};
            const product = updatedCart.products.find(p => p.id === productId);
            
            if(!product) {
                return;
            }
            const productQty = product.qty;
            updatedCart.products = updatedCart.products.filter(p => p.id !== productId);
            updatedCart.totalPrice = updatedCart.totalPrice - (price* productQty);
            fs.writeFile(dirName, JSON.stringify(updatedCart), error => {
                if (error) {
                    console.log(error);
                }
            });
        });
    }

    static getCartItems (callback) {
        fs.readFile(dirName, (error, fileContent) => {
            if (error) {
                callback(null);
            } else {
                callback(JSON.parse(fileContent));
            }
        });
    }
}