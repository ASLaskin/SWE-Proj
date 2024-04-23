import React, { useState, useRef, useEffect } from 'react';
import TinderCard from 'react-tinder-card';
import axios from 'axios';
import './swiping.css'; // Import your CSS file

const Swiping = () => {
  const [cards, setCards] = useState([]);
  const [images, setImages] = useState([]);
  const cardRefs = cards.map(() => React.createRef());

  const onSwipe = (direction, name) => {
    console.log('You swiped: ' + direction + ' on ' + name);
    setTimeout(() => {
        setCards(cards => cards.filter(card => card !== name));
      }, 600); // delay in ms
      if(cards.length <= 3) {
        getRecipes();
      }
  }

  const onCardLeftScreen = (name) => {
    console.log(name + ' left the screen');
    console.log(cards);
    
  }

  const swipe = (dir) => {
    const cardsLeft = cards.filter(card => !alreadyRemoved.includes(card))
    if (cardsLeft.length) {
      const toBeRemoved = cardsLeft[cardsLeft.length - 1] // Find the card object to be removed
      const index = cards.map(card => card.name).indexOf(toBeRemoved.name) // Find the index of which to make the reference to
      alreadyRemoved.push(toBeRemoved) // Make sure the next card gets removed next time if this card do not have time to exit the screen
      cardRefs[index].current.swipe(dir) // Swipe the card!
    }
    
  }

  const getRecipes = async () => {
    try {
        console.log("here");
        const Response = await axios.post('http://localhost:5000/swiping', {
            food: "wine",
        });
        let imgs = [];
        let recp = [];
        for(let i = 0; i < 20; i++) {
          imgs.push(Response.data.hits[i].recipe.image);
          recp.push(Response.data.hits[i].recipe.label);
        }
        setCards([...recp, ...cards]);
        setImages([...imgs, ...images]);
    } catch (error) {
        console.error('Error fetching data', error);
        alert('Unsuccessful call');
    }
  };

  useEffect(() => {
    getRecipes();
    return () => {
      
    };
  }, []); 

  return (
    
    <div class="specific-page">
      <div>{cards.length}</div>
      <div className="swiping-container"> {/* New wrapping div */}
        <div className="imageStack">
          {cards.map((item, index) => (
            <div className='cardContainer'>
            <TinderCard
              ref={cardRefs[index]}
              key={item}
              className='swipe'
              onSwipe={(dir) => onSwipe(dir, item)}
              onCardLeftScreen={() => onCardLeftScreen(item)}
            >
              <div
                style={{
                  backgroundImage: `url(${images[index]})`,
                  zIndex: cards.length - index, // Add this line
                }}
                className='card'
              >
                <h3>{cards[index]}</h3>
              </div>
            </TinderCard>
            </div>
          ))}
        </div>
        <button onClick={() => swipe('left')}></button>
        <button onClick={() => swipe('right')}></button>
      </div>
    </div>
  );
}

export default Swiping;
