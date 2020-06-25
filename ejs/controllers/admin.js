const Products = require('../model/product');

// Here we will show the add product page to the client.
exports.getAddProduct = (req, res, next) => {
    res.render(
        'admin/add-product', 
        {
            pageTitle   : 'Add Products', 
            page        : 'Add Product'
        }
    );
};

// Here we will show the add product page to the client.
exports.getAllProduct = (req, res, next) => {

    const products = Products.fetchAll(products => {
        res.render(
            'admin/products',
            {
                pageTitle   : 'Admin all products',
                prods       : products, 
                page        : 'Admin Products'
            }
        );
    });
};


// Here we will add product in server side to use data further.
exports.postAddProduct = (req, res, next) => {
    
    const title         = req.body.title;
    const imageUrl      = req.body.imageUrl;
    const description   = req.body.description;
    const price         = req.body.price;
    const product       = new Products(title, imageUrl, description, price);
    product.save();
    res.redirect('/products');
};