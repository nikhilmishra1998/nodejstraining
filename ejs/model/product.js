const fs = require('fs');
const path = require('path');

const dirPath = path.join(
    path.dirname( process.mainModule.filename), // to get the current directory name
    'data',
    'products.json'
);
//console.log(dirPath);
const getFileContent = callback => {
    fs.readFile(dirPath, (error, fileContent) =>{
        if (error)
            callback([]);
        else
            callback(JSON.parse(fileContent));
    });
};
module.exports = class Product {
    constructor (title, imageUrl, description, price) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save() {
        this.id = Math.random().toString();
        getFileContent(products => {
            products.push(this);
            //console.log(products);
            fs.writeFile(dirPath, JSON.stringify(products), error => {
                if (error)
                    console.log(error);
            });
        });
    }

    static fetchAll(callback) {
        return getFileContent(callback);
    }

    static findDataByID (id, callback) {
        getFileContent(products => {
            const product = products.find(p => p.id == id);
            return callback(product);
        });
    }
}