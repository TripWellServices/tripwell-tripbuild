import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PlaceLibrary() {
  const navigate = useNavigate();
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlace, setSelectedPlace] = useState(null);

  // Fetch real data from API
  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        console.log('🔍 Fetching places from API...');
        const response = await fetch('http://localhost:3000/tripwell/place-library');
        
        if (response.ok) {
          const data = await response.json();
          console.log('✅ Places fetched:', data);
          setPlaces(data);
        } else {
          console.error('❌ Failed to fetch places:', response.status);
          // Fallback to empty array if API fails
          setPlaces([]);
        }
      } catch (error) {
        console.error('❌ Error fetching places:', error);
        // Fallback to empty array if API fails
        setPlaces([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaces();
  }, []);

  const handlePlaceClick = (place) => {
    setSelectedPlace(place);
  };

  const handleProfileClick = (profile) => {
    navigate(`/place-detail/${profile.slug}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-400 via-sky-300 to-blue-200 flex items-center justify-center">
        <div className="text-white text-xl">Loading place library...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-400 via-sky-300 to-blue-200 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">
            📚 Place Library
          </h1>
          <p className="text-white/90 text-lg drop-shadow-md">
            Browse trip profiles by city and see what Angela has generated
          </p>
        </div>

        {/* Places Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {places.map((place, index) => (
            <div
              key={index}
              onClick={() => handlePlaceClick(place)}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 cursor-pointer transition-all duration-200 hover:shadow-2xl hover:-translate-y-1"
            >
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl">🏙️</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {place.city}
                </h2>
                <p className="text-gray-600">
                  {place.profiles.length} profile{place.profiles.length !== 1 ? 's' : ''}
                </p>
                <div className="pt-2">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
                    View Profiles
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Selected Place Details */}
        {selectedPlace && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                {selectedPlace.city} Profiles
              </h2>
              <button
                onClick={() => setSelectedPlace(null)}
                className="text-gray-600 hover:text-gray-800 transition"
              >
                ✕ Close
              </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {selectedPlace.profiles.map((profile, index) => (
                <div
                  key={index}
                  onClick={() => handleProfileClick(profile)}
                  className="bg-gray-50 rounded-lg p-4 cursor-pointer transition hover:bg-gray-100"
                >
                  <h3 className="font-semibold text-gray-800 mb-2">
                    {profile.slug}
                  </h3>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p><strong>Budget:</strong> {profile.budget}</p>
                    <p><strong>Who With:</strong> {profile.whoWith}</p>
                    <p><strong>Priorities:</strong> {profile.priorities.join(', ')}</p>
                  </div>
                  <div className="pt-3">
                    <button className="text-blue-600 hover:text-blue-800 font-medium">
                      View Details →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Back Button */}
        <div className="text-center">
          <button
            onClick={() => navigate('/')}
            className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/30 transition"
          >
            ← Back to Trip Builder Engine
          </button>
        </div>

      </div>
    </div>
  );
}
