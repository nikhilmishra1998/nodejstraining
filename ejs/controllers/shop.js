const Products = require('../model/product');
const Cart = require('../model/cart');

// Here we will show the product to our user 
exports.getListProduct = (req, res, next) => {
    
    const products = Products.fetchAll(products => {
        res.render(
            'shop/product-list', 
            {
                pageTitle   : 'Product-My shop', 
                prods       : products, 
                page        :  'Products'
            }
        );
    });
};

// Here we will show the index to our user 
exports.getShop = (req, res, next) => {
    
    res.render(
        'shop/index', 
        {
            pageTitle   : 'My shop', 
            page        :  'Shop'
        }
    );
};

// Here we will show the cart page to our user 
exports.getCart = (req, res, next) => {
    
    const products = Products.fetchAll(products => {
        res.render(
            'shop/cart', 
            {
                pageTitle   : 'Cart-My shop', 
                prods       : products, 
                page        :  'Cart'
            }
        );
    });
};

exports.postCart = (req, res, next) => {
    
    const productId = req.body.productId;
    
    Products.findDataByID(productId, product => {
        Cart.addToCart(productId, product.price);
    });
    res.redirect('/cart');
};

// Here we will show the checkout page to our user 
exports.getCheckout = (req, res, next) => {
    
    const products = Products.fetchAll(products => {
        res.render(
            'shop/checkout', 
            {
                pageTitle   : 'Checkout-My shop', 
                prods       : products, 
                page        :  'Checkout'
            }
        );
    });
};


// Here we will show the product to our user 
exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    const product = Products.findDataByID(prodId, product => {
        res.render(
            'shop/product-detail', 
            {
                pageTitle   : 'Product Detail-My shop', 
                product     : product, 
                page        :  'Pd'
            }
        );
    });
};