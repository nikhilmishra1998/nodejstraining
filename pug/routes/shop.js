const path = require('path');

const express = require('express');
const shopRouter = express.Router();

const rootDir = require('../util/path');
const adminsData = require('./admin');

shopRouter.get('/', (req, res, next) => {
    const products = adminsData.adminData;
    res.render('shop', {prods:products, pageTitle:'Shop', page:'/'});  // This will render shop.pug file which is in views folder
});

module.exports = shopRouter;