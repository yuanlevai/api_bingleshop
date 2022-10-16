const express = require('express');
const router = express.Router();
const is_admin = require('../../middlewares/admin')

const userController = require('../../controllers/userController')

router.get('/',  userController.list);
router.get('/:id', userController.getById);


module.exports = router