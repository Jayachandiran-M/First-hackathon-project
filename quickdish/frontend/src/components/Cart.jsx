import React from 'react';
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';

const Cart = ({ items, onUpdateQuantity, onRemoveItem }) => {
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="cart-sidebar">
      <h3>Shopping Cart</h3>
      {items.length === 0 ? (
        <p className="empty-cart">Your cart is empty</p>
      ) : (
        <>
          <div className="cart-items">
            {items.map(item => (
              <div key={item.id} className="cart-item">
                <div className="item-info">
                  <h4>{item.name}</h4>
                  <p>${item.price} x {item.quantity}</p>
                </div>
                <div className="item-actions">
                  <div className="quantity-control">
                    <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}>
                      <FaMinus />
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>
                      <FaPlus />
                    </button>
                  </div>
                  <button className="remove-btn" onClick={() => onRemoveItem(item.id)}>
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-total">
            <h4>Total: ${total.toFixed(2)}</h4>
            <button className="btn btn-primary checkout-btn">
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;