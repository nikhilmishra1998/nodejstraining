const path = require('path');

const express = require('express');
const router = express.Router();

const addedProduct = [];

const rootDir = require('../util/path');

router.get('/add-product', (req, res, next) => {
    // res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
    res.render('add-product', {
        pageTitle:'Add Product', 
        productCSS:true,
        formCSS:true,
        activeAddProduct:true
    });
});

router.post('/add-product', (req, res, next) => {
    // console.log(req.body);
    addedProduct.push({title:req.body.title});
    res.redirect('/');
});
exports.adminRoutes = router;

exports.adminData = addedProduct;