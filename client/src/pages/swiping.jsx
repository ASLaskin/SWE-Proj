import { useEffect, useState } from 'react';

const Swiping = () => {
  const [username, setUsername] = useState('not logged in');
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchUsername = async () => {
  //     try {
  //       const response = await fetch('/profile');
  //       if (!response.ok) {
  //         throw new Error('Failed to fetch username');
  //       }
  //       const data = await response.json();
  //       console.log(data); 
  //       setUsername(data.username); 
  //     } catch (error) {
  //       console.error('Error fetching username:', error);
  //     }
  //   };

  //   fetchUsername();
  // }, []);

  const fetchUsername = async () => {
    try{
      const response = await fetch('http://localhost:5000/users/profile', {
        method: 'GET',
      });
      if (!response.ok) {
        throw new Error('that response was not ok ');
      }
      const data = await response.json();
      setUsername(data.username);
    }catch (error) {
      console.error('Error fetching username:', error);
    }
  };

  return (
    <div>
      <h1>hola</h1>
      <h1>{username}</h1>
      <button onClick={fetchUsername}>Fetch Username</button>
    </div>
  );
};

export default Swiping;