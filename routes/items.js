const express = require('express');
const router = express.Router();

const { getItems, addItem, deleteItem, updateItem } = require('../controllers/itemsController');

router.get('/', getItems);
router.post('/', addItem);
router.delete('/:id', deleteItem);
router.put('/:id', updateItem);

module.exports = router;