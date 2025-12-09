import React, { useState, useRef, useEffect } from 'react';
import { FaRobot, FaUser, FaTimes, FaPaperPlane, FaPizzaSlice, FaHamburger, FaLeaf, FaFire, FaUtensils, FaHeart, FaLaugh, FaStar, FaQuestionCircle } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const tooltipTimeoutRef = useRef(null);

  // Restaurant and food data (same as before)
  const restaurants = [
    { id: 1, name: "Spicy Delight", cuisine: "Indian", rating: 4.5, diet: ["High Protein", "Spicy"], tags: ["🌶️ Spicy", "🥘 Rich"] },
    { id: 2, name: "Pizza Palace", cuisine: "Italian", rating: 4.3, diet: ["Vegetarian", "Comfort Food"], tags: ["🧀 Cheesy", "🔥 Popular"] },
    { id: 3, name: "Sushi Master", cuisine: "Japanese", rating: 4.7, diet: ["Low Carb", "High Protein"], tags: ["🍣 Fresh", "🥢 Healthy"] },
    { id: 4, name: "Burger Haven", cuisine: "American", rating: 4.2, diet: ["High Protein", "Comfort Food"], tags: ["🍔 Juicy", "🎉 Party"] },
    { id: 5, name: "Taco Fiesta", cuisine: "Mexican", rating: 4.4, diet: ["Vegetarian", "Spicy"], tags: ["🌮 Tasty", "🥑 Fresh"] },
    { id: 6, name: "Green Leaf", cuisine: "Healthy", rating: 4.6, diet: ["Vegan", "Low Calorie", "Gluten-Free"], tags: ["🥗 Fresh", "💪 Healthy"] },
    { id: 7, name: "Noodle House", cuisine: "Chinese", rating: 4.1, diet: ["Vegetarian", "Comfort Food"], tags: ["🍜 Warm", "🥢 Traditional"] }
  ];

  const dietPlans = {
    "weight loss": [
      "Try Green Leaf's Kale Caesar Salad (350 cal)",
      "Sushi Master's Edamame (120 cal)",
      "Green Leaf's Acai Bowl (280 cal)",
      "Taco Fiesta's Veggie Quesadilla (320 cal)"
    ],
    "muscle gain": [
      "Burger Haven's Classic Cheeseburger (650 cal, 45g protein)",
      "Spicy Delight's Chicken Tikka Masala (580 cal, 38g protein)",
      "Sushi Master's Salmon Sushi Roll (420 cal, 25g protein)",
      "Pizza Palace's Pepperoni Pizza (slice: 320 cal, 15g protein)"
    ],
    "vegetarian": [
      "Pizza Palace's Margherita Pizza",
      "Green Leaf's Quinoa Bowl",
      "Taco Fiesta's Veggie Quesadilla",
      "Spicy Delight's Paneer Butter Masala"
    ],
    "vegan": [
      "Green Leaf's Acai Bowl",
      "Green Leaf's Avocado Toast",
      "Taco Fiesta's Guacamole with chips",
      "Noodle House's Vegetable Fried Rice"
    ],
    "low carb": [
      "Sushi Master's Chicken Teriyaki (no rice)",
      "Green Leaf's Kale Caesar Salad",
      "Burger Haven's Classic Cheeseburger (no bun)",
      "Spicy Delight's Chicken Tikka Masala (no rice)"
    ],
    "gluten free": [
      "Sushi Master's Sushi (with gluten-free soy sauce)",
      "Green Leaf's Quinoa Bowl",
      "Taco Fiesta's Tacos (corn tortillas)",
      "Spicy Delight's Chicken Tikka Masala (no naan)"
    ],
    "keto": [
      "Burger Haven's Classic Cheeseburger (no bun, extra cheese)",
      "Sushi Master's Salmon Sashimi",
      "Spicy Delight's Chicken Tikka Masala (no rice, no naan)",
      "Green Leaf's Kale Caesar Salad (no croutons)"
    ]
  };

  // Initial greeting
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: 1,
          text: "👋 Hi! I'm your Food Assistant. I can help you find the perfect meal based on your diet, preferences, or goals!",
          sender: 'bot',
          timestamp: new Date()
        },
        {
          id: 2,
          text: "You can ask me things like:\n• 'I'm on a diet, suggest healthy options'\n• 'What's good for weight loss?'\n• 'I want vegetarian food'\n• 'Show me high-protein meals'\n• Or tell me what cuisine you're craving!",
          sender: 'bot',
          timestamp: new Date()
        }
      ]);
    }
  }, [isOpen, messages.length]);

  // Auto-hide tooltip after 8 seconds
  useEffect(() => {
    if (showTooltip) {
      tooltipTimeoutRef.current = setTimeout(() => {
        setShowTooltip(false);
      }, 8000);
    }

    return () => {
      if (tooltipTimeoutRef.current) {
        clearTimeout(tooltipTimeoutRef.current);
      }
    };
  }, [showTooltip]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const response = generateBotResponse(inputValue.toLowerCase());
      const botMessage = {
        id: messages.length + 2,
        text: response,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const generateBotResponse = (userInput) => {
    // Check for diet plans
    for (const [diet, suggestions] of Object.entries(dietPlans)) {
      if (userInput.includes(diet)) {
        const randomSuggestions = [...suggestions].sort(() => 0.5 - Math.random()).slice(0, 3);
        return `For ${diet}, I recommend:\n${randomSuggestions.map(s => `• ${s}`).join('\n')}\n\n💡 Tip: Pair with water and watch portion sizes!`;
      }
    }

    // Check for specific keywords
    if (userInput.includes('weight loss') || userInput.includes('lose weight')) {
      const suggestions = dietPlans["weight loss"].slice(0, 3);
      return `For weight loss, focus on:\n${suggestions.map(s => `• ${s}`).join('\n')}\n\n📊 Calories matter: Aim for 400-500 cal meals\n💧 Drink plenty of water\n🏃 Combine with regular exercise`;
    }

    if (userInput.includes('muscle') || userInput.includes('protein')) {
      const suggestions = dietPlans["muscle gain"].slice(0, 3);
      return `For muscle gain, try:\n${suggestions.map(s => `• ${s}`).join('\n')}\n\n💪 Protein target: 20-30g per meal\n⏰ Eat within 1 hour after workout\n🥛 Consider protein shakes`;
    }

    if (userInput.includes('vegetarian')) {
      const suggestions = dietPlans["vegetarian"].slice(0, 3);
      return `Vegetarian options:\n${suggestions.map(s => `• ${s}`).join('\n')}\n\n🌱 Plant-based protein sources:\n• Lentils and beans\n• Tofu and tempeh\n• Nuts and seeds`;
    }

    if (userInput.includes('vegan')) {
      const suggestions = dietPlans["vegan"].slice(0, 3);
      return `Vegan recommendations:\n${suggestions.map(s => `• ${s}`).join('\n')}\n\n🌍 Vegan benefits:\n• Rich in fiber\n• Lower in saturated fat\n• Environmentally friendly`;
    }

    if (userInput.includes('healthy') || userInput.includes('fit')) {
      const healthyRestaurants = restaurants.filter(r => r.cuisine === "Healthy" || r.rating >= 4.5);
      const suggestions = healthyRestaurants.slice(0, 3);
      return `Healthy choices:\n${suggestions.map(r => `• ${r.name} (${r.cuisine}) - ⭐ ${r.rating}`).join('\n')}\n\n🥗 Healthy eating tips:\n• Include vegetables in every meal\n• Choose whole grains\n• Limit processed foods`;
    }

    if (userInput.includes('cheap') || userInput.includes('budget')) {
      const budgetRestaurants = restaurants.filter(r => r.minOrder <= 12);
      return `Budget-friendly options:\n${budgetRestaurants.map(r => `• ${r.name} - Min: $${r.minOrder}`).join('\n')}\n\n💰 Save money tips:\n• Look for lunch specials\n• Share large portions\n• Skip drinks and desserts`;
    }

    if (userInput.includes('quick') || userInput.includes('fast')) {
      const fastRestaurants = restaurants.filter(r => 
        parseInt(r.deliveryTime) <= 25 || r.name.includes("Burger") || r.name.includes("Pizza")
      );
      return `Quick delivery options:\n${fastRestaurants.map(r => `• ${r.name} - ${r.deliveryTime}`).join('\n')}\n\n⚡ Pro tip: Order during off-peak hours (2-5 PM) for faster delivery!`;
    }

    if (userInput.includes('thank') || userInput.includes('thanks')) {
      return "You're welcome! 😊 Let me know if you need more suggestions. Remember to stay hydrated and enjoy your meal! 🍽️";
    }

    if (userInput.includes('hello') || userInput.includes('hi') || userInput.includes('hey')) {
      return "Hello! 👋 I'm here to help you find delicious food. Tell me about your preferences, diet, or what you're craving!";
    }

    // Default response
    return `I understand you're looking for "${userInput}". Here are some suggestions:\n\n1. Try our AI recommendations on the homepage\n2. Browse restaurants by cuisine\n3. Check healthy options at Green Leaf\n4. For spicy food, try Spicy Delight\n\n💡 Try asking:\n• "I'm on a diet"\n• "Vegetarian options"\n• "Quick meals"\n• "Best rated restaurants"`;
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const quickQuestions = [
    "What's good for weight loss?",
    "I want to build muscle",
    "Vegetarian options please",
    "Show me quick meals"
  ];

  const handleQuickQuestion = (question) => {
    setInputValue(question);
    handleSendMessage();
  };

  return (
    <>
      {/* Tooltip/Message Above Chatbot */}
      {!isOpen && showTooltip && (
        <div
          style={{
            position: 'fixed',
            bottom: '90px',
            right: '20px',
            background: 'linear-gradient(135deg, #FF6B6B, #FF8E53)',
            color: 'white',
            padding: '12px 16px',
            borderRadius: '12px',
            boxShadow: '0 6px 20px rgba(255, 107, 107, 0.3)',
            zIndex: 999,
            maxWidth: '250px',
            animation: 'slideInUp 0.5s ease'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '5px' }}>
            <FaQuestionCircle />
            <strong style={{ fontSize: '14px' }}>Here's your helping bot!</strong>
          </div>
          <p style={{ 
            margin: 0, 
            fontSize: '12px', 
            opacity: 0.9,
            lineHeight: '1.4'
          }}>
            I can help with diet suggestions, restaurant recommendations, and meal planning!
          </p>
          <div style={{
            position: 'absolute',
            bottom: '-6px',
            right: '25px',
            width: '12px',
            height: '12px',
            background: '#FF6B6B',
            transform: 'rotate(45deg)'
          }} />
          
          <button
            onClick={() => setShowTooltip(false)}
            style={{
              position: 'absolute',
              top: '5px',
              right: '5px',
              background: 'transparent',
              border: 'none',
              color: 'white',
              fontSize: '12px',
              cursor: 'pointer',
              padding: '2px'
            }}
          >
            ×
          </button>
        </div>
      )}

      {/* Chatbot Button */}
      <button
        onClick={() => {
          setIsOpen(true);
          setShowTooltip(false);
        }}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #FF6B6B, #FF8E53)',
          border: 'none',
          color: 'white',
          fontSize: '24px',
          cursor: 'pointer',
          boxShadow: '0 4px 20px rgba(255, 107, 107, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          animation: 'pulse 2s infinite'
        }}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => {
          setTimeout(() => {
            if (!isOpen) setShowTooltip(false);
          }, 1000);
        }}
      >
        <FaRobot />
      </button>

      {/* Chatbot Window */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          bottom: '90px',
          right: '20px',
          width: '350px',
          height: '500px',
          background: 'white',
          borderRadius: '15px',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 1001,
          overflow: 'hidden',
          animation: 'slideInUp 0.3s ease'
        }}>
          {/* Chat Header */}
          <div style={{
            background: 'linear-gradient(135deg, #FF6B6B, #FF8E53)',
            color: 'white',
            padding: '15px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                background: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px'
              }}>
                <FaRobot />
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '16px' }}>Food Assistant</h3>
                <p style={{ margin: 0, fontSize: '12px', opacity: 0.9 }}>
                  {isTyping ? 'Typing...' : 'Here to help with food suggestions!'}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'white',
                fontSize: '20px',
                cursor: 'pointer',
                padding: '5px'
              }}
            >
              <FaTimes />
            </button>
          </div>

          {/* Quick Questions */}
          <div style={{
            padding: '10px',
            background: '#f8f9fa',
            borderBottom: '1px solid #eee',
            overflowX: 'auto',
            display: 'flex',
            gap: '8px'
          }}>
            {quickQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => handleQuickQuestion(question)}
                style={{
                  padding: '8px 12px',
                  background: 'white',
                  border: '1px solid #ddd',
                  borderRadius: '20px',
                  fontSize: '12px',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#FF6B6B';
                  e.currentTarget.style.color = 'white';
                  e.currentTarget.style.borderColor = '#FF6B6B';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'white';
                  e.currentTarget.style.color = 'inherit';
                  e.currentTarget.style.borderColor = '#ddd';
                }}
              >
                {question}
              </button>
            ))}
          </div>

          {/* Messages Container */}
          <div style={{
            flex: 1,
            padding: '15px',
            overflowY: 'auto',
            background: '#fafafa'
          }}>
            {messages.map((message) => (
              <div
                key={message.id}
                style={{
                  marginBottom: '15px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: message.sender === 'user' ? 'flex-end' : 'flex-start'
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px',
                  maxWidth: '85%'
                }}>
                  {message.sender === 'bot' && (
                    <div style={{
                      width: '30px',
                      height: '30px',
                      background: 'linear-gradient(135deg, #FF6B6B, #FF8E53)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '14px',
                      color: 'white',
                      flexShrink: 0
                    }}>
                      <FaRobot />
                    </div>
                  )}
                  <div style={{
                    background: message.sender === 'user' 
                      ? 'linear-gradient(135deg, #667eea, #764ba2)' 
                      : '#f0f2f5',
                    color: message.sender === 'user' ? 'white' : '#333',
                    padding: '12px 15px',
                    borderRadius: '18px',
                    borderBottomLeftRadius: message.sender === 'user' ? '18px' : '4px',
                    borderBottomRightRadius: message.sender === 'user' ? '4px' : '18px',
                    whiteSpace: 'pre-line',
                    lineHeight: '1.4'
                  }}>
                    {message.text}
                  </div>
                  {message.sender === 'user' && (
                    <div style={{
                      width: '30px',
                      height: '30px',
                      background: 'linear-gradient(135deg, #667eea, #764ba2)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '14px',
                      color: 'white',
                      flexShrink: 0
                    }}>
                      <FaUser />
                    </div>
                  )}
                </div>
                <span style={{
                  fontSize: '11px',
                  color: '#999',
                  marginTop: '4px',
                  marginLeft: message.sender === 'bot' ? '40px' : '0',
                  marginRight: message.sender === 'user' ? '40px' : '0'
                }}>
                  {formatTime(new Date(message.timestamp))}
                </span>
              </div>
            ))}
            
            {isTyping && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px' }}>
                <div style={{
                  width: '30px',
                  height: '30px',
                  background: 'linear-gradient(135deg, #FF6B6B, #FF8E53)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '14px',
                  color: 'white'
                }}>
                  <FaRobot />
                </div>
                <div style={{
                  background: '#f0f2f5',
                  padding: '12px 15px',
                  borderRadius: '18px',
                  borderBottomLeftRadius: '4px'
                }}>
                  <div style={{ display: 'flex', gap: '5px' }}>
                    <div style={{
                      width: '8px',
                      height: '8px',
                      background: '#FF6B6B',
                      borderRadius: '50%',
                      animation: 'bounce 1.4s infinite'
                    }} />
                    <div style={{
                      width: '8px',
                      height: '8px',
                      background: '#FF6B6B',
                      borderRadius: '50%',
                      animation: 'bounce 1.4s infinite 0.2s'
                    }} />
                    <div style={{
                      width: '8px',
                      height: '8px',
                      background: '#FF6B6B',
                      borderRadius: '50%',
                      animation: 'bounce 1.4s infinite 0.4s'
                    }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div style={{
            padding: '15px',
            borderTop: '1px solid #eee',
            background: 'white'
          }}>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about food, diet, or recommendations..."
                style={{
                  flex: 1,
                  padding: '12px 15px',
                  border: '1px solid #ddd',
                  borderRadius: '25px',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                style={{
                  width: '45px',
                  height: '45px',
                  background: inputValue.trim() 
                    ? 'linear-gradient(135deg, #FF6B6B, #FF8E53)' 
                    : '#ddd',
                  border: 'none',
                  borderRadius: '50%',
                  color: 'white',
                  fontSize: '18px',
                  cursor: inputValue.trim() ? 'pointer' : 'not-allowed',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease'
                }}
              >
                <FaPaperPlane />
              </button>
            </div>
            <p style={{
              fontSize: '11px',
              color: '#999',
              textAlign: 'center',
              marginTop: '8px'
            }}>
              💡 Try: "healthy options", "budget meals", or "vegetarian"
            </p>
          </div>
        </div>
      )}

      {/* Add CSS animations */}
      <style>
        {`
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
          }
          
          @keyframes bounce {
            0%, 60%, 100% { transform: translateY(0); }
            30% { transform: translateY(-5px); }
          }
          
          @keyframes slideInUp {
            from {
              transform: translateY(20px);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }
          
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
        `}
      </style>
    </>
  );
};

export default Chatbot;