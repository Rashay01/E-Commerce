CREATE DATABASE ecommerce;
use ecommerce;

-- Creating the category table
CREATE TABLE category (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT
);

-- Creating the product table
CREATE TABLE product (
    id INT PRIMARY KEY AUTO_INCREMENT,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    categoryId INT,
    description TEXT,
    img VARCHAR(255),
    FOREIGN KEY (categoryId) REFERENCES category(id)
);

-- Creating the orderHistory table
CREATE TABLE orderHistory (
    id INT PRIMARY KEY AUTO_INCREMENT,
    dateTime DATETIME NOT NULL,
    productId INT,
    quantity INT NOT NULL,
    totalPerProduct DECIMAL(10, 2) NOT NULL,
    orderStatus VARCHAR(50) NOT NULL,
    FOREIGN KEY (productId) REFERENCES product(id)
);

-- Creating the cart table
CREATE TABLE cart (
    id INT PRIMARY KEY AUTO_INCREMENT,
    productId INT,
    quantity INT NOT NULL,
    totalPerProduct DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (productId) REFERENCES product(id)
);


INSERT INTO category (name, description) VALUES
('Jeans', 'Various styles and fits of jeans'),
('T-shirts', 'Casual and graphic T-shirts'),
('Jackets', 'Outerwear and jackets for all seasons'),
('Headwear', 'Hats, caps, and other headwear'),
('Shorts', 'Different styles of shorts for casual and sports wear'),
('Dresses', 'Various styles of dresses for different occasions');
