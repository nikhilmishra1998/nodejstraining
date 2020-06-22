const path = require('path');

const express = require('express');
const router = express.Router();

const addedProduct = [];

router.get('/add-product', (req, res, next) => {
    res.render('add-product', {pageTitle : 'Add Products', page: 'Add Product'});
});

router.post('/add-product', (req, res, next) => {
    addedProduct.push({title:req.body.title});
    res.redirect('/');
});
exports.adminRoutes = router;

exports.adminData = addedProduct;