import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { About, Login, Register,Home, Prefrences,Swiping, Display} from './pages';

function App() {


  return (
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/about' element={<About />} />
          <Route path='/prefrences' element={<Prefrences />} />
          <Route path='/swiping' element={<Swiping />} />
          <Route path='/display' element={<Display />} />
        </Routes>
      </Router>
  );
}

export default App;
