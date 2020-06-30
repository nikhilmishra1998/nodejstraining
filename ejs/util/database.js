const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
let _db;
const mongoConnect = (callback) => {
    MongoClient.connect('mongodb+srv://mongo-nikhil1998:mongo-nikhil1998@cluster0.nkkqe.mongodb.net/nodejs-tutorial?retryWrites=true&w=majority')
    .then(client => {
        console.log("Connected");
        _db = client.db();
        callback();
    })
    .catch(error => {
        console.log(error);
        throw error;
    });
};
 const getDb = () =>{
    if (_db) {
        return _db;
    }
    throw 'No Database found';
 };
exports.mongoConnect = mongoConnect;
exports.getDB = getDb;


