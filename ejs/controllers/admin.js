const Products = require('../model/product');
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
    Product.create({
        title: title,
        price: price,
        imageUrl: imageUrl,
        description: description
    })
        .then(result => {
            console.log(result);
        })
        .catch(error => {
            console.log(error);
        });
    return res.redirect('/admin/products');
};

// Here we will edit the added product.
exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit === 'true';
    const productID = req.params.productId;
    if ( editMode) {
        Products.findByPk(productID)
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
    Product.findByPk(productId)
        .then(product => {
            product.title = updatedTitle,
            product.price = updatedPrice,
            product.imageUrl = updatedImageUrl,
            product.description = updatedDesc
            return product.save();
        })
        .then(result => {
            console.log('Updated Successfully');

            return res.redirect('/admin/products');
        })
        .catch(error => {
            console.log(error);
        });
};

// Here we will show the product list page to the client.
exports.getAllProduct = (req, res, next) => {

    Products.findAll()
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
    Product.findByPk(productId)
        .then(product => {
            return product.destroy();
        })
        .then(result => {
            console.log('Product Deleted');
            return res.redirect('/admin/products');
        })
        .catch(error => {
            console.log(error);
        });
};