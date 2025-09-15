import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeTripBuilder from './pages/HomeTripBuilder';
import EnterPlace from './pages/EnterPlace';
import PlaceLibrary from './pages/PlaceLibrary';
import ProfileDetail from './pages/ProfileDetail';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomeTripBuilder />} />
          <Route path="/enter-place" element={<EnterPlace />} />
          <Route path="/place-library" element={<PlaceLibrary />} />
          <Route path="/profile-detail/:profileSlug" element={<ProfileDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
