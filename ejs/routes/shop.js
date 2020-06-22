const path = require('path');

const express = require('express');
const shopRouter = express.Router();

const adminsData = require('./admin');

shopRouter.get('/', (req, res, next) => {
    const products = adminsData.adminData;
    res.render('shop', {pageTitle : 'My shop', prods: products, page:  'Shop'});
});

module.exports = shopRouter;