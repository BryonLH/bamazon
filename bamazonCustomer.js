var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Game0208!',
    database: 'bamazon'
});

function displayProducts() {
    connection.query("SELECT item_id, product_name, price FROM products", function (err, res) {
        if (err) throw err;
        res.forEach(products => {
            console.log(`Item ID: ${products.item_id} | Product Name: ${products.product_name} | Price: ${products.price}`);
        });
        // console.log(res);
    });
}
function inquirerFunction() {
    displayProducts()
    inquirer
        .prompt([
            // Here we create a basic text prompt.
            {
                type: "input",
                message: "Enter the item ID of the item you want to purchase?",
                name: "itemPurchased"
            },
            {
                type: "number",
                message: "How many would like to purchase?",
                name: "quantity"
            }
        ])
};




connection.connect(function (err) {
    if (err) throw err;
    console.log(`Connection ID ${connection.threadId}`);
    inquirerFunction();

});