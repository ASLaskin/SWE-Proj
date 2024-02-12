// Swiping.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Swiping = () => {
    const [response, setResponse] = useState('');
    const [food, setFood] = useState('');


    const getRecipes = async () => {
        try {
            await axios.post('http://localhost:5000/swiping', {
                food: food,
            });
        } catch (error) {
            console.error('Error fetching data', error);
            alert('Unsuccessful call');
        }
    };

    return (
        <>
            <form>
                <input 
                type="text"
                className='bg-red-800 rounded'
                value={food}
                onChange={(e) => setFood(e.target.value) }
                />
                
            </form>

            <h1 onClick={getRecipes} className='rounded text-bold text-8xl bg-blue-500'>run</h1>

        </>

    )
}

export default Swiping;