const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {// your are default in views folder
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editting: false, 
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const description = req.body.description;
  const price = req.body.price;
  const product = new Product(null, title, imageUrl, description, price);
  product.save();
  res.redirect('/');
};

exports.getEditProduct = (req, res, next) => {
  const editting = req.query.edit;
  const productId = req.params.productId;
  if(!editting){
    return res.redirect('/');
  }
  Product.findById(productId, (product) => {
    if(!product){
      res.redirect('/');
    }
    res.render('admin/edit-product', { // default your are in views folder
      pageTitle: 'Edit Products',
      path: '/admin/edit-product', 
      editting,
      product,
    });
  });
};
exports.postEditProduct = (req, res, next) => {
  const id = req.body.productId;
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(id, title, imageUrl, description, price);
  product.save();
  res.redirect('/');
};

exports.postDeleteProduct = (req, res, next) => {
  Product.deleteById(req.body.productId);
  res.redirect('/admin/products');
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



// exports.getProducts = (req, res, next) => {
//   Product.fetchAll(
//     (products) => {
//       res.render('admin/products', { // default your are in views folder
//         prods: products,
//         pageTitle: 'Admin Products',
//         path: '/admin/products', 
//       });
//     }
//   );
// };
