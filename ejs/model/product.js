const mongodb = require('mongodb');
const getDB = require('../util/database').getDB;

class Product {
    constructor(title, price, imageUrl, description, id) {
        this.title          = title;
        this.price          = price;
        this.imageUrl       = imageUrl;
        this.description    = description;
        this._id            = new mongodb.ObjectId(id);
    }
    
    // From here we insert data to mongoDB
    save() {
        const db = getDB();
        let dbOperation;

        if(this._id) {
            dbOperation = db.collection('products')
            .updateOne({_id: this._id}, {$set : this});
        } else {
            dbOperation = db.collection('products')
                .insertOne(this);
        }

        return dbOperation
            .then(result => {
                console.log(result);
            })
            .catch(error => {
                console.log(error);
            });
    }
    
    // From here we get all inserted documents from product collection
    static fetchAll() {
         const db = getDB();
         return db
            .collection('products')
            .find()
            .toArray()
            .then( products => {
                return products;
            })
            .catch(error => {
                console.log(error);
            });
    }

    // From here we will get only single document from products collection
    static findById(productId) {
        const db = getDB();
        return db
            .collection('products')
            .find({_id : new mongodb.ObjectId(productId)})
            .next()
            .then(product => {
                return product;
            })
            .catch(error => {
                console.log(error);
            });
    }

    // From here we will delete the product from products collection
    static deleteById(productId) {
        const db = getDB();
        return db.collection('products')
            .deleteOne({_id : new mongodb.ObjectId(productId)})
            .then(result => {
                console.log('Product deleted');
            })
            .catch(error => {
                console.log(error);
            });
    }
}
module.exports = Product;