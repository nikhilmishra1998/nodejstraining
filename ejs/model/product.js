const fs = require('fs');
const path = require('path');

const Cart = require('./cart');

const dirPath = path.join(
    path.dirname( process.mainModule.filename), // to get the current directory name
    'data',
    'products.json'
);


const getFileContent = callback => {
    fs.readFile(dirPath, (error, fileContent) =>{
        if (error) {
            callback([]);
        } else {
            callback(JSON.parse(fileContent));
        }
    });
};


module.exports = class Product {
    
    constructor (id, title, imageUrl, description, price) {
        this.id             = id;
        this.title          = title;
        this.imageUrl       = imageUrl;
        this.description    = description;
        this.price          = price;
    }

    save() {
        getFileContent(products => {
            
            if (this.id) {
                // Updating the product if ID exists.
                const existingProductIndex = products.findIndex(prod => prod.id === this.id);
                const updatedProduct = [...products];
                updatedProduct[existingProductIndex] = this;
                fs.writeFile(dirPath, JSON.stringify(updatedProduct), error => {
                    if (error)
                        console.log(error);
                });
            } else {
                // If there is no id the create a new product.
                this.id = Math.random().toString();
                products.push(this);
                fs.writeFile(dirPath, JSON.stringify(products), error => {
                    if (error)
                        console.log(error);
                });
            }
        });
    }

    static fetchAll(callback) {
        return getFileContent(callback);
    }

    static findDataByID (id, callback) {
        getFileContent(products => {
            const product = products.find(p => p.id == id);
            return callback(product);
        });
    }

    static deleteProductById (productId) {
        getFileContent(products => {
            const product = products.find(prod => prod.id === productId);
            const updatedProduct = products.filter(prod => prod.id !== productId);
            fs.writeFile(dirPath, JSON.stringify(updatedProduct), error => {
                if (error)
                    console.log(error);
                else
                    Cart.deleteCartItem(productId, product.price);
            });
        });
    }
}