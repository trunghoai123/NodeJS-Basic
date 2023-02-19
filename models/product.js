const pathLb = require('path');
const fs = require('fs');
const Cart = require('../models/cart');

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
    getProductsFromFile((products) => {
      const updatedProducts = [...products];
      if(this.id){
        const indexUpdatedProduct = products.findIndex(p => p.id === this.id)
        updatedProducts[indexUpdatedProduct] = this;
      }
      else{
        this.id = Math.random().toString();
        updatedProducts.push(this);
      }
      fs.writeFile(path, JSON.stringify(updatedProducts), (err) => {
        console.log(err)
      });
    });
  }

  static fetchAll(callback) {
    getProductsFromFile(callback);
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

  static findById(productId, callback) {
    getProductsFromFile((products) => {
      const product  = products.find((prod) => prod.id === productId);
      callback(product);
    })
  }

};
