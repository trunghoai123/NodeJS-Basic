const Product = require('../models/product');
const Cart = require('../models/cart');

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
  Product.findById(req.body.productId, (product) => {
    Cart.addProduct(product.id, product.price); 
  });
  res.redirect('/cart');
};

exports.getCart = (req, res, next) => {
  Cart.getProducts((cart) => {
    if(cart !== null){
      Product.fetchAll((products) => {
        const displayedCartProducts = [];
        for (let product of products){
          const cartProduct = cart.products.find(p => p.id === product.id);
          if(cartProduct){
            displayedCartProducts.push({ productData: product, qty: cartProduct.qty });
          }
        }
        res.render('shop/cart', {
          products: displayedCartProducts,
          pageTitle: 'cart',
          path: '/cart',
        });
      });
    }
  })
};

exports.postDeleteCart = (req, res, next) => {
  const productId = req.body.productId;
  if(productId){
    Product.findById(productId, (product) => {
      Cart.deleteById(productId, product.price);
      res.redirect('/cart');
    })
  }
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
  Product.findById(req.params.productId, (product) => {
    res.render('shop/product-detail', {
      // default your are in views folder
      prod: product,
      pageTitle: 'Details',
      path: '/products',
    });
  });
};
