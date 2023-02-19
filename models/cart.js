const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'cart.json'
);

module.exports = class Cart {
  static addProduct(id, productPrice) {
    // Fetch the previous cart
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(fileContent);
      }
      // Analyze the cart => Find existing product
      const existingProductIndex = cart.products.findIndex(
        prod => prod.id === id
      );
      const existingProduct = cart.products[existingProductIndex];
      let updatedProduct;
      // Add new product/ increase quantity
      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty = updatedProduct.qty + 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, qty: 1 };
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice = cart.totalPrice + +productPrice;
      fs.writeFile(p, JSON.stringify(cart), err => {
        console.log(err);
      });
    });
  }

  static deleteById(productId, productPrice){
    fs.readFile(p, (err, fileContent) => {
      
      let updatedCart;

      if (!err) {
        updatedCart = JSON.parse(fileContent);
      }
      const deletingProduct = updatedCart.products.find(p => p.id === productId);
      if(deletingProduct){
        updatedCart.products = updatedCart.products.filter(p => p.id !== productId);

        updatedCart.totalPrice = updatedCart.totalPrice - productPrice * deletingProduct.qty;
  
        fs.writeFile(p, JSON.stringify(updatedCart), err => {
          console.log(err);
        }); 
      }
    });
  }

  static getProducts(callback) {
    fs.readFile(p, (err, fileContent) => {
      if(!err){
        callback(JSON.parse(fileContent));
      } 
      else{
        callback(null);
      }
    })
  }


};


// const pathLb = require('path');
// const fs = require('fs');
// const path = pathLb.join(pathLb.dirname(process.mainModule.filename), 'data', 'cart.json');

// module.exports = class Cart {
//    static addProduct(id, price){
//       fs.readFile(path, (err, fileContent) => {
//          let cart = { 
//             products: [],
//             totalPrice: 0 
//          };
//          if (!err) {
//             cart = JSON.parse(fileContent);
//          }
//          const existingProductIndex = cart.products.find(p => p.id === id);

//          const existingProduct = cart.products[existingProductIndex];
//          let updatedProduct;
         
//          if(existingProduct){
//             updatedProduct = { ... existingProduct };
//             updatedProduct.qty = updatedProduct + 1;
//             cart.products = [...cart.products];
//             cart.products[existingProductIndex] = updatedProduct;
//          }
//          else{
//             updatedProduct = {
//                id: id,
//                qty: 1,
//             }
//             cart.products = [...cart.products, updatedProduct];
//          }
//          cart.totalPrice = cart.totalPrice + +price;
//          fs.writeFile(path, JSON.stringify(cart), (err) => {
//             console.log(err);
//          })
//       });
//    }
// }

