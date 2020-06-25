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
    constructor (title) {
        this.title = title;
    }

    save() {
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
}