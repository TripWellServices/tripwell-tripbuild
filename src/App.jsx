import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeTripBuilder from './pages/HomeTripBuilder';
import EnterPlace from './pages/EnterPlace';
import PlaceLibrary from './pages/PlaceLibrary';
import PlaceDetail from './pages/PlaceDetail';
import GenerateTests from './pages/GenerateTests';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomeTripBuilder />} />
          <Route path="/enter-place" element={<EnterPlace />} />
          <Route path="/place-library" element={<PlaceLibrary />} />
          <Route path="/place-detail/:placeSlug" element={<PlaceDetail />} />
          <Route path="/generate-tests" element={<GenerateTests />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
