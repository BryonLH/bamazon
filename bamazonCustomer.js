var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Game0208!',
    database: 'bamazon'
});


function inquirerFunction() {
    displayProducts();
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
                message: "How many would you like to purchase?",
                name: "quantity"
            }
        ])
        .then(function(res) {
            console.log(`Item: ${res.itemPurchased} and quantity of ${res.quantity}`)
        })
};

function displayProducts() {
    connection.query("SELECT item_id, product_name, price FROM products", function (err, res) {
        if (err) throw err;
        res.forEach(products => {
            console.log(`Item ID: ${products.item_id} | Product Name: ${products.product_name} | Price: ${products.price}`);
        });
        // console.log(res);
    });
}


connection.connect(function (err) {
    if (err) throw err;
    console.log(`Connection ID ${connection.threadId}`);
    inquirerFunction();

});