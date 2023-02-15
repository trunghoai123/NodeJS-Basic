const express = require('express');

const productController = require('../controllers/product');

const router = express.Router();


// /admin/add-product => GET
router.get('/add-product', productController.getAddProduct);

// /admin/add-product => POST
router.post('/add-product', productController.postAddProduct);

exports.routes = router;
