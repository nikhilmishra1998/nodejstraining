const path = require('path');

const express = require('express');
const shopRouter = express.Router();

const rootDir = require('../util/path');
const adminsData = require('./admin');

shopRouter.get('/', (req, res, next) => {
    // res.sendFile(path.join(rootDir, 'views', 'shop.html')); // this will render shop.html file
    const products = adminsData.adminData;
    res.render('shop', {
        prods:products, 
        hasProd:products.length>0,
        productCSS:true,
        pageTitle:'Shop',
        activeShop:true
    });  // This will render shop.hbs file which is in views folder
});

module.exports = shopRouter;