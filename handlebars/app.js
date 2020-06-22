const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const expressHbs = require('express-handlebars');

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.engine('hbs',expressHbs({
    layoutsDir: 'views/layouts',
    defaultLayout: 'main-layout',
    extname: 'hbs'
}));
app.set('view engine', 'hbs');
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