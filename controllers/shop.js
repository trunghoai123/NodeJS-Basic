const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then((data) => {
      res.render('shop/product-list', {
        prods: data,
        pageTitle: 'Products',
        path: '/products',
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getIndex = (req, res, next) => {
  Product.findAll()
    .then((data) => {
      res.render('shop/index', {
        prods: data,
        pageTitle: 'Shop',
        path: '/',
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// exports.getCart = (req, res, next) => {
//   Product.fetchAll((products) => {
//     res.render('shop/cart', {
//       // default your are in views folder
//       prods: products,
//       pageTitle: 'Cart',
//       path: '/cart',
//     });
//   });
// };

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  let fetchedCart;
  let newQuantity = 1;
  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: prodId } });
    })
    .then((products) => {
      let product;
      if (products.length > 0) {
        product = products[0];
      }
      if (product) {
        const oldQuantity = product.cartItem.quantity;
        newQuantity = oldQuantity + 1;
        return product;
      }
      return Product.findByPk(prodId);
    })
    .then((product) => {
      return fetchedCart.addProduct(product, {
        through: { quantity: newQuantity },
      });
    })
    .then(() => {
      res.redirect('/');
    })
    .catch((err) => {
      console.log(err);
    });
  // Product.findById(req.body.productId, (product) => {
  //   Cart.addProduct(product.id, product.price);
  // });
  // res.redirect('/cart');
};

exports.getCart = (req, res, next) => {
  req.user
    .getCart()
    .then((cart) => {
      return cart.getProducts();
    })
    .then((products) => {
      res.render('shop/cart', {
        products: products,
        pageTitle: 'cart',
        path: '/cart',
      });
    })
    .catch((err) => {});
};

exports.postDeleteCart = (req, res, next) => {
  const productId = req.body.productId;
  if (productId) {
    Product.findById(productId, (product) => {
      Cart.deleteById(productId, product.price);
      res.redirect('/cart');
    });
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
  Product.findByPk(req.params.productId)
    .then((data) => {
      res.render('shop/product-detail', {
        prod: data.dataValues,
        pageTitle: 'Details',
        path: '/products',
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
