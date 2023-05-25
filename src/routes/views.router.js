import { Router } from "express";
import express from 'express';
import ProductManager from '../Dao/managers/productsManager.js';

const productManager = new ProductManager()

const router = Router();

router.get('/', async (req,res)=>{
    const products = await productManager.getProducts();
    res.render('home', { products });
});


export default router;