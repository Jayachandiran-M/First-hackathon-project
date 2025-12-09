import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import RestaurantCard from '../components/RestaurantCard';
import { FaSearch, FaFilter, FaStar, FaClock, FaShippingFast, FaLeaf, FaFire } from 'react-icons/fa';

const Restaurants = () => {
  const navigate = useNavigate();
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

  const cuisines = ['all', 'Indian', 'Italian', 'Japanese', 'American', 'Mexican', 'Chinese', 'Healthy'];

  return (
    <div className="restaurants-page" style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: '#333' }}>
        All Restaurants
      </h1>
      <p style={{ color: '#666', marginBottom: '2rem', fontSize: '1.1rem' }}>
        Browse through our partner restaurants
      </p>

      {/* Search Bar */}
      <div style={{ marginBottom: '2rem' }}>
        <form 
          onSubmit={handleSearch} 
          style={{ 
            maxWidth: '600px', 
            margin: '0 auto 2rem',
            display: 'flex',
            gap: '0.5rem'
          }}
        >
          <input
            type="text"
            placeholder="Search restaurants by name, cuisine, or description..."
            value={searchTerm}
            onChange={handleSearchChange}
            style={{
              flex: 1,
              padding: '0.8rem 1rem',
              border: '1px solid #ddd',
              borderRadius: '8px',
              fontSize: '1rem',
              boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
            }}
          />
          <button 
            type="submit"
            style={{
              padding: '0.8rem 1.5rem',
              background: '#FF6B6B',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontWeight: '500'
            }}
          >
            <FaSearch /> Search
          </button>
        </form>

        {/* Filter Section */}
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ 
            marginBottom: '1rem', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '10px',
            color: '#333'
          }}>
            <FaFilter /> Filter by Cuisine
          </h3>
          <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
            {cuisines.map(cuisine => (
              <button
                key={cuisine}
                onClick={() => setFilter(cuisine)}
                style={{
                  padding: '0.6rem 1.2rem',
                  background: filter === cuisine ? '#FF6B6B' : 'white',
                  color: filter === cuisine ? 'white' : '#FF6B6B',
                  border: `2px solid #FF6B6B`,
                  borderRadius: '20px',
                  cursor: 'pointer',
                  fontWeight: '500',
                  transition: 'all 0.3s ease'
                }}
              >
                {cuisine === 'all' ? 'All Cuisines' : cuisine}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Count */}
      {searchTerm || filter !== 'all' ? (
        <div style={{ 
          background: '#FFF9E6', 
          padding: '1rem 1.5rem', 
          borderRadius: '10px', 
          marginBottom: '2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.2rem' }}>
              {filteredRestaurants.length} restaurant{filteredRestaurants.length !== 1 ? 's' : ''} found
              {searchTerm && ` for "${searchTerm}"`}
              {filter !== 'all' && ` in ${filter} cuisine`}
            </h3>
          </div>
          <button 
            onClick={() => {
              setSearchTerm('');
              setFilter('all');
            }}
            style={{
              padding: '0.5rem 1rem',
              background: 'transparent',
              border: '1px solid #666',
              borderRadius: '6px',
              cursor: 'pointer',
              color: '#666'
            }}
          >
            Clear All Filters
          </button>
        </div>
      ) : null}

      {/* Restaurants Grid */}
      {loading ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '3rem',
          color: '#666',
          fontSize: '1.2rem'
        }}>
          Loading restaurants...
        </div>
      ) : filteredRestaurants.length === 0 ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '3rem', 
          background: 'white', 
          borderRadius: '15px',
          boxShadow: '0 5px 15px rgba(0,0,0,0.05)'
        }}>
          <h3 style={{ marginBottom: '1rem', color: '#666' }}>No restaurants found</h3>
          <p style={{ marginBottom: '2rem', color: '#888' }}>
            {searchTerm ? `No results for "${searchTerm}"` : 'No restaurants available'}
          </p>
          <button 
            onClick={() => {
              setSearchTerm('');
              setFilter('all');
            }}
            style={{
              padding: '0.8rem 1.5rem',
              background: '#FF6B6B',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            Show All Restaurants
          </button>
        </div>
      ) : (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
          gap: '2rem',
          marginTop: '2rem'
        }}>
          {filteredRestaurants.map((restaurant) => (
            <div 
              key={restaurant.id}
              style={{
                background: 'white',
                borderRadius: '15px',
                overflow: 'hidden',
                boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                cursor: 'pointer'
              }}
              onClick={() => navigate(`/restaurant/${restaurant.id}`)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
              }}
            >
              {/* Restaurant Image with Badges */}
              <div style={{ position: 'relative', height: '200px' }}>
                <img 
                  src={restaurant.imageUrl} 
                  alt={restaurant.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
                {restaurant.popular && (
                  <div style={{
                    position: 'absolute',
                    top: '10px',
                    left: '10px',
                    background: '#FF6B6B',
                    color: 'white',
                    padding: '0.3rem 0.8rem',
                    borderRadius: '15px',
                    fontSize: '0.8rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    fontWeight: '600'
                  }}>
                    <FaFire /> Popular
                  </div>
                )}
                {restaurant.vegetarianFriendly && (
                  <div style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    background: '#27AE60',
                    color: 'white',
                    padding: '0.3rem 0.8rem',
                    borderRadius: '15px',
                    fontSize: '0.8rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    fontWeight: '600'
                  }}>
                    <FaLeaf /> Veg
                  </div>
                )}
              </div>

              {/* Restaurant Info */}
              <div style={{ padding: '1.5rem' }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'flex-start',
                  marginBottom: '0.5rem'
                }}>
                  <h3 style={{ 
                    margin: 0, 
                    fontSize: '1.3rem',
                    color: '#333'
                  }}>
                    {restaurant.name}
                  </h3>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    background: '#2ed573',
                    color: 'white',
                    padding: '0.3rem 0.6rem',
                    borderRadius: '20px',
                    fontSize: '0.9rem',
                    fontWeight: 'bold'
                  }}>
                    <FaStar /> {restaurant.rating}
                  </div>
                </div>
                
                <p style={{ 
                  color: '#666', 
                  marginBottom: '0.5rem',
                  fontSize: '0.95rem'
                }}>
                  {restaurant.cuisine}
                </p>
                
                <p style={{ 
                  color: '#777', 
                  fontSize: '0.9rem',
                  marginBottom: '1rem',
                  lineHeight: '1.4'
                }}>
                  {restaurant.description}
                </p>

                {/* Restaurant Details */}
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '1rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <FaClock style={{ color: '#666' }} />
                    <span style={{ fontSize: '0.9rem', color: '#666' }}>
                      {restaurant.deliveryTime}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <FaShippingFast style={{ color: '#666' }} />
                    <span style={{ fontSize: '0.9rem', color: '#666' }}>
                      {restaurant.freeDelivery ? 'Free' : `$${restaurant.deliveryFee}`}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#666' }}>
                    Min: ${restaurant.minOrder}
                  </div>
                </div>

                {/* Tags */}
                <div style={{ 
                  display: 'flex', 
                  gap: '0.5rem', 
                  marginBottom: '1rem',
                  flexWrap: 'wrap'
                }}>
                  {restaurant.popular && (
                    <span style={{
                      padding: '0.2rem 0.6rem',
                      background: '#FFF9E6',
                      color: '#E67E22',
                      borderRadius: '12px',
                      fontSize: '0.75rem',
                      fontWeight: '500'
                    }}>
                      🔥 Popular
                    </span>
                  )}
                  {restaurant.vegetarianFriendly && (
                    <span style={{
                      padding: '0.2rem 0.6rem',
                      background: '#E8F5E9',
                      color: '#27AE60',
                      borderRadius: '12px',
                      fontSize: '0.75rem',
                      fontWeight: '500'
                    }}>
                      🌱 Vegetarian
                    </span>
                  )}
                  {restaurant.freeDelivery && (
                    <span style={{
                      padding: '0.2rem 0.6rem',
                      background: '#E3F2FD',
                      color: '#2980B9',
                      borderRadius: '12px',
                      fontSize: '0.75rem',
                      fontWeight: '500'
                    }}>
                      🚚 Free Delivery
                    </span>
                  )}
                </div>

                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/restaurant/${restaurant.id}`);
                  }}
                  style={{
                    width: '100%',
                    padding: '0.8rem',
                    background: '#FF6B6B',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: '600',
                    fontSize: '1rem',
                    transition: 'background 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#ff4757'}
                  onMouseLeave={(e) => e.currentTarget.style.background = '#FF6B6B'}
                >
                  View Menu
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Restaurants;