import React, { useState } from 'react';
import ProductList from './ProductList';
import AboutUs from './AboutUs';
import './App.css';

function App() {
  const [showProductList, setShowProductList] = useState(false);

  const handleGetStartedClick = () => {
    setShowProductList(true);
  };

  return (
    <div className="app-container">
      <div className={`landing-page ${showProductList ? 'fade-out' : ''}`}>
        {!showProductList && (
          <div className="landing-content">
            <h1>Welcome To Paradise Nursery</h1>
            <AboutUs />
            <button className="get-started-button" onClick={handleGetStartedClick}>
              Get Started
            </button>
          </div>
        )}
      </div>
      {showProductList && <ProductList />}
    </div>
  );
}

export default App;
