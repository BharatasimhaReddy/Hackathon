const { prisma } = require("../config/db");

// -------------------- Get All Food Items --------------------
exports.getAllFoodItems = async (req, res) => {
  try {
    const foodItems = await prisma.foodItem.findMany({
      include: { restaurant: true },
    });
    res.status(200).send({ foodItems, status: true });
  } catch (error) {
    res.status(500).send({ message: error.message, status: false });
  }
};

// -------------------- Get Food Item Details --------------------
exports.getFoodItemById = async (req, res) => {
  const { id } = req.params;

  try {
    const foodItem = await prisma.foodItem.findUnique({
      where: { id },
      include: { restaurant: true },
    });

    if (!foodItem) 
      return res.status(404).send({ message: "Food item not found", status: false });

    res.status(200).send({ foodItem, status: true });
  } catch (error) {
    res.status(500).send({ message: error.message, status: false });
  }
};

// -------------------- Update Food Item --------------------
exports.updateFoodItem = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, image, available } = req.body;

  try {
    const updatedFoodItem = await prisma.foodItem.update({
      where: { id },
      data: { name, description, price, image, available },
    });

    res.status(200).send({ message: "Food item updated", status: true, foodItem: updatedFoodItem });
  } catch (error) {
    res.status(500).send({ message: error.message, status: false });
  }
};

// -------------------- Delete Food Item --------------------
exports.deleteFoodItem = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.foodItem.delete({ where: { id } });
    res.status(200).send({ message: "Food item deleted", status: true });
  } catch (error) {
    res.status(500).send({ message: error.message, status: false });
  }
};
