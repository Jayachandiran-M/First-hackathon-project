const express = require('express');
const router = express.Router();

// Place new order
router.post('/', async (req, res) => {
  try {
    const { items, totalAmount, address, paymentMethod } = req.body;
    
    const order = {
      orderId: 'ORD' + Date.now(),
      items,
      totalAmount,
      address,
      paymentMethod: paymentMethod || 'cash',
      paymentStatus: 'pending',
      orderStatus: 'confirmed',
      estimatedDeliveryTime: new Date(Date.now() + 30 * 60000), // 30 minutes from now
      createdAt: new Date()
    };
    
    res.json({
      success: true,
      message: 'Order placed successfully',
      order
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get order by ID
router.get('/:orderId', async (req, res) => {
  try {
    const order = {
      orderId: req.params.orderId,
      items: [
        { name: "Chicken Tikka Masala", price: 14.99, quantity: 2 },
        { name: "Garlic Naan", price: 3.99, quantity: 3 }
      ],
      totalAmount: 42.95,
      address: "123 Main St, New York, NY",
      orderStatus: "confirmed",
      estimatedDeliveryTime: new Date(Date.now() + 25 * 60000),
      restaurant: "Spicy Delight",
      driver: {
        name: "John Driver",
        phone: "+1 (555) 123-4567",
        rating: 4.8
      }
    };
    
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user's order history
router.get('/user/:userId', async (req, res) => {
  try {
    const orders = [
      {
        orderId: 'ORD123456',
        date: '2024-01-15',
        restaurant: 'Spicy Delight',
        items: ['Chicken Tikka Masala', 'Garlic Naan'],
        totalAmount: 42.95,
        status: 'delivered'
      },
      {
        orderId: 'ORD123457',
        date: '2024-01-10',
        restaurant: 'Pizza Palace',
        items: ['Margherita Pizza', 'Garlic Bread'],
        totalAmount: 28.99,
        status: 'delivered'
      }
    ];
    
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update order status
router.put('/:orderId/status', async (req, res) => {
  try {
    const { status } = req.body;
    
    res.json({
      success: true,
      message: `Order status updated to ${status}`,
      orderId: req.params.orderId,
      status
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;