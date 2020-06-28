const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', 'views');

// Here we Import our router and controller files
const adminRoutes       = require('./routes/admin');
const shopRoutes        = require('./routes/shop');
const errorController   = require('./controllers/errorController');

// Here we import our database file and models also
const sequelize     = require('./util/database');
const Product       = require('./model/product');
const User          = require('./model/user');
const Cart          = require('./model/cart');
const CartItem      = require('./model/cart-item');
const Order         = require('./model/order');
const OrderItem     = require('./model/order-item');

// Code for Routes
app.use((req, res, next) => {
    User.findByPk(1)
        .then(user => {
            req.user = user;
            next();
        })
        .catch(error => {
            console.log(error);
        });
});
app.use('/admin', adminRoutes); // all the admin panel routes will be here
app.use(shopRoutes); // all the client panel routes will be here

// Setting up a page not found page for invailid requests
app.use(errorController.error404);

// Here is the logic of Association (Relation between models)
Product.belongsTo(User, {constrains: true, onDelete : 'CASCADE'});
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, {through : CartItem});
Product.belongsToMany(Cart, {through : CartItem});
User.hasMany(Order);
Order.belongsToMany(Product, {through : OrderItem});

sequelize
    .sync()
    //.sync({ force : true}) // if you want to create all the tables from scrach
    .then(result =>{
        return User.findByPk(1);
    })
    .then(user => {
        if (!user) {
            return User.create({name: 'Nikhil Kumar Mishra', email: 'nikhil@test.com'});
        }
        return user;
    })
    .then(user => {
        return user.createCart();
    })
    .then(cart => {
        app.listen(3000);
    })
    .catch(error => {
        console.log(error);
    });