require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/productModel')
const app = express()

const PORT = process.env.PORT || 3000
const MONGO_URL = process.env.MONGO_URL

app.use(express.json())

// routes

app.get('/', (req, res) => {
  res.send('Hello NODE API')

})


app.post('/products', async(req, res) => {
  try {
    const product = await Product.create(req.body)
    res.status(200).json(product)

  } catch(error){
    console.log(error.message);
    res.status(500).json({message: error.message})
  }

})
app.get('/products',async(req,res) => {
  try {
    const products = await Product.find({})
    res.status(200).json(products)
  }
  catch(error){
    res.status(500).json({message: error.message })
  }
})

app.get('/products/:id', async(req,res) => {
  try {
    const {id} = req.params
    const product = await Product.findById(id)
    res.status(200).json(product)

  }catch(error){
    res.status(500).json({message: error.message})
  }
})

app.put('/products/:id', async(req, res) => {

  try {
    const {id} = req.params
    const product = await Product.findByIdAndUpdate(id, req.body)
    if(!product){
      return res.status(400).json({message: `We cannot find a product with id ${id}`})
    }
    const updatedProduct = await Product.findById(id)
    res.status(200).json(updatedProduct)

  }catch(error){
    res.status(500).json({message: error.message})
  }
})

app.delete('/products/:id', async(res,req) => {
  try {
    const id = req.params
    const product = await Product.findByIDAndDelete(id)
    if(!product){
      res.status(400).json(`There is no product with this ${id}`)
    }
    res.status(200).json(product)

  }catch(error){
    res.status(404).json({message: error.message})
  }

})


mongoose.
connect(MONGO_URL)
.then(() => {
    console.log('connected to MongoDB')
    app.listen(PORT, ()=> {
        console.log(`Node API app is running on port ${PORT}`)
    });
}).catch((error) => {
    console.log(error)
})
