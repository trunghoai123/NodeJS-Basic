const pathLb = require('path');
const fs = require('fs');
const Cart = require('../models/cart');
const db = require('../util/database');

const path = pathLb.join(pathLb.dirname(process.mainModule.filename), 'data', 'products.json');
const getProductsFromFile = (callback) => {
  fs.readFile(path, (err, fileContent) => {
    if(err){  
      callback([]);
    }
    else{
      callback(JSON.parse(fileContent));
    }
  });
}

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }
  
  save() {
    return db.execute(
      'INSERT INTO products (title, price, description, imageUrl) values(?,?,?,?)',
      [this.title, this.price, this.description, this.imageUrl]
    );
    // getProductsFromFile((products) => {
    //   const updatedProducts = [...products];
    //   if(this.id){
    //     const indexUpdatedProduct = products.findIndex(p => p.id === this.id)
    //     updatedProducts[indexUpdatedProduct] = this;
    //   }
    //   else{
    //     this.id = Math.random().toString();
    //     updatedProducts.push(this);
    //   }
    //   fs.writeFile(path, JSON.stringify(updatedProducts), (err) => {
    //     console.log(err)
    //   });
    // });
  }

  static fetchAll() {
    return db.execute('SELECT * FROM products');
  }

  static deleteById(productId){
    getProductsFromFile((products) => {
      const deletingProduct = products.find(p => p.id === productId);
      const updatedProducts = products.filter(p => p.id !== productId);
      fs.writeFile(path, JSON.stringify(updatedProducts), (err) => {
        Cart.deleteById(productId, deletingProduct.price);
      });
    })
  }

  static findById(productId) {
    return db.execute('SELECT * FROM products WHERE products.id = ?', [productId]);
  }
};
