import React from 'react';
import TinderCard from 'react-tinder-card';
import './Swiping.css'; // Import your CSS file

let string_arr=["Hello, World!", "Bruh", "please"];

let global_ind=0;

const Swiping = () => {
  
   const onSwipe = (direction) => {
     console.log('You swiped: ' + direction)
     global_ind+=1;
   }

  const swiped = (direction, nametoDelete) => {
    // console.log("please")
    console.log("global_ind")
    global_ind += 1
    console.log(global_ind)
  }

  const onCardLeftScreen = (myIdentifier) => {
    console.log(myIdentifier + ' left the screen')
  }

  return (
    <div>
      <div className="imageStack">

      {/* <TinderCard onSwipe={onSwipe} onCardLeftScreen={() => onCardLeftScreen('fooBar')} preventSwipe={['right', 'left']}>{string_arr[global_ind]}</TinderCard> */}


      <TinderCard className='swipe'  onSwipe={(dir) => swiped(dir, string_arr[global_ind])} onCardLeftScreen={() => onCardLeftScreen('fooBar')} preventSwipe={['right', 'left']}>
      <div style={{ 
                    backgroundImage: 'url(./src/assets/Solid_white_bordered.svg.jpeg)',
                    backgroundPosition: 'center',
                    }} className='card'>
      <h3>{string_arr[global_ind]}</h3>
      </div>
      </TinderCard>
      <TinderCard className='swipe'  onSwipe={(dir) => swiped(dir, string_arr[global_ind])} onCardLeftScreen={() => onCardLeftScreen('fooBar')} preventSwipe={['right', 'left']}>
      <div 
      style={{ 
            backgroundImage: 'url(./src/assets/Solid_white_bordered.svg.jpeg)',
            backgroundPosition: 'center',
            }} className='card'>
      <h3>{string_arr[global_ind]}</h3>
      </div>
      </TinderCard>

      </div> 
    </div>
  );
}


export default Swiping;
