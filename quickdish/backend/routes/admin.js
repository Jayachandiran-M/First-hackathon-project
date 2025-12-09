const express = require('express');
const router = express.Router();

// Get all orders (admin)
router.get('/orders', async (req, res) => {
  try {
    const orders = [
      {
        orderId: 'ORD123456',
        customer: 'John Doe',
        restaurant: 'Spicy Delight',
        totalAmount: 42.95,
        status: 'delivered',
        date: '2024-01-15'
      },
      {
        orderId: 'ORD123457',
        customer: 'Jane Smith',
        restaurant: 'Pizza Palace',
        totalAmount: 28.99,
        status: 'preparing',
        date: '2024-01-16'
      }
    ];
    
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all restaurants (admin)
router.get('/restaurants', async (req, res) => {
  try {
    const restaurants = [
      {
        id: 1,
        name: "Spicy Delight",
        owner: "Raj Sharma",
        status: "active",
        totalOrders: 1245,
        rating: 4.5
      },
      {
        id: 2,
        name: "Pizza Palace",
        owner: "Mario Rossi",
        status: "active",
        totalOrders: 987,
        rating: 4.3
      }
    ];
    
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all drivers
router.get('/drivers', async (req, res) => {
  try {
    const drivers = [
      {
        id: 1,
        name: "John Driver",
        phone: "+1 (555) 123-4567",
        status: "active",
        rating: 4.8,
        deliveries: 245
      },
      {
        id: 2,
        name: "Mike Rider",
        phone: "+1 (555) 987-6543",
        status: "active",
        rating: 4.6,
        deliveries: 189
      }
    ];
    
    res.json(drivers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;