
const db = require('../util/database');
const Cart = require('./cart');

module.exports = class Product {
    
    constructor (id, title, imageUrl, description, price) {
        this.id             = id;
        this.title          = title;
        this.imageUrl       = imageUrl;
        this.description    = description;
        this.price          = price;
    }

    // This function will create new product and update old products also
    save() {
        if (!this.id) {
            return db.execute(
                'INSERT INTO product (title, price, description, imageUrl) VALUES (?, ?, ?, ?)',
                [this.title, this.price, this.description, this.imageUrl]
            );
        } else {
            return db.execute("UPDATE product SET `title` = ?, price = ?, description = ?, imageUrl = ? WHERE (`id` = '1')",
                [this.title, this.price, this.description, this.imageUrl]
            );
        }
    }

    // This function will get all the details from product table of the Database
    static fetchAll() {
        return db.execute('SELECT * FROM product');
    }

    static findDataByID (id) {
        return db.execute('SELECT * FROM product WHERE product.id = ?', [id]);
    }

    static deleteProductById (productId) {
        
    }
}