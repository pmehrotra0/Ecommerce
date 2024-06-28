import mysql from 'mysql2';
import dotenv from 'dotenv';

let ProductSpecs = ['id', 'name', 'price', 'category'];

dotenv.config();

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
}).promise()

export async function getProductList(){
    const [res] = await pool.query('Select * from Products');
    return res;
}

export async function getProductListByCategory(category){
    const [res] = await pool.query('select * from Products where category=?', [category]);
    return res;
}

export async function addNewUser(name, email){
    const [res] = await pool.query(`
        Insert into Users(name, email) values(? , ?)
    `, [name, email])
    const id = res.insertId;
    return id;
}

export async function getUserDetails(name, email){
    const [res] = await pool.query(`Select * from users where name=? and email=?`, [name, email]);
    return res
}

export async function addNewOrder(amount, userId){
    const [res] = await pool.query(`
        Insert into Orders(amount, user_id) values(? , ?)
    `, [amount, userId])
    const id = res.insertId;
    return id;
}

export async function addOrderDetails(id, OrderId, quantity, category ){
    if(category.toLowerCase() === 'chairs'){
        const [res] = await pool.query(`
            Insert into order_chair(chair_id, order_id, quantity) values(? , ?, ?)
            `, [id, OrderId, quantity])
        const oid = res.insertId;
        return oid;
    }
    else if(category.toLowerCase() === 'top'){
        const [res] = await pool.query(`
            Insert into order_top(top_id, order_id, quantity) values(? , ?, ?)
            `, [id, OrderId, quantity])
        const oid = res.insertId;
        return oid;
    }
    else if(category.toLowerCase() === 'table'){
        const [res] = await pool.query(`
            Insert into order_table(table_id, order_id, quantity) values(? , ?, ?)
            `, [id, OrderId, quantity])
        const oid = res.insertId;
        return oid;
    }
    return -1;
}

export async function getOrderDetails(id){
    const [res] = await pool.query('select * from orders inner join users on orders.user_id = users.id where orders.id=?', [id]);
    return res[0];
}

export async function getOrderProductDetails(id){
    const [chairs] = await pool.query('select products.id, name, price, category, quantity from orders inner join order_chair on orders.id = order_chair.order_id inner join products on order_chair.chair_id = products.id where orders.id=?', [id]);
    const [table] = await pool.query('select products.id, name, price, category, quantity from orders inner join order_table on orders.id = order_table.order_id inner join products on order_table.table_id = products.id where orders.id=?', [id]);
    const [top] = await pool.query('select products.id, name, price, category, quantity from orders inner join order_top on orders.id = order_top.order_id inner join products on order_top.top_id = products.id where orders.id=?', [id]);
    return [...chairs, ...table, ...top];
}