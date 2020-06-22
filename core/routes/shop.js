const path = require('path');

const express = require('express');
const shopRouter = express.Router();

const rootDir = require('../util/path');
const adminsData = require('./admin');

shopRouter.get('/', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'shop.html')); // this will render shop.html file
});

module.exports = shopRouter;