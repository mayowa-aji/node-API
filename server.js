require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const productRoute = require('./routes/productRoute')
const errorMiddleWare = require('./middleware/errorMiddleware')
const cors = require('cors')

const app = express()

const PORT = process.env.PORT || 3000
const MONGO_URL = process.env.MONGO_URL

var corsOptions = {
  origin:'http://127.0.0.1:5173',
  optionsSuccessSatatus: 200
}

app.use(express.json())
app.use(cors(corsOptions))

app.use('/api/products', productRoute)

app.get('/', (req, res) => {
  res.send('Hello NODE JS')

})

app.use(errorMiddleWare)

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
