const Products = require('../model/product');

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
    const product       = new Products(null, title, imageUrl, description, price);
    product
        .save()
        .then(() => {})
        .catch(error => { console.log('error in adding product', error);});
    return res.redirect('/admin/products');
};

// Here we will edit the added product.
exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit === 'true';
    const productID = req.params.productId;
    if ( editMode) {
        Products.findDataByID(productID)
            .then(([product, fieldData]) => {
                if (product) {
                    res.render(
                        'admin/edit-product', 
                        {
                            pageTitle   : 'Edit Product', 
                            page        : 'Edit Product',
                            editMode    : editMode,
                            product     : product[0]
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
    
    // Creating new instance for updated product.
    const products = new Products(
        productId,
        updatedTitle,
        updatedImageUrl,
        updatedDesc,
        updatedPrice
    );
    
    products.save();
    return res.redirect('/admin/products');
};

// Here we will show the product list page to the client.
exports.getAllProduct = (req, res, next) => {

    Products.fetchAll()
        .then(([products, fieldData]) => {
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
    Products.deleteProductById(productId);
    return res.redirect('/admin/products');;
};