import { Routes, Route } from 'react-router-dom';
import Apidoc from './pages/Apidoc';
import Datasets from './pages/Datasets';
import Examples from './pages/Examples';
import Home from './pages/Home';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/apidoc" element={<Apidoc />} />
      <Route path="/datasets" element={<Datasets />} />
      <Route path="/examples" element={<Examples />} />
    </Routes>
  );
}

export default App;
