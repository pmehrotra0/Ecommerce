import express from 'express';
import cors from 'cors';
import { addNewOrder, addNewUser, addOrderDetails, getOrderDetails, getOrderProductDetails, getProductList, getProductListByCategory, getUserDetails } from './database.js';

const app = express();
app.use(express.json());
app.use(express.static('public'))
app.use(cors());

const API = process.env.API_URL

app.get(`${API}/products`, async(req, res) => {
    const {category} = req.query;
    let productList;
    if(category){
        productList = await getProductListByCategory(category);
    }
    else{
        productList = await getProductList();
    }
    if(productList.length === 0){
        res.status(204);
    }
    res.send(productList);
})

app.get(`${API}/product`, async(req, res) => {
    const filters = req.query;
    let productList;
    productList = await getFilteredProductList(filters); 
    if(productList.length === 0){
        res.status(204);
    } 

    res.send(productList);
})

app.post(`${API}/users`, async(req, res) => {
    const {name, email} = req.body;
    const info = await getUserDetails(name, email);
    if(info.length === 0 ){
        const id = await addNewUser(name, email);
        res.status(200).json({id, name, email});
    }
    else{
        res.json(info[0]);
    }
})

app.post(`${API}/orders`, async(req, res) => {
    const { amount, id, productDetails } = req.body;
    const OrderId = await addNewOrder(amount, id); 
    productDetails.forEach(async(product) => {
        const categoryId = await addOrderDetails(product.id, OrderId, product.quantity, product.category );
        if(categoryId === -1){
            res.status(204);
        }   
    })
    res.status(200).json({"OrderId": OrderId});
})

app.get(`${API}/orders/:id`, async(req, res) =>{ 
    const { id } = req.params;
    const result = await getOrderDetails(Number(id));
    const products = await getOrderProductDetails(Number(id));
    res.json({...result, products: products});

})

app.listen('8080', () => {
    console.log('server listening on port 8080');
})