const express = require('express')
const app = express()

// import repositories and use cases
const ProductRepository = require('../repository/productRepo')
const ProductUseCase = require('../usecase/productUseCase')
const CategoryRepository = require('../repository/categoryRepo');
const CategoryUseCase = require('../usecase/categoryUseCase');

// import routers
const productRouter = require('./routes/product')
const categoryRouter = require('./routes/category')

// init repositories and use cases
const categoryUC = new CategoryUseCase(new CategoryRepository())
const productUC = new ProductUseCase(new ProductRepository())


// json
app.use(express.json())

// inject use cases
app.use((req,res,next) => {
    req.categoryUC = categoryUC;
    req.productUC = productUC
    next()
})

app.get('', function (req, res) {
    // #swagger.ignore = true
    res.send('Hello World')
})

// init routers
app.use('/category', categoryRouter)
app.use('/item', productRouter)

// documentation
// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('../docs/docs.json');

// app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = app

