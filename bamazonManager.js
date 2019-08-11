var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Game0208!',
    database: 'bamazon'
});

var displayProducts = function() {
    connection.query("SELECT item_id, product_name, price, stock_quantity FROM products", function (err, res) {
        if (err) throw err;
        res.forEach(products => {
            console.log(`Item ID: ${products.item_id} | Product Name: ${products.product_name} | Price: ${products.price} | Stock: ${products.stock_quantity}`);
        });
        inquirerFunction();
    });
}

var inquirerFunction = function() {
    inquirer
        .prompt([
            // Here we create a basic text prompt.
            {
                type: "list",
                message: "Welcome Supervisor, please select an action to perform",
                name: "request",
                choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product']
            }
        ])
        .then(function (res) {
            if (res.request === 'View Products for Sale') {
                displayProducts();
            }
            inquirerFunction()
        })
        
};



connection.connect(function (err) {
    if (err) throw err;
    console.log(`Connection ID ${connection.threadId}`);
    inquirerFunction();

});