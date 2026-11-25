import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import './App.css';

const img = (id) =>
  `https://images.unsplash.com/${id}?w=400&h=300&fit=crop`;

const plantsArray = [
  {
    category: 'Air Purifying Plants',
    plants: [
      { name: 'Snake Plant', image: img('photo-1593482892290-f54927ae1bb6'), description: 'Produces oxygen at night, improving air quality.', cost: '$15' },
      { name: 'Spider Plant', image: img('photo-1572688484438-313a6e50c333'), description: 'Filters formaldehyde and xylene from the air.', cost: '$12' },
      { name: 'Peace Lily', image: img('photo-1593691509543-c55fb32d8de5'), description: 'Removes mold spores and purifies the air.', cost: '$18' },
      { name: 'Boston Fern', image: img('photo-1598880940371-c756e015faf1'), description: 'Adds humidity and removes toxins.', cost: '$20' },
      { name: 'Rubber Plant', image: img('photo-1596724878582-76f1bb3c2d3d'), description: 'Easy to grow and purifies the air.', cost: '$17' },
      { name: 'Aloe Vera', image: img('photo-1509423350716-97f9360b4e09'), description: 'Purifies the air and heals skin burns.', cost: '$14' },
    ],
  },
  {
    category: 'Aromatic Fragrant Plants',
    plants: [
      { name: 'Lavender', image: img('photo-1611909023032-2d6b3134ecba'), description: 'Calming scent, used in aromatherapy.', cost: '$20' },
      { name: 'Jasmine', image: img('photo-1592729645009-b96d1e63d14b'), description: 'Sweet fragrance, promotes relaxation.', cost: '$18' },
      { name: 'Rosemary', image: img('photo-1515586000433-45406d8e6662'), description: 'Invigorating scent, also used in cooking.', cost: '$15' },
      { name: 'Mint', image: img('photo-1628556270448-4d4e4148e1b1'), description: 'Refreshing aroma, great for teas.', cost: '$12' },
      { name: 'Lemon Balm', image: img('photo-1595908129746-57ca1a63dd4d'), description: 'Citrus scent that reduces stress.', cost: '$14' },
      { name: 'Hyacinth', image: img('photo-1584589167171-541ce45f1eea'), description: 'Strong floral scent that fills a room.', cost: '$22' },
    ],
  },
  {
    category: 'Succulent Plants',
    plants: [
      { name: 'Jade Plant', image: img('photo-1509423350716-97f9360b4e09'), description: 'Symbol of good luck, easy to care for.', cost: '$16' },
      { name: 'Echeveria', image: img('photo-1459411552884-841db9b3cc2a'), description: 'Rosette-shaped succulent in many colors.', cost: '$13' },
      { name: 'Haworthia', image: img('photo-1520412099551-62b6bafeb5bb'), description: 'Small, slow-growing, low light tolerant.', cost: '$14' },
      { name: 'Burro\'s Tail', image: img('photo-1446071103084-c257b5f70672'), description: 'Trailing stems, perfect for hanging pots.', cost: '$19' },
      { name: 'Zebra Plant', image: img('photo-1485955900006-10f4d324d411'), description: 'Striped leaves, compact and decorative.', cost: '$15' },
      { name: 'Panda Plant', image: img('photo-1493957988430-a5f2e15f39a3'), description: 'Soft, fuzzy leaves, very easy to grow.', cost: '$17' },
    ],
  },
];

function ProductList() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [showCart, setShowCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState({});

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedToCart((prev) => ({ ...prev, [plant.name]: true }));
  };

  const handleContinueShopping = (e) => {
    e.preventDefault();
    setShowCart(false);
  };

  return (
    <div>
      <div className="navbar">
        <h2>Paradise Nursery</h2>
        <div>
          <a href="#" onClick={(e) => { e.preventDefault(); setShowCart(false); }}>
            Plants
          </a>
          <a href="#" onClick={(e) => { e.preventDefault(); setShowCart(true); }}>
            🛒 Cart ({totalQuantity})
          </a>
        </div>
      </div>

      {!showCart ? (
        <div className="product-grid">
          {plantsArray.map((cat) => (
            <div key={cat.category}>
              <h1>{cat.category}</h1>
              <div className="product-list">
                {cat.plants.map((plant) => (
                  <div className="product-card" key={plant.name}>
                    <img className="product-image" src={plant.image} alt={plant.name} />
                    <h3>{plant.name}</h3>
                    <p>{plant.description}</p>
                    <p className="product-price">{plant.cost}</p>
                    <button
                      className="product-button"
                      disabled={addedToCart[plant.name]}
                      onClick={() => handleAddToCart(plant)}
                    >
                      {addedToCart[plant.name] ? 'Added to Cart' : 'Add to Cart'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={handleContinueShopping} />
      )}
    </div>
  );
}

export default ProductList;
