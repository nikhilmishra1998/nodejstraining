const Product = require('../model/product');
const Cart = require('../model/cart');

// Here we will show the product to our user 
exports.getListProduct = (req, res, next) => {
    
    Product.findAll()
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
    
   req.user
    .getCart()
    .then(cart => {
        return cart.getProducts();
    })
    .then(products => {
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
    let product, fetchedCart, newQuantity = 1;
    req.user
        .getCart()
        .then(cart => {
            fetchedCart = cart;
            return cart.getProducts({where: {id: productId}});
        })
        .then(products => {
            if(products.length > 0){
                product = products[0];
            }
            if (product) {
                const oldQuantity = product.cartItem.quantity;
                newQuantity = oldQuantity + +1;
                return product;
            }
            return Product.findByPk(productId);
        })
        .then(product => {
            return fetchedCart.addProduct(product, {through : {
                quantity : newQuantity
            }});
        })
        .then(() => {
            res.redirect('/cart');
        })
        .catch(error => {
            console.log(error);
        })
};

// Here we will delete the cart items
exports.deleteCartItem = (req, res, next) => {
    const productId = req.body.productId;
    req.user
        .getCart()
        .then(cart => {
            return cart.getProducts({where : { id : productId}});
        })
        .then(products => {
            const product = products[0];
            return product.cartItem.destroy();
        })
        .then(result => {
            res.redirect('/cart');
        })
        .catch(error => {
            console.log(error);
        })
};

// Here we will show the checkout page to our user 
exports.getCheckout = (req, res, next) => {
    
    const products = Product.fetchAll(products => {
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
    Product.findByPk(prodId)
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