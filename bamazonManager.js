var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Game0208!',
    database: 'bamazon'
});

// function to display all of the products in the terminal
var displayProducts = function () {
    connection.query("SELECT item_id, product_name, price, stock_quantity FROM products", function (err, res) {
        if (err) throw err;
        res.forEach(products => {
            console.log(`Item ID: ${products.item_id} | Product Name: ${products.product_name} | Price: ${products.price} | Stock: ${products.stock_quantity}`);
        });
        inquirerFunction();
    });
}

// function to display the products where the inventory is 5 or below
var viewLowInventory = function () {
    connection.query("SELECT item_id, product_name, stock_quantity FROM products WHERE stock_quantity <= 5", function (err, res) {
        if (err) throw err;
        res.forEach(products => {
            console.log(`Item ID: ${products.item_id} | Product Name: ${products.product_name} | Stock: ${products.stock_quantity}`);
        });
        inquirerFunction();
    });
}

// function to add stock to a selected item
var updateInventory = function () {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Enter the item ID of the item you want to add inventory to",
                name: "itemSelected"
            },
            {
                type: "number",
                message: "How many would you like to add to the inventory?",
                name: "quantity"
            }
        ])
        .then(function (res) {
            connection.query("SELECT item_id, stock_quantity FROM products WHERE item_id = ?", [res.itemSelected], function (err, response) {
                if (err) throw err;
                var stockToAdd = res.quantity;
                var currentStock = response[0].stock_quantity;
                console.log(`Adding stock: ${stockToAdd}`);
                console.log(`Current Stock: ${currentStock}`);
                // console.log(res.stock_quantity);
                var updatedQuantity = Number(stockToAdd) + Number(currentStock);
                connection.query("UPDATE products SET stock_quantity = ? WHERE item_id = ?", [Number(updatedQuantity), res.itemSelected], function (err) {
                    if (err) throw err;
                })
                inquirerFunction();
            });
        });
}

// function to add a brand new product to the database
var addProduct = function () {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Enter the name of the new product",
                name: "productName"
            },
            {
                type: "input",
                message: "Enter the Department for this product",
                name: "department"
            },
            {
                type: "number",
                message: "Enter the price of this item",
                name: "price"
            },
            {
                type: "number",
                message: "Enter the current stock of this item",
                name: "stock"
            }
        ])
        .then(function (res) {
            connection.query("INSERT INTO products (product_name, department_name, price, stock_quantity) " +
                "VALUES (?, ?, ?, ?)",
                [res.productName, res.department, res.price, res.stock],
                function (err) {
                    if (err) throw err;
                });
                inquirerFunction();
        });
}

// function to start the application, presenting the user with some options
var inquirerFunction = function () {
    inquirer
        .prompt([
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
            } else if (res.request === 'View Low Inventory') {
                viewLowInventory();
            } else if (res.request === 'Add to Inventory') {
                updateInventory();
            } else if (res.request === 'Add New Product') {
                addProduct();
            };
        });
};

connection.connect(function (err) {
    if (err) throw err;
    console.log(`Connection ID ${connection.threadId}`);
    inquirerFunction();
});