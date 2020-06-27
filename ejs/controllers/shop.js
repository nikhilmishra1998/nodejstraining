const Products = require('../model/product');
const Cart = require('../model/cart');

// Here we will show the product to our user 
exports.getListProduct = (req, res, next) => {
    
    Products.fetchAll()
        .then(([products, fieldData]) => { // this is next generation js syntax where we break an array to their components
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
    
    Cart.getCartItems(cart => {
        Products.fetchAll(products => {
            const cartProduct = [];
            for (const product of products) {
                const cartProdutData = cart.products.find(p => p.id === product.id);
                if (cartProdutData) {
                    cartProduct.push({productData:product, qty: cartProdutData.qty});
                }
            }
            res.render(
                'shop/cart', 
                {
                    pageTitle   : 'Cart-My shop', 
                    cart        : cartProduct, 
                    page        :  'Cart'
                }
            );
        });     
    });
    
};

exports.postCart = (req, res, next) => {
    
    const productId = req.body.productId;
    
    Products.findDataByID(productId, product => {
        Cart.addToCart(productId, product.price);
    });
    res.redirect('/cart');
};

// Here we will delete the cart items
exports.deleteCartItem = (req, res, next) => {
    const productId = req.body.productId;
    Products.findDataByID(productId, product => {
        Cart.deleteCartItem(productId, product.price);
        return res.redirect('/cart');
    });
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
    Products.findDataByID(prodId)
        .then( ([product]) => {
            res.render(
                'shop/product-detail', 
                {
                    pageTitle   : 'Product Detail-My shop', 
                    product     : product[0], 
                    page        :  'Pd'
                }
            );
        })
        .catch(error => console.log(error));
};