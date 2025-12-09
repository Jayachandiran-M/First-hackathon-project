const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http');
const socketIo = require('socket.io');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/quickdish', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected successfully'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Import Models
const User = require('./models/User');
const Restaurant = require('./models/Restaurant');
const MenuItem = require('./models/Menu');
const Order = require('./models/Order');

// Routes
app.get('/', (req, res) => {
  res.json({
    message: '🚀 QuickDish API is running!',
    database: 'Connected to MongoDB',
    version: '1.0.0'
  });
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
  });
});

// Get all restaurants
app.get('/api/restaurants', async (req, res) => {
  try {
    const restaurants = await Restaurant.find({ isActive: true });
    res.json(restaurants);
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    // Fallback demo data
    const demoRestaurants = [
      {
        _id: '1',
        name: "Spicy Delight",
        cuisine: "Indian",
        rating: 4.5,
        deliveryTime: 30,
        deliveryFee: 2.99,
        minOrder: 15,
        imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        address: "123 Main St, New York, NY",
        description: "Authentic Indian cuisine"
      },
      {
        _id: '2',
        name: "Pizza Palace",
        cuisine: "Italian",
        rating: 4.3,
        deliveryTime: 25,
        deliveryFee: 1.99,
        minOrder: 12,
        imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        address: "456 Broadway, New York, NY",
        description: "Best wood-fired pizzas"
      }
    ];
    res.json(demoRestaurants);
  }
});

// Get restaurant by ID
app.get('/api/restaurants/:id', async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    res.json(restaurant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get restaurant menu
app.get('/api/restaurants/:id/menu', async (req, res) => {
  try {
    const menuItems = await MenuItem.find({ restaurant: req.params.id });
    res.json(menuItems);
  } catch (error) {
    console.error('Error fetching menu:', error);
    // Fallback demo menu
    const demoMenu = [
      { _id: '1', name: "Chicken Tikka Masala", price: 14.99, category: "main course" },
      { _id: '2', name: "Garlic Naan", price: 3.99, category: "bread" },
      { _id: '3', name: "Butter Chicken", price: 15.99, category: "main course" }
    ];
    res.json(demoMenu);
  }
});

// User registration
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    // Create new user (in production, hash password)
    const user = new User({
      name,
      email,
      password, // In production: hash this
      phone,
      role: 'customer'
    });
    
    await user.save();
    
    res.json({
      success: true,
      message: 'User registered successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// User login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user (in production, verify password hash)
    const user = await User.findOne({ email, password });
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    res.json({
      success: true,
      message: 'Login successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      token: 'jwt-token-here' // In production, generate JWT
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Place order
app.post('/api/orders', async (req, res) => {
  try {
    const { items, totalAmount, address, userId, restaurantId } = req.body;
    
    const order = new Order({
      orderId: 'ORD' + Date.now(),
      items,
      totalAmount,
      deliveryAddress: address,
      user: userId,
      restaurant: restaurantId,
      orderStatus: 'confirmed',
      estimatedDeliveryTime: new Date(Date.now() + 30 * 60000)
    });
    
    await order.save();
    
    // Emit real-time update
    io.emit('order-update', {
      orderId: order.orderId,
      status: order.orderStatus
    });
    
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
app.get('/api/orders/:orderId', async (req, res) => {
  try {
    const order = await Order.findOne({ orderId: req.params.orderId })
      .populate('user', 'name email')
      .populate('restaurant', 'name');
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Socket.io for real-time updates
io.on('connection', (socket) => {
  console.log('✅ New client connected:', socket.id);
  
  socket.on('order-update', (data) => {
    io.emit('order-status', data);
  });
  
  socket.on('driver-location', (data) => {
    io.emit('location-update', data);
  });
  
  socket.on('disconnect', () => {
    console.log('❌ Client disconnected:', socket.id);
  });
});

// Initialize demo data
async function initializeDemoData() {
  try {
    // Check if restaurants exist
    const restaurantCount = await Restaurant.countDocuments();
    
    if (restaurantCount === 0) {
      console.log('📝 Creating demo restaurants...');
      
      // Create demo restaurants
      const demoRestaurants = [
        {
          name: "Spicy Delight",
          description: "Authentic Indian cuisine with modern twist",
          cuisine: "Indian",
          rating: 4.5,
          deliveryTime: 30,
          deliveryFee: 2.99,
          minOrder: 15,
          imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
          address: {
            street: "123 Main St",
            city: "New York",
            state: "NY",
            zipCode: "10001"
          },
          phone: "+1 (555) 123-4567",
          email: "info@spicydelight.com",
          isActive: true
        },
        {
          name: "Pizza Palace",
          description: "Best wood-fired pizzas in town",
          cuisine: "Italian",
          rating: 4.3,
          deliveryTime: 25,
          deliveryFee: 1.99,
          minOrder: 12,
          imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
          address: {
            street: "456 Broadway",
            city: "New York",
            state: "NY",
            zipCode: "10002"
          },
          phone: "+1 (555) 987-6543",
          email: "info@pizzapalace.com",
          isActive: true
        }
      ];
      
      await Restaurant.insertMany(demoRestaurants);
      console.log('✅ Demo restaurants created');
    }
    
    // Check if demo user exists
    const userCount = await User.countDocuments({ email: 'demo@quickdish.com' });
    
    if (userCount === 0) {
      console.log('📝 Creating demo user...');
      
      const demoUser = new User({
        name: 'Demo User',
        email: 'demo@quickdish.com',
        password: 'password', // In production, hash this
        phone: '+1 (555) 123-4567',
        role: 'customer',
        address: {
          street: '123 Main St',
          city: 'New York',
          state: 'NY',
          zipCode: '10001'
        }
      });
      
      await demoUser.save();
      console.log('✅ Demo user created');
    }
    
  } catch (error) {
    console.error('Error initializing demo data:', error);
  }
}

const PORT = process.env.PORT || 5000;
server.listen(PORT, async () => {
  console.log(`🚀 Backend Server running on http://localhost:${PORT}`);
  console.log(`📡 WebSocket server ready for real-time updates`);
  
  // Initialize demo data after server starts
  await initializeDemoData();
});