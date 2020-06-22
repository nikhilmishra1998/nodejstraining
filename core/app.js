const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

const adminsRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use('/admin', adminsRoutes.adminRoutes); // all the admin panel routes will be here
app.use(shopRoutes); // all the client panel routes will be here

// Setting up a page not found page for invailid requests
app.use((req, res,next) => {
    res.status(404).sendFile(path.join(__dirname, 'views','404.html'));
});


app.listen(3000);