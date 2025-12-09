import React, { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaHistory, FaEdit, FaSave } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchUserProfile();
    fetchOrderHistory();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/');
        return;
      }

      const response = await fetch('http://localhost:5000/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      
      if (data.success) {
        setUser(data.user);
      } else {
        toast.error('Failed to load profile');
        // Load from localStorage as fallback
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      // Load from localStorage as fallback
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const fetchOrderHistory = async () => {
    try {
      // For demo, we'll use static data
      // In real app, fetch from: /api/orders/user/${user.id}
      const demoOrders = [
        {
          orderId: 'ORD123456',
          date: '2024-01-15',
          restaurant: 'Spicy Delight',
          items: ['Chicken Tikka Masala', 'Garlic Naan', 'Mango Lassi'],
          totalAmount: 42.95,
          status: 'delivered'
        },
        {
          orderId: 'ORD123457',
          date: '2024-01-10',
          restaurant: 'Pizza Palace',
          items: ['Margherita Pizza', 'Garlic Bread', 'Coca Cola'],
          totalAmount: 28.99,
          status: 'delivered'
        },
        {
          orderId: 'ORD123458',
          date: '2024-01-05',
          restaurant: 'Sushi Master',
          items: ['Salmon Sushi', 'California Roll', 'Miso Soup'],
          totalAmount: 34.50,
          status: 'delivered'
        }
      ];
      setOrders(demoOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleSaveProfile = () => {
    // In real app, send update to backend API
    toast.success('Profile updated successfully! (Demo mode)');
    setIsEditing(false);
  };

  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '50vh' 
      }}>
        <div className="spinner"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div style={{ 
        textAlign: 'center', 
        padding: '4rem' 
      }}>
        <h2>Please login to view profile</h2>
        <button 
          className="btn btn-primary"
          onClick={() => window.location.href = '/'}
        >
          Go to Home
        </button>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <h1>👤 User Profile</h1>
      
      <div className="profile-section">
        <div className="profile-card">
          <div className="profile-header">
            <div className="profile-avatar">
              {user.name ? user.name.charAt(0).toUpperCase() : <FaUser size={40} />}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {isEditing ? (
                  <input
                    type="text"
                    value={user.name}
                    onChange={(e) => setUser({...user, name: e.target.value})}
                    className="profile-input"
                    style={{ width: '100%', maxWidth: '300px' }}
                  />
                ) : (
                  <h2>{user.name}</h2>
                )}
                <button
                  className={`btn ${isEditing ? 'btn-primary' : 'btn-outline'}`}
                  onClick={isEditing ? handleSaveProfile : () => setIsEditing(true)}
                  style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  {isEditing ? <><FaSave /> Save</> : <><FaEdit /> Edit Profile</>}
                </button>
              </div>
              <p style={{ color: '#666', marginTop: '0.5rem' }}>
                Member since {new Date(user.createdAt || '2024-01-01').toLocaleDateString()}
              </p>
            </div>
          </div>
          
          <div className="profile-details">
            <div className="detail-item">
              <FaEnvelope />
              <div>
                <p style={{ margin: 0, color: '#888', fontSize: '0.9rem' }}>Email</p>
                <span style={{ color: '#333' }}>{user.email}</span>
              </div>
            </div>
            
            <div className="detail-item">
              <FaPhone />
              <div>
                <p style={{ margin: 0, color: '#888', fontSize: '0.9rem' }}>Phone</p>
                {isEditing ? (
                  <input
                    type="tel"
                    value={user.phone}
                    onChange={(e) => setUser({...user, phone: e.target.value})}
                    className="profile-input"
                  />
                ) : (
                  <span style={{ color: '#333' }}>{user.phone}</span>
                )}
              </div>
            </div>
            
            <div className="detail-item">
              <FaMapMarkerAlt />
              <div>
                <p style={{ margin: 0, color: '#888', fontSize: '0.9rem' }}>Address</p>
                {isEditing ? (
                  <div className="address-inputs">
                    <input
                      type="text"
                      value={user.address?.street || ''}
                      onChange={(e) => setUser({
                        ...user, 
                        address: {...user.address, street: e.target.value}
                      })}
                      placeholder="Street"
                      className="profile-input"
                    />
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                      <input
                        type="text"
                        value={user.address?.city || ''}
                        onChange={(e) => setUser({
                          ...user, 
                          address: {...user.address, city: e.target.value}
                        })}
                        placeholder="City"
                        className="profile-input"
                      />
                      <input
                        type="text"
                        value={user.address?.state || ''}
                        onChange={(e) => setUser({
                          ...user, 
                          address: {...user.address, state: e.target.value}
                        })}
                        placeholder="State"
                        className="profile-input"
                      />
                    </div>
                    <input
                      type="text"
                      value={user.address?.zipCode || ''}
                      onChange={(e) => setUser({
                        ...user, 
                        address: {...user.address, zipCode: e.target.value}
                      })}
                      placeholder="ZIP Code"
                      className="profile-input"
                    />
                  </div>
                ) : (
                  <span style={{ color: '#333' }}>
                    {user.address?.street ? (
                      <>
                        {user.address.street}, {user.address.city}, {user.address.state} {user.address.zipCode}
                      </>
                    ) : (
                      'No address provided'
                    )}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="orders-section">
        <h2><FaHistory /> Order History</h2>
        
        {orders.length > 0 ? (
          <div className="orders-list">
            {orders.map((order) => (
              <div key={order.orderId} className="order-card">
                <div className="order-header">
                  <h4>Order #{order.orderId}</h4>
                  <span className={`order-status ${order.status}`}>
                    {order.status}
                  </span>
                </div>
                <div className="order-details">
                  <p><strong>Restaurant:</strong> {order.restaurant}</p>
                  <p><strong>Date:</strong> {order.date}</p>
                  <p><strong>Items:</strong> {order.items.join(', ')}</p>
                  <p><strong>Total:</strong> ${order.totalAmount.toFixed(2)}</p>
                </div>
                <button className="btn btn-outline" style={{ marginTop: '1rem' }}>
                  View Details
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-orders">
            <p>No orders yet</p>
            <button className="btn btn-primary" onClick={() => window.location.href = '/'}>
              Order Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;