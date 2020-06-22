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

app.use('/admin', adminRoutes); // all the admin panel routes will be here
app.use(shopRoutes); // all the client panel routes will be here

// Setting up a page not found page for invailid requests
app.use(errorController.error404);


app.listen(3000);