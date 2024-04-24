import { useState, useEffect } from 'react';
import Header from '../components/header';
import { Link } from 'react-router-dom';

const Display = () => {
  const [loaded, setLoaded] = useState(false);

//Animation for the home page
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 1000);

    return () => clearTimeout(timer); 
  }, []);

  return (
    <>
    <div 
    className={`h-screen flex flex-col bg-auto `} 
    style={{ background: 'linear-gradient(to bottom, #8A2BE2, #00FFFF)' }}
    
    >
    </div>
    </>
  );
};

export default Display;
