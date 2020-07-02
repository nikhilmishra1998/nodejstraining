const Product = require('../model/product');
// const Order = require('../model/order');

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

// Here we will show the product to our user 
exports.getListProduct = (req, res, next) => {
    
    Product.fetchAll()
        .then(products => { // this is next generation js syntax where we break an array to their components
            res.render(
                'shop/product-list', 
                {
                    pageTitle   : 'Product-My shop', 
                    prods       : products, 
                    page        :  'Products'
                }
            );
        })
        .catch(error => { console.log('DB Error ', error);});
};

// Here we will show the cart page to our user 
exports.getCart = (req, res, next) => {
    
   req.user
    .getCart()
    .then(products => {
        console.log(products);
        res.render(
            'shop/cart', 
            {
                pageTitle   : 'Cart-My shop', 
                cart        : products, 
                page        :  'Cart'
            }
        );
    })
    .catch(error => {
        console.log(error);
    })
};

// Here we will add an item to the cart or increase the quantity of added product
exports.postCart = (req, res, next) => {
    
    const productId = req.body.productId;
    Product.findById(productId)
        .then(product => {
            return req.user.addToCart(product);
        })
        .then(result => {
            console.log('Product is added to cart');
            res.redirect('/cart');
        })
        .catch(error => {
            console.log(error);
        });
};

// Here we will delete the cart items
exports.deleteCartItem = (req, res, next) => {
    const productId = req.body.productId;
    req.user
        .deleteCartItem(productId)
        .then(result => {
            res.redirect('/cart');
        })
        .catch(error => {
            console.log(error);
        })
};

// Here we will show the checkout page to our user 
exports.getOrder = (req, res, next) => {
    req.user
        .getOrders()
        .then(orders => {
            res.render(
                'shop/order', 
                {
                    pageTitle   : 'Order-My shop',
                    page        :  'Order',
                    orders      : orders
                }
            );
        })
        .catch(error => {
            console.log(error);
        });
};

exports.postOrder = (req, res, next) => {
    req.user
        .addOrder()
        .then(result => {
            res.redirect('/order');
        })
        .catch(error => console.log(error));
};


// Here we will show the product to our user 
exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId)
        .then(product => {
            res.render(
                'shop/product-detail', 
                {
                    pageTitle   : 'Product Detail-My shop', 
                    product     : product, 
                    page        :  'Pd'
                }
            );
        })
        .catch(error => console.log(error));
};