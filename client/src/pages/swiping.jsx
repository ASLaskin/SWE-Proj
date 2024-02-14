// Swiping.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Swiping = () => {
    const [response, setResponse] = useState('');
    const [food, setFood] = useState('');


    const getRecipes = async () => {
        try {
            const Response = await axios.post('http://localhost:5000/swiping', {
                food: food,
            });
            setResponse(Response.data.hits[0].recipe.label);
            console.log(Response);
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
            <h2>{response}</h2>

        </>

    )
}

export default Swiping;