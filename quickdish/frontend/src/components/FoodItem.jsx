import React from 'react';

const FoodItem = ({ item, onAddToCart }) => {
  return (
    <div className="food-item">
      <img src={item.imageUrl} alt={item.name} className="food-image" />
      <div className="food-info">
        <h4>{item.name}</h4>
        <p>{item.description}</p>
        <div className="food-details">
          <span className="price">${item.price}</span>
          <span className="category">{item.category}</span>
        </div>
        <button className="btn btn-primary" onClick={() => onAddToCart(item)}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default FoodItem;