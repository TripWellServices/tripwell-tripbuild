import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeTripBuilder from './pages/HomeTripBuilder';
import EnterPlace from './pages/EnterPlace';
import PlaceLibrary from './pages/PlaceLibrary';
import PlaceDetail from './pages/PlaceDetail';
import GenerateTests from './pages/GenerateTests';
import BuildMetaLayer from './pages/BuildMetaLayer';
import CityToMetaTest from './pages/CityToMetaTest';
import TripSetupTest from './pages/TripSetupTest';
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
          <Route path="/build-meta-layer" element={<BuildMetaLayer />} />
          <Route path="/city-to-meta-test" element={<CityToMetaTest />} />
          <Route path="/trip-setup-test" element={<TripSetupTest />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
