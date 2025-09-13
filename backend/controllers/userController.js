const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET /api/restaurants
exports.getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await prisma.restaurant.findMany({
      include: {
        menu: true,
      },
    });
    res.status(200).json({ restaurants });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/restaurants/:id
exports.getRestaurantDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const restaurant = await prisma.restaurant.findUnique({
      where: { id },
      include: { menu: true },
    });

    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    res.status(200).json({ restaurant });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /api/orders
exports.placeOrder = async (req, res) => {
  const { items, restaurantId, totalPrice } = req.body; 

  try {
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Order must include at least one item' });
    }

    if (typeof totalPrice !== 'number') {
      return res.status(400).json({ message: 'totalPrice must be a number' });
    }

    const order = await prisma.order.create({
      data: {
        userId: req.user.id,     // assuming you have user auth middleware
        restaurantId,
        totalPrice,
        items: {                 // Use the field name in your Prisma model, looks like 'items' not 'orderItems'
          create: items.map(item => ({
            foodItemId: item.foodItemId,
            quantity: item.quantity,
          })),
        },
      },
      include: {
        items: true,
      },
    });

    res.status(201).json({ message: 'Order placed successfully', order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getUserOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      where: { userId: req.user.id },
      include: {
        items: {                // changed here
          include: { foodItem: true },
        },
        restaurant: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
