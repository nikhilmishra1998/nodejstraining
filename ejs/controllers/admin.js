const Product = require('../model/product');

// Here we will show the add product page.
exports.getAddProduct = (req, res, next) => {
    res.render(
        'admin/edit-product', 
        {
            pageTitle   : 'Add Products', 
            page        : 'Add Product',
            editMode    : false
        }
    );
};

// Here we will add product in server side to use data further.
exports.postAddProduct = (req, res, next) => {
    
    const title         = req.body.title;
    const imageUrl      = req.body.imageUrl;
    const description   = req.body.description;
    const price         = req.body.price;
    
    const product = new Product(title, price, imageUrl, description, null);
    product
        .save()
        .then(result => {
            console.log(result);
            return res.redirect('/admin/products');
        })
        .catch(error => {
            console.log(error);
        });
};

// Here we will edit the added product.
exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit === 'true';
    const productID = req.params.productId;
    if ( editMode) {
        Product.findById(productID)
            .then(product => {
                if (product) {
                    res.render(
                        'admin/edit-product', 
                        {
                            pageTitle   : 'Edit Product', 
                            page        : 'Edit Product',
                            editMode    : editMode,
                            product     : product
                        }
                    );  
                } else {
                    return res.redirect('/404');
                }
            })
            .catch(error => { console.log(error); });
    } else {
        return res.redirect('/404');
    }    
};

// We will update a product from here.
exports.postEditProduct = (req, res, next) => {
    
    // Getting the data from form.
    const productId         = req.body.productId;
    const updatedTitle      = req.body.title;
    const updatedImageUrl   = req.body.imageUrl;
    const updatedPrice      = req.body.price;
    const updatedDesc       = req.body.description;
    const product = new Product(updatedTitle, updatedPrice, updatedImageUrl, updatedDesc, productId);
    product
        .save()
        .then(result => {
            console.log(result);
            return res.redirect('/admin/products');
        })
        .catch(error => {
            console.log(error);
        });
};

// Here we will show the product list page to the client.
exports.getAllProduct = (req, res, next) => {

    Product
        .fetchAll()
        .then(products => {
            res.render(
                'admin/products',
                {
                    pageTitle   : 'Admin all products',
                    prods       : products, 
                    page        : 'Admin Products'
                }
            );
        })
        .catch(error => { console.log('Error to get product', error);});
};

// From here we delete product and cart if exists
exports.deleteProduct = (req, res, next) => {
    const productId = req.body.productId;
    Product.deleteById(productId)
        .then(() => {
            console.log('Product Deleted sucessfully');
            return res.redirect('/admin/products');
        })
        .catch(error => {
            console.log(error);
        });
};