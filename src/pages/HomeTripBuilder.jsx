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

        {/* Two Main Options */}
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Enter in a Place */}
          <div 
            onClick={() => navigate('/enter-place')}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 cursor-pointer transition-all duration-200 hover:shadow-2xl hover:-translate-y-1"
          >
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl">📍</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">
                Enter in a Place
              </h2>
              <p className="text-gray-600">
                Create a new trip profile for a specific city. Set user preferences and let Angela generate personalized content.
              </p>
              <div className="pt-4">
                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
                  Create New Profile
                </button>
              </div>
            </div>
          </div>

          {/* See Place Library */}
          <div 
            onClick={() => navigate('/place-library')}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 cursor-pointer transition-all duration-200 hover:shadow-2xl hover:-translate-y-1"
          >
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl">📚</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">
                See Place Library
              </h2>
              <p className="text-gray-600">
                Browse existing trip profiles by city. View what Angela has generated for different user types and preferences.
              </p>
              <div className="pt-4">
                <button className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition">
                  Browse Library
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Test Generation Section */}
        <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 border border-white/30">
          <div className="text-center space-y-4">
            <h3 className="text-xl font-bold text-white">🧪 Angela Test Suite</h3>
            <p className="text-white/90 text-sm">
              Generate 11 test profiles to analyze Angela's behavior patterns
            </p>
            <button 
              onClick={() => navigate('/generate-tests')}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
            >
              Generate Test Profiles
            </button>
          </div>
        </div>

        {/* Modular Flow Test Section */}
        <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 border border-white/30">
          <div className="text-center space-y-4">
            <h3 className="text-xl font-bold text-white">🚀 Modular Flow Test</h3>
            <p className="text-white/90 text-sm">
              Test the new modular flow: Profile Save → Meta Attractions → Build List
            </p>
            <button 
              onClick={() => navigate('/build-meta-layer')}
              className="bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition"
            >
              Test Modular Flow
            </button>
          </div>
        </div>

        {/* Trip Setup Test Section */}
        <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 border border-white/30">
          <div className="text-center space-y-4">
            <h3 className="text-xl font-bold text-white">🚀 Trip Setup Test</h3>
            <p className="text-white/90 text-sm">
              Test complete flow: User → TripBase → City → Meta Attractions
            </p>
            <button 
              onClick={() => navigate('/trip-setup-test')}
              className="bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-700 transition"
            >
              Test Trip Setup
            </button>
          </div>
        </div>

        {/* Stats or Info */}
        <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 border border-white/30">
          <div className="grid grid-cols-3 gap-4 text-center text-white">
            <div>
              <div className="text-2xl font-bold">Paris</div>
              <div className="text-sm opacity-80">Cities</div>
            </div>
            <div>
              <div className="text-2xl font-bold">12</div>
              <div className="text-sm opacity-80">Profiles</div>
            </div>
            <div>
              <div className="text-2xl font-bold">48</div>
              <div className="text-sm opacity-80">Content Blocks</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
