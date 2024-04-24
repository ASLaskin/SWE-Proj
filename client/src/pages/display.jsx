import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/header';
import { Link } from 'react-router-dom';

const Display = () => {
  const [loaded, setLoaded] = useState(false);
  const [recipes, setRecipes] = useState([]);

//Animation for the home page

  const fetchRecipes = async () => {
    try {
        const response = await axios.get("http://localhost:5000/getRecipes", {
            withCredentials: true
        });
        setRecipes(response.data.recipes);
        console.log(response);
    } catch (error) {
        console.error("Error Fetching Recipes:", error);
    }
  }

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
    window.location.href = '/swiping';
  };

  useEffect(() => {
    fetchRecipes();
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 1000);

    return () => clearTimeout(timer); 
  }, []);

  return (
    <>
    <div className='text-black bg-primaryColor flex justify-between  items-center'>
        <div className='flex'>
        <h1 onClick={changePage} className='cursor-pointer pl-2 pr-2 bg-white rounded'>
          User Preferences
        </h1>
        <h1 onClick={changePage2} className='cursor-pointer pl-2 pr-2 bg-white rounded'>
          Find Recipes
        </h1>
        </div>

        <h1 className='text-white font-bold pr-52'>Craven</h1>
        <h1 onClick={handleLogout} className='cursor-pointer pr-2 pl-2 bg-white rounded'>
          Logout
        </h1>
      </div>
    <head>
        <title>Recipe List</title>
        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@3.2.4/dist/tailwind.min.css" rel="stylesheet"></link>
    </head>

    <body className="bg-gray-100">
        <div className="container mx-auto px-4">
            <h1 className="text-3x1 font-bold text-center mt-6 mb-8">Recipe List</h1>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {recipes.map((recipe, index) => (
                <li key={index} className="bg-white p-4 rounded-lg shadow-lg">
                    <a href={recipe.link} target="_blank" className="block">
                        <img src={recipe.image} alt={recipe.name} className="w-full h-48 object-cover rounded-lg mb-4"></img>
                        <h2>{recipe.name}</h2>
                    </a>
                </li>
                ))}
            </ul>
        </div>
    </body>
    </>
  );
};

export default Display;
