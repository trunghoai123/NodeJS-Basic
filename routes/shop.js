const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const adminData = require('./admin');

const router = express.Router();

router.get('/', (req, res, next) => {
  //use pug template
  res.render('shop', { prods: adminData.products, docTitle: 'Shop' });

  // use basic html file
  // console.log(adminData);
  // res.sendFile(path.join(rootDir, 'views', 'shop.html'));
});

module.exports = router;
