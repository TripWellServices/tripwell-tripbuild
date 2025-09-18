import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function HomeTripBuilder() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-400 via-sky-300 to-blue-200 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full space-y-8">
        
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">
            🏗️ Trip Builder Engine
          </h1>
          <p className="text-white/90 text-lg drop-shadow-md">
            Build and test personalized trip content with Angela AI
          </p>
        </div>

        {/* Current Test - Trip Setup Flow */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto">
              <span className="text-2xl">🚀</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">
              Trip Setup Flow Test
            </h2>
            <p className="text-gray-600">
              Test the complete flow: User → TripBase → City → Meta Attractions
            </p>
            <div className="pt-4">
              <button 
                onClick={() => navigate('/trip-setup-test')}
                className="bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-700 transition"
              >
                Test Trip Setup
              </button>
            </div>
          </div>
        </div>


      </div>
    </div>
  );
}
