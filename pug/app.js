const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'pug');
app.set('views', 'views');

const adminsRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use('/admin', adminsRoutes.adminRoutes); // all the admin panel routes will be here
app.use(shopRoutes); // all the client panel routes will be here

// Setting up a page not found page for invailid requests
app.use((req, res,next) => {
    res.status(404).render('404', {pageTitle: 'Page not found'});
});


app.listen(3000);