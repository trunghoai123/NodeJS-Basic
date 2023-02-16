const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/add-product', {// your are default in views folder
    pageTitle: 'Add Product',
    path: '/admin/add-product',  
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const description = req.body.description;
  const price = req.body.price;
  const product = new Product(title, imageUrl, description, price);
  product.save();
  res.redirect('/');
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll(
    (products) => {
      res.render('admin/products', { // default your are in views folder
        prods: products,
        pageTitle: 'Admin Products',
        path: '/admin/products', 
      });
    }
  );
};
