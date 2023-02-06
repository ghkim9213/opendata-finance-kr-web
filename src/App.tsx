import { Routes, Route } from 'react-router-dom';
import Docs from './pages/Docs';
import Datasets from './pages/Datasets';
import Examples from './pages/Examples';
import Home from './pages/Home';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/documentations" element={<Docs />} />
      <Route path="/datasets" element={<Datasets />} />
      <Route path="/examples" element={<Examples />} />
    </Routes>
  );
}

export default App;
