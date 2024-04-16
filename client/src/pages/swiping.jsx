import { useEffect, useState } from 'react';
import TinderCard from 'react-tinder-card'

const Swiping = () => {
  const [username, setUsername] = useState('not logged in');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const response = await fetch('http://localhost:5000/users/profile', {
          method: 'GET',
          credentials: 'include', // Include cookies in the request
        });
        const data = await response.json();
        console.log('Response:', data);
        if (!response.ok) {
          throw new Error('Response not OK');
        }
        setUsername(data.name);
      } catch (error) {
        console.error('Error fetching username:', error);
        setError(error.message);
      }
    };
    
    fetchUsername(); 

  }, []); 

  const onSwipe = (direction) => {
    console.log('You swiped: ' + direction)
  }
  
  const onCardLeftScreen = (myIdentifier) => {
    console.log(myIdentifier + ' left the screen')
  }
  
  return (
    <div>
      <h1>hola</h1>
      <h1>{username}</h1>
      <TinderCard onSwipe={onSwipe} onCardLeftScreen={() => onCardLeftScreen('fooBar')} preventSwipe={['right', 'left']}>Hello, World!</TinderCard>
      <TinderCard onSwipe={onSwipe} onCardLeftScreen={() => onCardLeftScreen('fooBar')} preventSwipe={['right', 'left']}>Bruh</TinderCard>
    </div>
  );
};

export default Swiping;
