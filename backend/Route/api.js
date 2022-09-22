const express = require('express');
const { createCategory, getAllCategory, getSingleCategory, deleteCategory, updateCategory } = require('../Controller/categoryController');
const { createProduct, getAllProduct, getSingleProduct, deleteProduct, updateProduct } = require('../Controller/productController');
const {signup, login, edit_user_profile, allUser } = require('../Controller/userController');
const protect = require('../Middleware/authMiddleware');
const Route = express.Router();

Route.post('/signup',signup)
Route.post('/login',login)
///edit_user_profile
Route.put('/edituser',protect,edit_user_profile)
//get all user
Route.get('/users/all',protect,allUser)

//category
Route.post('/category/create',createCategory)
Route.get('/category/all',getAllCategory)
Route.get('/category/single/:_id',getSingleCategory)
Route.delete('/category/delete/:_id',deleteCategory)
Route.put('/category/update/:_id',updateCategory)

//product
Route.post('/product/create',createProduct)
Route.get('/product/all',getAllProduct)
Route.get('/product/single/:_id',getSingleProduct)
Route.delete('/product/delete/:_id',deleteProduct)
Route.put('/product/update/:_id',updateProduct)








module.exports = Route