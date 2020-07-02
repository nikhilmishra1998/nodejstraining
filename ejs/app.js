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
const mongoConnect      = require('./util/database').mongoConnect;
const User              = require('./model/user');

// Code for Routes
app.use((req, res, next) => {
    User.findById('5efd080391219d117e7f13eb')
        .then(user => {
            req.user = new User(user.name, user.email, user.cart, user._id);           
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


mongoConnect(() => {
    app.listen(3000);
});