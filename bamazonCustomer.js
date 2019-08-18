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
    connection.query("SELECT item_id, product_name, price FROM products", function (err, res) {
        if (err) throw err;
        res.forEach(products => {
            console.log(`Item ID: ${products.item_id} | Product Name: ${products.product_name} | Price: ${products.price}`);
        });
        // console.log(res);
        inquirerFunction();
    });
}

var inquirerFunction = function() {
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
        .then(function (res) {
            // console.log(`Item: ${res.itemPurchased} and quantity of ${res.quantity}`)
            queryAndUpdateProduct(res.itemPurchased, res.quantity);
        })
};


// function to display products and let user purchase one
function queryAndUpdateProduct(itemPurchased, quantity) {
    connection.query("SELECT * FROM products WHERE item_id = ?", [itemPurchased], function (err, res) {
        if (err) throw err;
        if (quantity > res[0].stock_quantity) {
            console.log(`Sorry, we do not have enough items in stock to meet you order`);
            console.log(`Current Stock: ${res[0].stock_quantity}`);
        } else {
            var totalPrice = quantity * res[0].price;
            var updatedQuantity = res[0].stock_quantity - quantity;
            console.log(`Thank you for your order!`);
            console.log(`Order Total: $${totalPrice}`);
        }
        connection.query("UPDATE products SET stock_quantity = ? WHERE item_id = ?", [updatedQuantity, itemPurchased], function (err) {
            if (err) throw err;
        })
    });
};


connection.connect(function (err) {
    if (err) throw err;
    console.log(`Connection ID ${connection.threadId}`);
    displayProducts();

});