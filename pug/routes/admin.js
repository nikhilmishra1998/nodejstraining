const path = require('path');

const express = require('express');
const router = express.Router();

const addedProduct = [];

const rootDir = require('../util/path');

router.get('/add-product', (req, res, next) => {
    res.render('add-product', {pageTitle:'Add Product', page:'/admin/add-product'});
});

router.post('/add-product', (req, res, next) => {
    addedProduct.push({title:req.body.title});
    res.redirect('/');
});
exports.adminRoutes = router;

exports.adminData = addedProduct;