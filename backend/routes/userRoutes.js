const express = require("express");
const router = express.Router();
const { authenticateToken } = require('../middleware/authMiddleware');
const userController = require('../controllers/userController');
const { userRegister, userLogin } = require('../controllers/authController');

module.exports = router;

router.post('/register',userRegister)
router.post('/login',userLogin)
router.get('/restaurants', authenticateToken, userController.getAllRestaurants);
router.get('/restaurants/:id', authenticateToken, userController.getRestaurantDetails);
router.post('/order', authenticateToken, userController.placeOrder);
router.get('/orders/my', authenticateToken, userController.getUserOrders);

module.exports = router;

