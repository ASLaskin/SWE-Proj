import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { About, Login } from './pages';
import React, { useEffect, useState } from 'react';

function App() {
  const [backendData, setBackendData] = useState([{}]);

  useEffect(() => {
    fetch('api')
      .then((response) => response.json())
      .then((data) => {
        setBackendData(data);
      });
  }, []);

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/about' element={<About />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
