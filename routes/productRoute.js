const express = require('express')
const Product = require('../models/productModel')
const {getProducts, getProduct,  getProductsById, updateProducts, deleteProduct} = require('../controllers/productController')

const router = express.Router()


router.get('/', getProducts)

router.post('/', getProduct)

router.get('/:id', getProductsById)

router.put('/:id', updateProducts)

router.delete('/:id', deleteProduct)

module.exports = router

