import React, { useState, useRef, useEffect } from 'react';
import TinderCard from 'react-tinder-card';
import axios from 'axios';
import './swiping.css'; // Import your CSS file
import { Link } from 'react-router-dom';

const Swiping = () => {
  const [cards, setCards] = useState([]);
  const [images, setImages] = useState([]);
  const cardRefs = cards.map(() => React.createRef());

  const onSwipe = (direction, name) => {
    console.log('You swiped: ' + direction + ' on ' + name);
    setTimeout(() => {
      setCards((cards) => cards.filter((card) => card !== name));
    }, 600); // delay in ms
    if (cards.length <= 3) {
      getRecipes();
    }
  };

  const onCardLeftScreen = (name) => {
    console.log(name + ' left the screen');
    console.log(cards);
  };
  const handleLogout = async (event) => {
    try {
      event.preventDefault();
      await axios.post(
        'http://localhost:5000/users/logout',
        {},
        {
          withCredentials: true,
        },
      );
      window.location.href = '/';
    } catch (error) {
      console.error('Error during login:', error);
      alert('Login failed!');
    }
  };
  const changePage = () => {
    window.location.href = '/prefrences';
  };

  //CHANGE THIS TO THE SAVED PAGE
  const changePage2 = () => {
    window.location.href = '/prefrences';
  };

  const swipe = (dir) => {
    const cardsLeft = cards.filter((card) => !alreadyRemoved.includes(card));
    if (cardsLeft.length) {
      const toBeRemoved = cardsLeft[cardsLeft.length - 1]; // Find the card object to be removed
      const index = cards.map((card) => card.name).indexOf(toBeRemoved.name); // Find the index of which to make the reference to
      alreadyRemoved.push(toBeRemoved); // Make sure the next card gets removed next time if this card do not have time to exit the screen
      cardRefs[index].current.swipe(dir); // Swipe the card!
    }
  };

  const getRecipes = async () => {
    try {
      console.log('here');
      const Response = await axios.post(
        'http://localhost:5000/swiping',
        {
          food: 'wine',
        },
        {
          withCredentials: true,
        },
      );
      let imgs = [];
      let recp = [];
      for (let i = 0; i < 20; i++) {
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
    return () => {};
  }, []);

  return (
    <>
      <div className='text-black bg-primaryColor flex justify-between  items-center'>
        <div className='flex'>
        <h1 onClick={changePage} className='cursor-pointer pl-2 pr-2 bg-white rounded'>
          User Preferences
        </h1>
        <h1 onClick={changePage2} className='cursor-pointer pl-2 pr-2 bg-white rounded'>
          Saved Recipes
        </h1>
        </div>

        <h1 className='text-white font-bold pr-24'>Craven</h1>
        <h1 onClick={handleLogout} className='cursor-pointer pr-2 pl-2 bg-white rounded'>
          Logout
        </h1>
      </div>
      <div className='bg-black h-screen flex items-center justify-center flex-col '>
        <div className='flex h-3/4 bg-black pr-48'>
          {/* Container for cards */}
          <div className='mt-20'>
            {cards.map((item, index) => (
              <div className='cardContainer' key={item}>
                <TinderCard
                  ref={cardRefs[index]}
                  onSwipe={(dir) => onSwipe(dir, item)}
                  onCardLeftScreen={() => onCardLeftScreen(item)}
                >
                  <div
                    style={{
                      backgroundImage: `url(${images[index]})`,
                      zIndex: cards.length - index,
                    }}
                    className='card bg-white shadow-2xl rounded-lg p-4 w-64 h-96'
                  >
                    {cards[index]}
                  </div>
                </TinderCard>
              </div>
            ))}
          </div>
        </div>
        <div className='flex justify-between w-1/2'>
          <button className='text-white bg-primaryColor p-2 rounded' onClick={() => swipe('left')}>
            Left
          </button>
          <button className='text-white bg-primaryColor p-2 rounded' onClick={() => swipe('right')}>
            Right
          </button>
        </div>
      </div>
    </>
  );
};

export default Swiping;
