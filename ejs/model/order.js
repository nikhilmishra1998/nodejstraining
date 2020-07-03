const mongoose = require('mongoose');
const { schema } = require('./product');

const Schema = mongoose.Schema;

const orderSchema = new schema({
    items : {
        product : {
            productId : { type : Schema.Types.ObjectId, required : true},
            name : {type : String, required : true},
            price : {type : Number, required : true},
            quantity : {type : Number,required : true}
        },
    },
    userId
});