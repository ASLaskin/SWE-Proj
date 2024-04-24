// Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.post('http://localhost:5000/users/login', {
        name: name,
        password: password,
      }, {
        withCredentials: true, 
      });
      const preferencesResponse = await axios.get('http://localhost:5000/getPreferences',
        { withCredentials: true }
      );
      if (preferencesResponse.data.preferences && preferencesResponse.data.preferences.length > 0) {
        window.location.href = '/swiping';
      } else {
        window.location.href = '/prefrences';
      }
      
    } catch (error) {
      console.error('Error during login:', error);
      alert('Login failed!');
    }
  };

  return (
    <div className='flex min-h-full flex-col justify-center px-6 py-12 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
        <Link to='/'>
        <img className='mx-auto h-10 w-auto' src='./src/assets/Craven.svg' alt='Craven' />
        </Link>
        <h2 class='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-primaryColor'>
          Sign in to your account
        </h2>
      </div>

      <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
        <form className='space-y-6'>
          <div>
            <label className='block text-sm font-medium leading-6 text-secondaryColor'>
              Username
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
            <div className='flex items-center justify-between'>
              <label className='block text-sm  font-medium leading-6 text-secondaryColor'>
                Password
              </label>

              <div className='text-sm'>
                <a href='#' className='font-semibold text-primaryColor hover:text-accent'>
                  Forgot password?
                </a>
              </div>
            </div>
            <div className='mt-2'>
              <input
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm focus:ring-primaryColor sm:leading-6'
              />
            </div>
          </div>

          <div>
            <button
              type='submit'
              className='flex w-full justify-center rounded-md bg-primaryColor px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-secondaryColor focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primaryColor'
              onClick={(event) => handleLogin(event)}
            >
              Sign in
            </button>
          </div>
        </form>

        <Link to='/signup'>
          <p className='mt-10 text-center text-sm text-gray-500 hover:text-accent'>Not a member?</p>
        </Link>
      </div>
    </div>
  );
};

export default Login;
