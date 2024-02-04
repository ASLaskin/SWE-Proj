import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import {About, Login} from './pages';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
