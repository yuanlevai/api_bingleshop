const express = require('express')
const router = express.Router()

const categoryController = require('../../controllers/categoryControllers')

router.get('/', categoryController.list)
router.get('/:id', categoryController.getById)
router.post('/', categoryController.create)
router.put('/:id', categoryController.update)
router.delete('/:id', categoryController.delete)

module.exports = router