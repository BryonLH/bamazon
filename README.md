# bamazon

This Application uses Node.js, Inquirer and MySQL to present users with some actions to perform that query, update and insert into a database.

### How bamazonCustomer works
This application has 2 options to run.  Running bamazonCustomer will let the user order items and have the database updated to reflect the order.  Running bamazonManager will present the user with 4 options that will query, update or insert into the database.

### Instructions for using bamazonCustomer
Upon running bamazonCustomer, the user is shown the products in the database and asked to enter the item ID of the item they would like to purchase.  After making their selection, the order total is shown to the user and quantity ordered is removed from the stock quantity in the database.
![bamazonCustomer Screenshot](./assets/images/screenshots/bamazonCustomer.jpg)

### Instructions for using bamazonManager
Upon running bamazonManager, the user is presented with 4 options.
![bamazonManager Options to Perform Screenshot](./assets/images/screenshots/bamazonManager-options.jpg)
* View Products for Sale - This will query the database and present the list of products for sale.
![bamazonManager View Products for Sale Screenshot](./assets/imagess/creenshotscts that have a srtock quantity of 5 or below.
![bamazonManager View Low Inventory Screenshot](./assets/images/screenshots/bamazonManager-view-low-inventory.jpg)
* Add to Inventory - This will ask the the user to select an item ID and then enter an amount to add to the current stock available.
![bamazonManager Add New Product Screenshot](./assets/images/screenshots/bamazonManager-add-stock.jpg)\bamazonManager-view-products.jpg)
* View Low Inventory - This will query the database and present a list of produ
* Add New Product - This will ask the user to the enter a Product Name, Product Department, Price and Stock Quantity.  Data entered will then be inserted into the database.
![bamazonManager Add New Product Screenshot](./assets/images/screenshots/bamazonManager-add-product.jpg)

### Technologies used
* Javascript
* Node.js
* MySQL
* Inquirer
