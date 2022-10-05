const express = require('express');
const router = express.Router();
const authorize = require('../../middlewares/jwt')

const productController = require('../../controllers/productController')

router.get('/', productController.list);
router.get('/:id', productController.getById);
router.post('/create', productController.create)
router.put('/:id', productController.update)
router.delete('/:id', productController.delete)


module.exports = router