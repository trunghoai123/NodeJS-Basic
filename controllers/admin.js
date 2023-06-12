const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    // your are default in views folder
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
  req.user
    .createProduct({
      title: title,
      price: price,
      imageUrl: imageUrl,
      description: description,
    })
    .then((data) => {
      console.log(data);
      res.redirect('/admin/products');
    })
    .catch((err) => {
      console.log(err);
    });
  // Product
  //   .create({
  //     title: title,
  //     price: price,
  //     imageUrl: imageUrl,
  //     description: description,
  //   })
  //   .then((data) => {
  //     console.log(data);
  //     res.redirect('/admin/products');
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
};

exports.getEditProduct = (req, res, next) => {
  const editting = req.query.edit;
  const productId = req.params.productId;
  if (!editting) {
    return res.redirect('/');
  }
  Product.findByPk(productId)
    .then((data) => {
      if (!data) {
        res.redirect('/');
      }
      res.render('admin/edit-product', {
        // default your are in views folder
        pageTitle: 'Edit Products',
        path: '/admin/edit-product',
        editting,
        product: data,
      });
    })
    .catch((err) => {
      console.log(err);
      res.redirect('/');
    });
};

exports.postEditProduct = (req, res, next) => {
  const id = req.body.productId;
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  Product.update(
    {
      price,
      title,
      description,
      imageUrl,
    },
    { where: { id: id } }
  )
    .then((rs) => {
      res.redirect('/');
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postDeleteProduct = (req, res, next) => {
  // Product.deleteById(req.body.productId);
  Product.destroy({ where: { id: req.body.productId } })
    .then((rs) => {
      res.redirect('/admin/products');
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getProducts = (req, res, next) => {
  req.user
    .getProducts()
    .then((data) => {
      res.render('admin/products', {
        // default your are in views folder
        prods: data,
        pageTitle: 'Admin Products',
        path: '/admin/products',
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
