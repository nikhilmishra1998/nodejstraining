const path = require('path');

const express       = require('express');
const bodyParser    = require('body-parser');
const mongoose      = require('mongoose');

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', 'views');

// Here we Import our router and controller files
const adminRoutes       = require('./routes/admin');
const shopRoutes        = require('./routes/shop');
const errorController   = require('./controllers/errorController');
const User              = require('./model/user');

// Code for Routes
app.use((req, res, next) => {
    User.findById('5efe2b8564dd6c3d5dc1f0d8')
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


mongoose.connect('mongodb+srv://mongo-nikhil1998:mongo-nikhil1998@cluster0.nkkqe.mongodb.net/nodejs-tutorial?retryWrites=true&w=majority')
    .then(result => {
        console.log('Connected');
        User.findOne().then( user => {
            if(!user) {

                const user = new User({
                    name : 'Nikhil Kumar Mishra',
                    email : 'nikhil@test.com',
                    cart : {
                        items : []
                    }
                });
                user.save();
            }
        });
        app.listen(3000);
    })
    .catch(error => {
        console.log(error);
    });