import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import RestaurantCard from '../components/RestaurantCard';
import { FaSearch, FaFilter } from 'react-icons/fa';

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
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
    setLoading(true);
    setTimeout(() => {
      setRestaurants(restaurantsData);
      setFilteredRestaurants(restaurantsData);
      setLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    let results = [...restaurants];
    
    if (filter !== 'all') {
      results = results.filter(r => r.cuisine.toLowerCase() === filter.toLowerCase());
    }
    
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      results = results.filter(r => 
        r.name.toLowerCase().includes(searchLower) ||
        r.cuisine.toLowerCase().includes(searchLower) ||
        r.description.toLowerCase().includes(searchLower)
      );
    }
    
    setFilteredRestaurants(results);
  }, [searchTerm, filter, restaurants]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() && filteredRestaurants.length === 0) {
      toast.error(`No restaurants found for "${searchTerm}"`);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleOrderClick = (restaurantName) => {
    toast.success(`Added ${restaurantName} to cart!`);
  };

  const cuisines = ['all', 'Indian', 'Italian', 'Japanese', 'American', 'Mexican', 'Chinese', 'Healthy'];

  return (
    <div className="restaurants-page">
      <h1>All Restaurants</h1>
      <p style={{ color: '#666', marginBottom: '2rem' }}>
        Browse through 7 partner restaurants
      </p>

      <div style={{ marginBottom: '2rem' }}>
        <form onSubmit={handleSearch} className="search-box" style={{ maxWidth: '600px', margin: '0 auto 2rem' }}>
          <input
            type="text"
            placeholder="Search restaurants by name, cuisine, or description..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button type="submit">
            <FaSearch />
          </button>
        </form>

        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FaFilter /> Filter by Cuisine
          </h3>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {cuisines.map(cuisine => (
              <button
                key={cuisine}
                className={`btn ${filter === cuisine ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => setFilter(cuisine)}
              >
                {cuisine === 'all' ? 'All Cuisines' : cuisine}
              </button>
            ))}
          </div>
        </div>
      </div>

      {searchTerm || filter !== 'all' ? (
        <div style={{ 
          background: '#FFF9E6', 
          padding: '1rem', 
          borderRadius: '10px', 
          marginBottom: '2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <h3 style={{ margin: 0 }}>
              {filteredRestaurants.length} restaurant{filteredRestaurants.length !== 1 ? 's' : ''} found
              {searchTerm && ` for "${searchTerm}"`}
              {filter !== 'all' && ` in ${filter} cuisine`}
            </h3>
          </div>
          <button 
            className="btn btn-outline" 
            onClick={() => {
              setSearchTerm('');
              setFilter('all');
            }}
          >
            Clear All Filters
          </button>
        </div>
      ) : null}

      {loading ? (
        <div className="loading-spinner">Loading restaurants...</div>
      ) : filteredRestaurants.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem', background: 'white', borderRadius: '15px' }}>
          <h3 style={{ marginBottom: '1rem', color: '#666' }}>No restaurants found</h3>
          <p style={{ marginBottom: '2rem', color: '#888' }}>
            {searchTerm ? `No results for "${searchTerm}"` : 'No restaurants available'}
          </p>
          <button 
            className="btn btn-primary" 
            onClick={() => {
              setSearchTerm('');
              setFilter('all');
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
              onClick={() => handleOrderClick(restaurant.name)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Restaurants;