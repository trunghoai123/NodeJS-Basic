const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('shop/product-list', {
      // default your are in views folder
      prods: products,
      pageTitle: 'Products',
      path: '/products',
    });
  });
};
exports.getIndex = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('shop/index', {
      // default your are in views folder
      prods: products,
      pageTitle: 'Shop',
      path: '/',
    });
  });
};
exports.getCart = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('shop/cart', {
      // default your are in views folder
      prods: products,
      pageTitle: 'Cart',
      path: '/cart',
    });
  });
};
exports.postCart = (req, res, next) => {
  console.log(req.body.productId);
  res.redirect('/cart');
  // Product.fetchAll((products) => {
  //   res.render('shop/cart', {
  //     // default your are in views folder
  //     prods: products,
  //     pageTitle: 'Cart',
  //     path: '/cart',
  //   });
  // });
};
exports.getCheckout = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('shop/checkout', {
      // default your are in views folder
      prods: products,
      pageTitle: 'Checkout',
      path: '/checkout',
    });
  });
};
exports.getOrders = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('shop/orders', {
      // default your are in views folder
      prods: products,
      pageTitle: 'Orders',
      path: '/orders',
    });
  });
};
exports.getProductDetail = (req, res, next) => {
  Product.findProduct(req.params.productId, (product) => {
    res.render('shop/product-detail', {
      // default your are in views folder
      prod: product,
      pageTitle: 'Details',
      path: '/products',
    });
  });

};
