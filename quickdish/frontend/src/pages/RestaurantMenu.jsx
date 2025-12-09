import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { menusData } from '../data/menus';
import { FaStar, FaClock, FaShippingFast, FaLeaf, FaFire, FaChevronLeft, FaShoppingCart, FaPlus, FaMinus, FaReceipt } from 'react-icons/fa';

const RestaurantMenu = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [immediateOrders, setImmediateOrders] = useState([]); // New: For "Order Now" items
  const [showBill, setShowBill] = useState(false); // New: Show bill modal
  const [loading, setLoading] = useState(true);

  const restaurantsData = [
    {
      id: 1,
      name: "Spicy Delight",
      cuisine: "Indian",
      rating: 4.5,
      deliveryTime: "25-30 min",
      deliveryFee: 2.99,
      minOrder: 15,
      imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      address: "123 Main St, New York, NY",
      description: "Authentic Indian cuisine with modern twist",
      popular: true,
      vegetarianFriendly: true,
      freeDelivery: false
    },
    {
      id: 2,
      name: "Pizza Palace",
      cuisine: "Italian",
      rating: 4.3,
      deliveryTime: "20-25 min",
      deliveryFee: 1.99,
      minOrder: 12,
      imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      address: "456 Broadway, New York, NY",
      description: "Best wood-fired pizzas in town",
      popular: true,
      vegetarianFriendly: true,
      freeDelivery: true
    },
    {
      id: 3,
      name: "Sushi Master",
      cuisine: "Japanese",
      rating: 4.7,
      deliveryTime: "30-35 min",
      deliveryFee: 3.49,
      minOrder: 20,
      imageUrl: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      address: "789 Park Ave, New York, NY",
      description: "Fresh sushi and Japanese specialties",
      popular: true,
      vegetarianFriendly: false,
      freeDelivery: false
    },
    {
      id: 4,
      name: "Burger Haven",
      cuisine: "American",
      rating: 4.2,
      deliveryTime: "15-20 min",
      deliveryFee: 0.99,
      minOrder: 10,
      imageUrl: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      address: "321 5th Ave, New York, NY",
      description: "Gourmet burgers and craft beers",
      popular: false,
      vegetarianFriendly: true,
      freeDelivery: false
    },
    {
      id: 5,
      name: "Taco Fiesta",
      cuisine: "Mexican",
      rating: 4.4,
      deliveryTime: "18-22 min",
      deliveryFee: 1.49,
      minOrder: 12,
      imageUrl: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      address: "654 Lexington Ave, New York, NY",
      description: "Mexican street food at its best",
      popular: true,
      vegetarianFriendly: true,
      freeDelivery: true
    },
    {
      id: 6,
      name: "Green Leaf",
      cuisine: "Healthy",
      rating: 4.6,
      deliveryTime: "22-27 min",
      deliveryFee: 2.49,
      minOrder: 14,
      imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      address: "987 Madison Ave, New York, NY",
      description: "Healthy salads and vegan options",
      popular: false,
      vegetarianFriendly: true,
      freeDelivery: false
    },
    {
      id: 7,
      name: "Noodle House",
      cuisine: "Chinese",
      rating: 4.1,
      deliveryTime: "25-30 min",
      deliveryFee: 2.99,
      minOrder: 15,
      imageUrl: "https://images.unsplash.com/photo-1555126634-323283e090fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      address: "147 Canal St, New York, NY",
      description: "Authentic Chinese noodles and dim sum",
      popular: false,
      vegetarianFriendly: true,
      freeDelivery: false
    }
  ];

  useEffect(() => {
    const fetchRestaurantData = () => {
      setLoading(true);
      
      const foundRestaurant = restaurantsData.find(r => r.id === parseInt(id));
      
      if (foundRestaurant) {
        setRestaurant(foundRestaurant);
        
        const restaurantMenu = menusData[parseInt(id)] || [];
        setMenuItems(restaurantMenu);
        
        const savedCart = localStorage.getItem(`cart_${id}`) || '[]';
        setCart(JSON.parse(savedCart));
      } else {
        toast.error('Restaurant not found');
        navigate('/restaurants');
      }
      
      setLoading(false);
    };

    fetchRestaurantData();
  }, [id, navigate]);

  // Add to Cart (For Later)
  const addToCart = (item) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    let newCart;
    
    if (existingItem) {
      newCart = cart.map(cartItem =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
    } else {
      newCart = [...cart, { ...item, quantity: 1 }];
    }
    
    setCart(newCart);
    localStorage.setItem(`cart_${id}`, JSON.stringify(newCart));
    toast.success(`Added ${item.name} to cart!`);
  };

  // Order Now (Immediate Order)
  const orderNow = (item) => {
    const existingOrder = immediateOrders.find(order => order.id === item.id);
    let newOrders;
    
    if (existingOrder) {
      newOrders = immediateOrders.map(order =>
        order.id === item.id
          ? { ...order, quantity: order.quantity + 1 }
          : order
      );
    } else {
      newOrders = [...immediateOrders, { ...item, quantity: 1 }];
    }
    
    setImmediateOrders(newOrders);
    setShowBill(true);
    toast.success(`Added ${item.name} to order!`);
  };

  const removeFromCart = (itemId) => {
    const newCart = cart.filter(item => item.id !== itemId);
    setCart(newCart);
    localStorage.setItem(`cart_${id}`, JSON.stringify(newCart));
    toast.success('Item removed from cart');
  };

  const removeFromImmediateOrders = (itemId) => {
    const newOrders = immediateOrders.filter(item => item.id !== itemId);
    setImmediateOrders(newOrders);
    if (newOrders.length === 0) setShowBill(false);
    toast.success('Item removed from order');
  };

  const updateCartQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(itemId);
      return;
    }
    
    const newCart = cart.map(item =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    );
    
    setCart(newCart);
    localStorage.setItem(`cart_${id}`, JSON.stringify(newCart));
  };

  const updateOrderQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromImmediateOrders(itemId);
      return;
    }
    
    const newOrders = immediateOrders.map(item =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    );
    
    setImmediateOrders(newOrders);
  };

  // Calculate totals
  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const orderTotal = immediateOrders.reduce((total, item) => total + (item.price * item.quantity), 0);
  const orderWithDelivery = orderTotal + (restaurant?.freeDelivery ? 0 : restaurant?.deliveryFee || 0);

  const handlePlaceOrder = () => {
    if (orderTotal < (restaurant?.minOrder || 0)) {
      toast.error(`Minimum order is $${restaurant?.minOrder || 0}`);
      return;
    }

    // Create order object
    const order = {
      orderId: 'ORD' + Date.now(),
      restaurant: restaurant?.name,
      items: immediateOrders,
      totalAmount: orderWithDelivery,
      deliveryFee: restaurant?.freeDelivery ? 0 : restaurant?.deliveryFee,
      deliveryAddress: "123 Main St, New York, NY", // In real app, get from user profile
      status: 'confirmed',
      date: new Date().toISOString()
    };

    // Save order to localStorage or send to backend
    localStorage.setItem('lastOrder', JSON.stringify(order));
    
    toast.success('Order placed successfully!');
    setImmediateOrders([]);
    setShowBill(false);
    
    // Navigate to track order page
    setTimeout(() => {
      navigate('/track');
    }, 1500);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading restaurant menu...</p>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="restaurant-not-found">
        <h2>Restaurant not found</h2>
        <button className="btn btn-primary" onClick={() => navigate('/restaurants')}>
          Back to Restaurants
        </button>
      </div>
    );
  }

  const categories = [...new Set(menuItems.map(item => item.category))];

  return (
    <div className="restaurant-menu-page">
      {/* Restaurant Header */}
      <div className="restaurant-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <FaChevronLeft /> Back
        </button>
        <div className="restaurant-hero">
          <img src={restaurant.imageUrl} alt={restaurant.name} className="restaurant-hero-image" />
          <div className="restaurant-hero-info">
            <h1>{restaurant.name}</h1>
            <div className="restaurant-meta">
              <div className="meta-item">
                <FaStar /> {restaurant.rating}
              </div>
              <div className="meta-item">
                <FaClock /> {restaurant.deliveryTime}
              </div>
              <div className="meta-item">
                <FaShippingFast />
                {restaurant.freeDelivery ? 'Free Delivery' : `$${restaurant.deliveryFee}`}
              </div>
              {restaurant.popular && (
                <div className="meta-item popular-tag">
                  <FaFire /> Popular
                </div>
              )}
              {restaurant.vegetarianFriendly && (
                <div className="meta-item veg-tag">
                  <FaLeaf /> Vegetarian
                </div>
              )}
            </div>
            <p className="restaurant-description">{restaurant.description}</p>
            <p className="restaurant-address">{restaurant.address}</p>
            <p className="min-order">Minimum order: ${restaurant.minOrder}</p>
          </div>
        </div>
      </div>

      <div className="menu-container">
        {/* Menu Items */}
        <div className="menu-items">
          <h2>Menu</h2>
          {categories.map(category => (
            <div key={category} className="menu-category">
              <h3>{category}</h3>
              <div className="category-items">
                {menuItems
                  .filter(item => item.category === category)
                  .map(item => {
                    const cartItem = cart.find(ci => ci.id === item.id);
                    const cartQuantity = cartItem ? cartItem.quantity : 0;
                    
                    const orderItem = immediateOrders.find(oi => oi.id === item.id);
                    const orderQuantity = orderItem ? orderItem.quantity : 0;
                    
                    return (
                      <div key={item.id} className="menu-item-card">
                        <div className="menu-item-image">
                          <img src={item.imageUrl} alt={item.name} />
                          {item.isVegetarian && (
                            <div className="veg-indicator">🌱 Veg</div>
                          )}
                        </div>
                        <div className="menu-item-info">
                          <div className="item-header">
                            <h4>{item.name}</h4>
                            <span className="item-price">${item.price.toFixed(2)}</span>
                          </div>
                          <p className="item-description">{item.description}</p>
                          <div className="item-details">
                            {item.spicyLevel && (
                              <span className="detail-tag spicy">
                                🌶️ {item.spicyLevel}
                              </span>
                            )}
                            {item.prepTime && (
                              <span className="detail-tag">
                                ⏱️ {item.prepTime}
                              </span>
                            )}
                            {item.pieces && (
                              <span className="detail-tag">
                                {item.pieces} pieces
                              </span>
                            )}
                          </div>
                          
                          {/* TWO BUTTONS: Add to Cart and Order Now */}
                          <div className="item-actions-dual">
                            {/* Left side: Add to Cart */}
                            <div className="action-group">
                              <div className="action-label">Add to Cart</div>
                              {cartQuantity > 0 ? (
                                <div className="quantity-control">
                                  <button 
                                    className="qty-btn"
                                    onClick={() => updateCartQuantity(item.id, cartQuantity - 1)}
                                  >
                                    <FaMinus />
                                  </button>
                                  <span className="qty-display">{cartQuantity}</span>
                                  <button 
                                    className="qty-btn"
                                    onClick={() => updateCartQuantity(item.id, cartQuantity + 1)}
                                  >
                                    <FaPlus />
                                  </button>
                                  <button 
                                    className="remove-btn"
                                    onClick={() => removeFromCart(item.id)}
                                  >
                                    Remove
                                  </button>
                                </div>
                              ) : (
                                <button 
                                  className="btn btn-cart"
                                  onClick={() => addToCart(item)}
                                >
                                  <FaShoppingCart /> Add to Cart
                                </button>
                              )}
                            </div>
                            
                            {/* Right side: Order Now */}
                            <div className="action-group">
                              <div className="action-label">Order Now</div>
                              {orderQuantity > 0 ? (
                                <div className="quantity-control">
                                  <button 
                                    className="qty-btn"
                                    onClick={() => updateOrderQuantity(item.id, orderQuantity - 1)}
                                  >
                                    <FaMinus />
                                  </button>
                                  <span className="qty-display">{orderQuantity}</span>
                                  <button 
                                    className="qty-btn"
                                    onClick={() => updateOrderQuantity(item.id, orderQuantity + 1)}
                                  >
                                    <FaPlus />
                                  </button>
                                  <button 
                                    className="remove-btn"
                                    onClick={() => removeFromImmediateOrders(item.id)}
                                  >
                                    Remove
                                  </button>
                                </div>
                              ) : (
                                <button 
                                  className="btn btn-order"
                                  onClick={() => orderNow(item)}
                                >
                                  Order Now
                                </button>
                              )}
                            </div>
                          </div>
                          
                          {/* Status Indicators */}
                          {(cartQuantity > 0 || orderQuantity > 0) && (
                            <div className="item-status">
                              {cartQuantity > 0 && (
                                <span className="status-cart">
                                  📦 {cartQuantity} in cart
                                </span>
                              )}
                              {orderQuantity > 0 && (
                                <span className="status-order">
                                  🚀 {orderQuantity} ordering now
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>

        {/* Sidebars */}
        <div className="sidebars-container">
          {/* Cart Sidebar */}
          {cart.length > 0 && (
            <div className="cart-sidebar">
              <h3><FaShoppingCart /> Your Cart</h3>
              <div className="cart-items">
                {cart.map(item => (
                  <div key={item.id} className="cart-sidebar-item">
                    <div className="cart-item-info">
                      <h5>{item.name}</h5>
                      <p>${item.price} × {item.quantity}</p>
                    </div>
                    <div className="cart-item-total">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
              <div className="cart-total">
                <div className="total-row">
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="total-row">
                  <span>Delivery Fee</span>
                  <span>{restaurant.freeDelivery ? 'Free' : `$${restaurant.deliveryFee}`}</span>
                </div>
                <div className="total-row grand-total">
                  <span>Total</span>
                  <span>${(cartTotal + (restaurant.freeDelivery ? 0 : restaurant.deliveryFee)).toFixed(2)}</span>
                </div>
                <button 
                  className="btn btn-primary checkout-btn"
                  onClick={() => {
                    if (cartTotal < restaurant.minOrder) {
                      toast.error(`Minimum order is $${restaurant.minOrder}`);
                    } else {
                      toast.success('Order placed from cart!');
                      localStorage.removeItem(`cart_${id}`);
                      navigate('/track');
                    }
                  }}
                >
                  Checkout Cart (${cartTotal.toFixed(2)})
                </button>
              </div>
            </div>
          )}

          {/* Order Now Bill - Only shown when items are added via "Order Now" */}
          {showBill && (
            <div className="order-bill-sidebar">
              <h3><FaReceipt /> Current Order</h3>
              <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1rem' }}>
                Items added via "Order Now" button
              </p>
              <div className="order-items">
                {immediateOrders.map(item => (
                  <div key={item.id} className="order-sidebar-item">
                    <div className="order-item-info">
                      <h5>{item.name}</h5>
                      <p>${item.price} × {item.quantity}</p>
                    </div>
                    <div className="order-item-total">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
              <div className="order-summary">
                <div className="summary-row">
                  <span>Items Total</span>
                  <span>${orderTotal.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Delivery Fee</span>
                  <span>{restaurant.freeDelivery ? 'Free' : `$${restaurant.deliveryFee}`}</span>
                </div>
                {orderTotal < restaurant.minOrder && (
                  <div className="summary-row warning">
                    <span>Minimum order: ${restaurant.minOrder}</span>
                    <span>Add ${(restaurant.minOrder - orderTotal).toFixed(2)} more</span>
                  </div>
                )}
                <div className="summary-row grand-total">
                  <span>Total to Pay</span>
                  <span>${orderWithDelivery.toFixed(2)}</span>
                </div>
                <button 
                  className="btn btn-success place-order-btn"
                  onClick={handlePlaceOrder}
                  disabled={orderTotal < restaurant.minOrder}
                >
                  Place Order Now
                </button>
                <button 
                  className="btn btn-outline clear-order-btn"
                  onClick={() => {
                    setImmediateOrders([]);
                    setShowBill(false);
                    toast.info('Order cleared');
                  }}
                >
                  Clear Order
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Floating Action Button for Order Now Bill */}
      {immediateOrders.length > 0 && !showBill && (
        <button
          className="floating-bill-btn"
          onClick={() => setShowBill(true)}
        >
          <FaReceipt />
          <span>View Order ({immediateOrders.length} items)</span>
          <span className="bill-total">${orderTotal.toFixed(2)}</span>
        </button>
      )}
    </div>
  );
};

export default RestaurantMenu;