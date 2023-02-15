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
  constructor(title) {
    this.title = title;
  }
  
  save() {
    getProductsFromFile((products) => {
      products.push(this);
      fs.writeFile(path, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
  }

  static fetAll(callback) {
    getProductsFromFile(callback);
  }
};
