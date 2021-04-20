const express = require('express')
const app = express()
const productsRoutes = require('../routes/products')
const frontRoutes = require('../routes/front')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/productos', productsRoutes)

app.use('/web', frontRoutes)

app.listen(8080)