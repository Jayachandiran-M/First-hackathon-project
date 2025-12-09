import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import RestaurantCard from '../components/RestaurantCard';
import { FaSearch, FaBolt, FaStar, FaLeaf, FaFire, FaDollarSign, FaClock } from 'react-icons/fa';

const Home = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);

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
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      setRestaurants(restaurantsData);
      setFilteredRestaurants(restaurantsData);
      setLoading(false);
    }, 500);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      setFilteredRestaurants(restaurants);
      return;
    }

    const searchLower = searchTerm.toLowerCase();
    const results = restaurants.filter(restaurant => 
      restaurant.name.toLowerCase().includes(searchLower) ||
      restaurant.cuisine.toLowerCase().includes(searchLower) ||
      restaurant.description.toLowerCase().includes(searchLower)
    );
    
    setFilteredRestaurants(results);
    
    if (results.length === 0) {
      toast.error(`No restaurants found for "${searchTerm}"`);
    } else {
      toast.success(`Found ${results.length} restaurant(s) for "${searchTerm}"`);
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    if (!value.trim()) {
      setFilteredRestaurants(restaurants);
      return;
    }
    
    const searchLower = value.toLowerCase();
    const results = restaurants.filter(restaurant => 
      restaurant.name.toLowerCase().includes(searchLower) ||
      restaurant.cuisine.toLowerCase().includes(searchLower) ||
      restaurant.description.toLowerCase().includes(searchLower)
    );
    
    setFilteredRestaurants(results);
  };

  const handleOrder = (restaurantName) => {
    toast.success(`Added ${restaurantName} to cart!`);
  };

  const features = [
    { icon: <FaBolt />, title: "Fast Delivery", desc: "Get food in 30 minutes or less" },
    { icon: <FaStar />, title: "Top Rated", desc: "Only the best restaurants" },
    { icon: <FaLeaf />, title: "Healthy Options", desc: "Fresh and nutritious meals" },
    { icon: <FaFire />, title: "Trending", desc: "Discover popular dishes" },
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <h1>Craving something delicious?</h1>
        <p>Order food from your favorite restaurants and get it delivered to your doorstep in minutes!</p>
        
        <form onSubmit={handleSearch} className="search-box">
          <input
            type="text"
            placeholder="Search for restaurants, cuisines, or dishes..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button type="submit">
            <FaSearch />
          </button>
        </form>
      </section>

      {/* Features Section */}
      <section>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '2rem' }}>
          Why Choose QuickDish?
        </h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">
                {feature.icon}
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Restaurant Count */}
      <div className="restaurant-count">
        <h3>
          Discover {restaurants.length} Restaurants Near You
          <span style={{ color: '#FF6B6B', marginLeft: '10px' }}>
            {restaurants.filter(r => r.popular).length} Popular
          </span>
        </h3>
      </div>

      {/* Featured Restaurants with Search Results */}
      <section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '2rem' }}>
            {searchTerm ? `Search Results for "${searchTerm}"` : 'Featured Restaurants'}
            {searchTerm && filteredRestaurants.length > 0 && (
              <span style={{ fontSize: '1rem', color: '#666', marginLeft: '1rem' }}>
                ({filteredRestaurants.length} results)
              </span>
            )}
          </h2>
          <button className="btn btn-primary" onClick={() => {
            setSearchTerm('');
            setFilteredRestaurants(restaurants);
          }}>
            Clear Search
          </button>
        </div>

        {loading ? (
          <div className="loading-spinner">Loading restaurants...</div>
        ) : filteredRestaurants.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', background: 'white', borderRadius: '15px' }}>
            <h3 style={{ marginBottom: '1rem', color: '#666' }}>No restaurants found</h3>
            <p style={{ marginBottom: '2rem', color: '#888' }}>Try a different search term</p>
            <button 
              className="btn btn-primary" 
              onClick={() => {
                setSearchTerm('');
                setFilteredRestaurants(restaurants);
              }}
            >
              Show All Restaurants
            </button>
          </div>
        ) : (
          <div className="restaurants-grid">
            {filteredRestaurants.map((restaurant) => (
              <RestaurantCard
                key={restaurant.id}
                restaurant={restaurant}
                onClick={() => handleOrder(restaurant.name)}
              />
            ))}
          </div>
        )}
      </section>
      // In your Home.js file, update the AI section:
<section className="ai-section">
  <h2>🧠 AI-Powered Recommendations</h2>
  <p>Our smart algorithm learns your preferences to suggest dishes you'll love!</p>
  <p style={{ fontSize: '0.9rem', opacity: 0.8, marginBottom: '1rem' }}>
    Try our Food Assistant chatbot (bottom-right corner) for personalized suggestions!
  </p>
  <button className="btn btn-secondary" onClick={() => {
    const recommended = [...restaurants]
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 4);
    setFilteredRestaurants(recommended);
    toast.success('Showing top rated restaurants!');
  }}>
    Show Top Rated Restaurants
  </button>
</section>

      {/* AI Recommendations */}
      <section className="ai-section">
        <h2>🧠 AI-Powered Recommendations</h2>
        <p>Our smart algorithm learns your preferences to suggest dishes you'll love!</p>
        <button className="btn btn-secondary" onClick={() => {
          const recommended = [...restaurants]
            .sort((a, b) => b.rating - a.rating)
            .slice(0, 4);
          setFilteredRestaurants(recommended);
          toast.success('Showing top rated restaurants!');
        }}>
          Show Top Rated Restaurants
        </button>
      </section>
    </div>
  );
};

export default Home;