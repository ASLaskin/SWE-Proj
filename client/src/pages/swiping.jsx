import { useEffect, useState } from 'react';

const Swiping = () => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const response = await fetch('/profile');
        if (!response.ok) {
          throw new Error('Failed to fetch username');
        }
        const data = await response.json();
        console.log(data); 
        setUsername(data.username); 
      } catch (error) {
        console.error('Error fetching username:', error);
      }
    };

    fetchUsername();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>hola</h1>
      <h1>{username}</h1>
    </div>
  );
};

export default Swiping;