const pathLb = require('path');
const fs = require('fs');

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
  constructor(title, imageUrl, description, price) {
    this.id = Math.random().toString();
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }
  
  save() {
    getProductsFromFile((products) => {
      products.push(this);
      fs.writeFile(path, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
  }

  static fetchAll(callback) {
    getProductsFromFile(callback);
  }

  static findProduct(productId, callback){
    getProductsFromFile((products) => {
      const product  = products.find((prod) => prod.id === productId);
      callback(product);
    })
  }

  
};
