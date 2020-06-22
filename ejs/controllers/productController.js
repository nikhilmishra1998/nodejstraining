const Products = require('./../model/product');

// Here we will show the add product page to the client.
exports.getAddProduct = (req, res, next) => {
    res.render(
        'add-product', 
        {
            pageTitle   : 'Add Products', 
            page        : 'Add Product'
        }
    );
};


// Here we will add product in server side to use data further.
exports.postAddProduct = (req, res, next) => {
    const product = new Products(req.body.title);
    product.save();
    res.redirect('/');
};

// Here we will show the product to our user 
exports.getListProduct = (req, res, next) => {
    const products = Products.fetchAll();
    res.render(
        'shop', 
        {
            pageTitle   : 'My shop', 
            prods       : products, 
            page        :  'Shop'
        }
    );
};