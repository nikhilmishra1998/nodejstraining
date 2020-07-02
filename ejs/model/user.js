const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    cart : {
        items : [
            {

                productId : {
                    type : Schema.Types.ObjectId,
                    ref : 'Product',
                    required : true
                },
                quantity : {
                    type : Number, 
                    required : true
                }
            }
        ]
    }
});

userSchema.methods.addToCart = function (product) {
   const cartProductIndex = this.cart.items.findIndex(cp => {
        return cp.productId.toString() === product._id.toString();
    });

    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items];
    
    if (cartProductIndex >= 0) {
        newQuantity = this.cart.items[cartProductIndex].quantity + 1;
        updatedCartItems[cartProductIndex].quantity = newQuantity;
    } else {
        updatedCartItems.push({
            productId   : product._id,
            quantity    : newQuantity
        });
    }
    
    const updatedCart = {
        items: updatedCartItems
    };
    this .cart = updatedCart;
    return this.save();
}

module.exports = mongoose.model('User', userSchema);


// const mongodb = require('mongodb');
// const getDB = require('../util/database').getDB;

// class User {
    
//     constructor (name, email, cart, id) {
//         this.name = name;
//         this.email = email;
//         this.cart = cart;
//         this._id = id;
//     }

//     // To insert an user this method will ve used
//     save() {
//         const db = getDB();
//         return db.collection('users')
//             .insertOne(this)
//             .then(result => {
//                 console.log('user inserted');
//             })
//             .catch(error => {
//                 console.log(error);
//             });
//     }

//     // To add an item to the cart this method will be used
//     addToCart(product) {
//         const db = getDB();
//         const cartProductIndex = this.cart.items.findIndex(cp => {
//             return cp.productId.toString() === product._id.toString();
//         });

//         let newQuantity = 1;
//         const updatedCartItems = [...this.cart.items];
        
//         if (cartProductIndex >= 0) {
//             newQuantity = this.cart.items[cartProductIndex].quantity + 1;
//             updatedCartItems[cartProductIndex].quantity = newQuantity;
//         } else {
//             updatedCartItems.push({
//                 productId : new mongodb.ObjectId(product._id),
//                 quantity : newQuantity
//             });
//         }
        
//         const updatedCart = {
//             items: updatedCartItems
//         };
//         return db
//             .collection('users')
//             .updateOne(
//                 {
//                     _id : new mongodb.ObjectId(this._id)
//                 },
//                 {
//                     $set : {
//                         cart : updatedCart
//                     }
//                 }
//             );
//     }

//     // This method will fetch all the cart items from database
//     getCart() {
//         const db = getDB();
//         const productIds = this.cart.items.map(p => {
//             return p.productId;
//         });

//         return db
//             .collection('products')
//             .find({_id: {$in : productIds}})
//             .toArray()
//             .then(products => {
//                 return products.map( p => {
//                     return {
//                         ...p,
//                         quantity: this.cart.items.find(cp => {
//                             return cp.productId.toString() === p._id.toString();
//                         }).quantity
//                     };
//                 });
//             })
//             .catch(error => {
//                 console.log(error);
//             });
//     }

//     // This method will delete the product from cart
//     deleteCartItem(productId) {
//         const db = getDB();
//         const updatedCartItems = this.cart.items.filter(p => {
//             return p.productId.toString() !== productId.toString();
//         });
        
//         return db
//             .collection('users')
//             .updateOne(
//                 {
//                     _id : new mongodb.ObjectId(this._id)
//                 },
//                 {
//                     $set : {
//                         cart: {items : updatedCartItems}
//                     }
//                 }
//             );
//     }

//     // This method will add an order to database and reset the cart
//     addOrder() {
//         const db = getDB();
//         return this.getCart()
//             .then(products => {
//                 const order = {
//                     items: products,
//                     user: {
//                         _id : new mongodb.ObjectId(this._id),
//                         name: this.name,
//                     }
//                 };
//                 return db
//                     .collection('orders').insertOne(order);
//             })
//             .then( result => {
//                 this.cart = {items:[]};
//                 return db
//                 .collection('users')
//                 .updateOne(
//                     {
//                         _id : new mongodb.ObjectId(this._id)
//                     },
//                     {
//                         $set : {
//                             cart: {
//                                 items : []
//                             }
//                         }
//                     }
//                 );
//             });
//     }

//     // To get orders from orders collection we use this method
//     getOrders() {
//         const db = getDB();
//         return db
//             .collection('orders')
//             .find({'user._id': new mongodb.ObjectId(this._id)})
//             .toArray()
//             .then( orders => {
//                 return orders;
//             })
//             .catch(error => {
//                 console.log(error);
//             });
//     }
    
//     //  here we will find an user by their id
//     static findById(userId) {
//         const db = getDB();
//         return db.collection('users')
//             .find({_id : new mongodb.ObjectId(userId)})
//             .next()
//             .then(user => {
//                 console.log(user);
//                 return user;
//             })
//             .catch(error => {
//                 console.log(error);
//             });
//     }
// }

// module.exports = User;