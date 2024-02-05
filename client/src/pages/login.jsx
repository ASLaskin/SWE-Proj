// Login.js
import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await axios.post('http://localhost:5000/users/login', {
        name: name,
        password: password,
      });
      alert('Login successful!');
    } catch (error) {
      console.error('Error during login:', error);
      alert('Login failed!');
    }
  };

  return (
    <div>
      <h1>Login Page</h1>
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
        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
