const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorController = require('./controllers/errorController');

// Here we improt our database file and models also
const sequelize = require('./util/database');
const Product = require('./model/product');
const User = require('./model/user');

app.use('/admin', adminRoutes); // all the admin panel routes will be here
app.use(shopRoutes); // all the client panel routes will be here

// Setting up a page not found page for invailid requests
app.use(errorController.error404);

Product.belongsTo(User, {constrains: true, onDelete : 'CASCADE'});
User.hasMany(Product);

sequelize
    .sync()
    // .sync({ force : true}) // if you want to create all the tables from scrach
    .then(result => {
        app.listen(3000);
    })
    .catch(error => {
        console.log(error);
    });