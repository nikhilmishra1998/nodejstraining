const path = require('path');

const express = require('express');
const shopRouter = express.Router();

const productsController = require('../controllers/productController');

shopRouter.get('/', productsController.getListProduct);

module.exports = shopRouter;