import { Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import DetailsPage from './pages/DetailsPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* The parameter is now named 'slug' instead of 'id' */}
      <Route path="/:type/:slug" element={<DetailsPage />} />
    </Routes>
  );
}

export default App;