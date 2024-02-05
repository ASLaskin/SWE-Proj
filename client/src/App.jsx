import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { About, Login, Register,Home } from './pages';

function App() {


  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/about' element={<About />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
