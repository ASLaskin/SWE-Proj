// Registration.js
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
    <div>
      <h1>Registration Page</h1>
      <form>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="button" onClick={handleRegistration}>
          Register
        </button>
      </form>
    </div>
  );
};

export default Registration;
