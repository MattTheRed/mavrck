MAVRCK CODE CHALLENGE
===============================

Clone the repo, make sure you have node installed and run:

```
http-server
```


Requirements
=============
Please build a basic marketplace with two web pages using AngularJS, Bootstrap, and HTML5/CSS3. The required pages include:
- ~~(1) login page~~
- ~~(2) product page. You should build the marketplace so that it may accept a RESTful API endpoint, that has hard a coded /products route that you design.~~
- ~~It should also be responsive to mobile browsers.~~
-- Update the header navigation; hide/show the menu
Login Page requirements:
- ~~Form with input fields for a username, password and login button.~~
- ~~The form should accept any username between 4-20 characters and any password 8-20 characters.~~
- ~~The username entered on the login form should be saved and re-displayed on the navigation/menu of the product page, next to the shopping cart icon~~
- ~~Move user details to a sevice + use locationStorage for persisistence~~
- UX: Style the validation errors

Product Page Requirements:
- Navigation with
  - ~~(1) search field that filters products based on keyword search;~~
  - ~~(2) filter for mens and women's products;~~
  - ~~(3) shopping cart icon displaying number of items in the cart.~~
  - ~~4 products, each with an image, title, short description, price, 1-to-5 star rating and category (men's || women's).~~
- The customer should be able to:
  - ~~(1) filter the products by price, rating or category;~~
    - ~~price filter should be ranges, break into separate filter~~
    - ~~star filter should be >, break into separate filter~~
  - ~~(2) add a product to a cart which increments count in the navigation;~~
  - (3) rate the product on a 1-to-5 star scale;
  - ~~(4) leave a comment on a product.~~

Bonus Items:
- Including unit tests using Karma or Jasmine
- Adding to cart changes a Favicon to show the number of items in the cart
- Adding Social Sharing buttons that enable the user to share the product on Facebook and Twitter
