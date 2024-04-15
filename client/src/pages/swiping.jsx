import React, { useState, useRef } from 'react';
import TinderCard from 'react-tinder-card';
import './Swiping.css'; // Import your CSS file

let string_arr=["Hello, World!", "Bruh", "please"];

const Swiping = () => {
  const [cards, setCards] = useState(string_arr);
  const cardRefs = cards.map(() => React.createRef());

  const onSwipe = (direction, name) => {
    console.log('You swiped: ' + direction + ' on ' + name);
    setTimeout(() => {
        setCards(cards => cards.filter(card => card !== name));
      }, 600); // delay in ms
  }

  const onCardLeftScreen = (name) => {
    console.log(name + ' left the screen');
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

  return (
    <div className="imageStack">
      {cards.map((item, index) => (
        <TinderCard
          ref={cardRefs[index]}
          key={item}
          className='swipe'
          onSwipe={(dir) => onSwipe(dir, item)}
          onCardLeftScreen={() => onCardLeftScreen(item)}
        >
          <div
            style={{
              backgroundImage: 'url(./src/assets/Solid_white_bordered.svg.jpeg)',
              backgroundPosition: 'center',
              zIndex: cards.length - index, // Add this line
            }}
            className='card'
          >
            <h3>{item}</h3>
          </div>
        </TinderCard>
      ))}
      <button onClick={() => swipe('left')}></button>
      <button onClick={() => swipe('right')}></button>
    </div>
  );
}

export default Swiping;
