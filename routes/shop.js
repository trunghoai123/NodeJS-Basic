const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();
// / => GET
router.get('/', shopController.getIndex);

// /products => GET
router.get('/products', shopController.getProducts);

// /cart => GET
router.get('/cart', shopController.getCart);

// /cart => post
router.post('/cart', shopController.postCart);

// /checkout => GET
router.get('/checkout', shopController.getCheckout);

// /orders => GET
router.get('/orders', shopController.getOrders);

// /products/:productId => GET
router.get('/products/:productId', shopController.getProductDetail);

// /cart/:productId => POST
router.post('/cart-delete-item', shopController.postDeleteCart);

module.exports = router;
