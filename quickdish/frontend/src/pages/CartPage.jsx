import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { FaTrash, FaPlus, FaMinus, FaCreditCard } from 'react-icons/fa';

const CartPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Chicken Tikka Masala", price: 14.99, quantity: 2, restaurant: "Spicy Delight" },
    { id: 2, name: "Garlic Naan", price: 3.99, quantity: 3, restaurant: "Spicy Delight" },
    { id: 3, name: "Mango Lassi", price: 4.99, quantity: 1, restaurant: "Spicy Delight" }
  ]);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) {
      removeItem(id);
      return;
    }
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
    toast.success('Item removed from cart');
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = 2.99;
  const tax = subtotal * 0.08;
  const total = subtotal + deliveryFee + tax;

  const handleCheckout = () => {
    // Send order to backend
    fetch('http://localhost:5000/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items: cartItems,
        totalAmount: total,
        address: "123 Main St, New York, NY",
        paymentMethod: "cash"
      })
    })
    .then(response => response.json())
    .then(data => {
      toast.success('Order placed successfully!');
      navigate('/track');
    })
    .catch(error => {
      console.error('Error:', error);
      toast.success('Order placed successfully! (Demo)');
      navigate('/track');
    });
  };

  return (
    <div className="cart-page">
      <h1 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '2.5rem' }}>
        🛒 Your Cart
      </h1>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <button className="btn btn-primary" onClick={() => navigate('/')}>
            Browse Restaurants
          </button>
        </div>
      ) : (
        <div className="cart-container">
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <div>
                    <h4>{item.name}</h4>
                    <p style={{ color: '#666', fontSize: '0.9rem' }}>{item.restaurant}</p>
                    <p style={{ color: '#FF6B6B', fontWeight: 'bold', fontSize: '1.1rem' }}>
                      ${item.price.toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="cart-item-actions">
                  <div className="quantity-control">
                    <button
                      className="quantity-btn"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <FaMinus />
                    </button>
                    <span style={{ minWidth: '30px', textAlign: 'center' }}>
                      {item.quantity}
                    </span>
                    <button
                      className="quantity-btn"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <FaPlus />
                    </button>
                  </div>
                  <span className="item-total">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                  <button
                    className="remove-btn"
                    onClick={() => removeItem(item.id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>
              Order Summary
            </h3>
            
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Delivery Fee</span>
              <span>${deliveryFee.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Tax (8%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            
            <div className="summary-row total">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <button
              className="btn btn-primary checkout-btn"
              onClick={handleCheckout}
            >
              <FaCreditCard style={{ marginRight: '10px' }} />
              Proceed to Checkout
            </button>

            <div style={{
              marginTop: '2rem',
              padding: '1rem',
              background: '#FFF9E6',
              borderRadius: '10px',
              textAlign: 'center'
            }}>
              <p style={{ marginBottom: '0.5rem', color: '#D63031' }}>
                🎉 <strong>Special Offer!</strong> Get 20% off on orders above $30
              </p>
              <p style={{ fontSize: '0.9rem', color: '#666' }}>
                Use code: QUICKDISH20
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;