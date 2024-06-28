create database ecommerce;

use ecommerce;

create table Users(
	id integer primary key auto_increment,
    name varchar(255) not null,
    email nvarchar(320) not null
);

create table Orders(
	id integer primary key auto_increment,
    amount decimal not null,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    user_id int,
    constraint FK_UserId FOREIGN KEY (user_id) REFERENCES Users(id)
);

create table Products(
    id int primary key auto_increment,
    name varchar(255) not null,
    price decimal not null,
    category varchar(255) not null
);

create table order_chair(
    id int primary key auto_increment,
    order_id int not null,
    chair_id int not null,
    quantity int not null,
    constraint FK_OrderId FOREIGN KEY (order_id) REFERENCES Orders(id),
    constraint FK_ChairId FOREIGN KEY (chair_id) REFERENCES Products(id)
);

create table order_table(
    id int primary key auto_increment,
    order_id int not null,
    table_id int not null,
    quantity int not null,
    FOREIGN KEY (order_id) REFERENCES Orders(id),
    constraint FK_TableId FOREIGN KEY (table_id) REFERENCES Products(id)
);

create table order_top(
    id int primary key auto_increment,
    order_id int not null,
    top_id int not null,
    quantity int not null,
    FOREIGN KEY (order_id) REFERENCES Orders(id),
    constraint FK_TopId FOREIGN KEY (top_id) REFERENCES Products(id)
);

INSERT INTO Products(name, price, category)
VALUES
('Lounge Chair', 2000, "Chairs"),
('Dining Chair', 1800, "Chairs"),
('Table1', 3000, "Table"),
('Table2', 3200, "Table"),
('Table3', 3100, "Table"),
('Dining Top', 900, "Top");