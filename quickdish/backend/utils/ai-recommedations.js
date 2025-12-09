// AI Recommendation Engine
const getRecommendations = (userHistory, restaurants, menuItems) => {
  // Simple recommendation algorithm
  const recommendations = [];
  
  // If user has order history, recommend similar restaurants
  if (userHistory && userHistory.length > 0) {
    // Get user's preferred cuisine
    const preferredCuisines = {};
    userHistory.forEach(order => {
      const restaurant = restaurants.find(r => r.id === order.restaurantId);
      if (restaurant) {
        preferredCuisines[restaurant.cuisine] = (preferredCuisines[restaurant.cuisine] || 0) + 1;
      }
    });
    
    // Sort by preference
    const sortedCuisines = Object.entries(preferredCuisines)
      .sort((a, b) => b[1] - a[1])
      .map(entry => entry[0]);
    
    // Recommend restaurants with preferred cuisines
    sortedCuisines.forEach(cuisine => {
      const matchingRestaurants = restaurants
        .filter(r => r.cuisine === cuisine)
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 2);
      
      recommendations.push(...matchingRestaurants);
    });
  }
  
  // If no history or need more recommendations, add top-rated
  if (recommendations.length < 4) {
    const topRated = restaurants
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 4 - recommendations.length);
    
    recommendations.push(...topRated.filter(r => !recommendations.includes(r)));
  }
  
  return recommendations.slice(0, 4);
};

// ETA Prediction
const predictETA = (distance, traffic, weather, preparationTime) => {
  // Base travel time (minutes per km)
  const baseTravelTime = distance * 2;
  
  // Adjust for traffic
  let trafficMultiplier = 1;
  if (traffic === 'heavy') trafficMultiplier = 1.5;
  if (traffic === 'moderate') trafficMultiplier = 1.2;
  
  // Adjust for weather
  let weatherMultiplier = 1;
  if (weather === 'rain') weatherMultiplier = 1.3;
  if (weather === 'snow') weatherMultiplier = 1.8;
  
  const travelTime = baseTravelTime * trafficMultiplier * weatherMultiplier;
  const totalETA = preparationTime + travelTime;
  
  return Math.round(totalETA);
};

module.exports = {
  getRecommendations,
  predictETA
};