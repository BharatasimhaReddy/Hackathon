const express = require('express');
const router = express.Router();
const foodController = require('../controllers/foodController');
const authMiddleware = require('../middlewares/authMiddleware'); // your auth middleware

// Public routes
router.get('/allFooditems', foodController.getAllFoodItems);
router.get('/allFooditems/:id', foodController.getFoodItemById);

// Protected routes (only authenticated users, possibly only restaurant owners or admins)
router.put('/updateFooditem/:id', authMiddleware, foodController.updateFoodItem);
router.delete('/deleteFooditem:id', authMiddleware, foodController.deleteFoodItem);

module.exports = router;
