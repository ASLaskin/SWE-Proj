import React, { useState } from 'react';
import axios from 'axios';

const Registration = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleRegistration = async () => {
    try {
      await axios.post('http://localhost:5000/users', {
        name: name,
        password: password,
      });
      alert('Registration successful!');
    } catch (error) {
      console.error('Error during registration:', error);
      alert('Registration failed!');
    }
  };

  return (
    <div className='flex min-h-full flex-col justify-center px-6 py-12 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
        <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-primaryColor'>
          Registration Page
        </h2>
      </div>

      <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
        <form className='space-y-6'>
          <div>
            <label className='block text-sm font-medium leading-6 text-secondaryColor'>
              Name
            </label>
            <div className='mt-2' />
            <input
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='block w-full rounded-md border-0 py-1.5 text-secondaryColor shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primaryColor sm:text-sm sm:leading-6'
            />
          </div>

          <div>
            <label className='block text-sm font-medium leading-6 text-secondaryColor'>
              Password
            </label>
            <div className='mt-2' />
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='block w-full rounded-md border-0 py-1.5 text-secondaryColor shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primaryColor sm:text-sm sm:leading-6'
            />
          </div>

          <div>
            <button
              type='button'
              onClick={handleRegistration}
              className='flex w-full justify-center rounded-md bg-primaryColor px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-secondaryColor focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primaryColor'
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;
