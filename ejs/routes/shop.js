const path = require('path');

const express = require('express');
const shopRouter = express.Router();

const shopController = require('../controllers/shop');

shopRouter.get('/', shopController.getShop);

shopRouter.get('/products', shopController.getListProduct);

shopRouter.get('/product/:productId', shopController.getProduct);

shopRouter.get('/cart', shopController.getCart);

shopRouter.post('/cart', shopController.postCart);

shopRouter.post('/delete-cart-item', shopController.deleteCartItem);

shopRouter.get('/checkout', shopController.getCheckout);

module.exports = shopRouter;