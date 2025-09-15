import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function EnterPlace() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    city: '',
    season: 'Spring',
    purpose: '',
    whoWith: 'solo',
    priorities: [],
    vibes: [],
    mobility: [],
    travelPace: [],
    budget: ''
  });

  const [loading, setLoading] = useState(false);

  // Options
  const seasonOptions = ['Spring', 'Summer', 'Fall', 'Winter'];
  const whoWithOptions = [
    { value: 'solo', label: 'Solo Traveler' },
    { value: 'spouse', label: 'Spouse / Partner' },
    { value: 'spouse-kids', label: 'Spouse/Kids' },
    { value: 'son-daughter', label: 'Son/Daughter' },
    { value: 'friends', label: 'Friends' },
    { value: 'other', label: 'Other' }
  ];
  const priorityOptions = [
    'Culture & History', 'Food & Dining', 'Adventure & Outdoor',
    'Relaxation & Wellness', 'Shopping & Markets', 'Nightlife & Fun'
  ];
  const vibeOptions = [
    'Adventurous & Active', 'Relaxed & Chill', 'Romantic & Intimate',
    'Social & Fun', 'Luxurious & Upscale', 'Authentic & Local'
  ];
  const mobilityOptions = [
    'Love walking everywhere', 'Mix of walking and transport',
    'Prefer transport options', 'Need accessible routes'
  ];
  const travelPaceOptions = [
    'Fast Paced - Pack it all in', 'Moderate - Balanced activities',
    'Slow & Relaxed - Take your time', 'Flexible - Go with the flow'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayToggle = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Generate profile slug
      const profileSlug = `${formData.city}${formData.budget.replace(/[^a-zA-Z0-9]/g, '')}${formData.whoWith}`;
      
      console.log('🚀 Starting modular flow for:', profileSlug);
      
      // Step 1: Save place profile
      console.log('📋 Step 1: Saving place profile...');
      const profileResponse = await fetch('https://gofastbackend.onrender.com/tripwell/place-profile-save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          placeSlug: profileSlug,
          inputVariables: formData
        })
      });
      
      if (!profileResponse.ok) {
        throw new Error('Failed to save place profile');
      }
      const profileResult = await profileResponse.json();
      console.log('✅ Place profile saved:', profileResult.placeProfileId);
      
      // Step 2: Generate meta attractions
      console.log('📋 Step 2: Generating meta attractions...');
      const metaResponse = await fetch('https://gofastbackend.onrender.com/tripwell/meta-attractions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          placeSlug: profileSlug,
          city: formData.city,
          season: formData.season
        })
      });
      
      if (!metaResponse.ok) {
        throw new Error('Failed to generate meta attractions');
      }
      const metaResult = await metaResponse.json();
      console.log('✅ Meta attractions generated:', metaResult.metaAttractions.length);
      
      // Step 3: Build personalized list
      console.log('🎯 Step 3: Building personalized list...');
      const buildResponse = await fetch('https://gofastbackend.onrender.com/tripwell/build-list', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          placeSlug: profileSlug
        })
      });
      
      if (!buildResponse.ok) {
        throw new Error('Failed to build personalized list');
      }
      const buildResult = await buildResponse.json();
      console.log('✅ Personalized list built:', buildResult.contentGenerated);
      
      // Navigate directly to the new place detail
      navigate(`/place-detail/${profileSlug}`);
      
    } catch (error) {
      console.error('❌ Error in modular flow:', error);
      alert('Failed to generate profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-400 via-sky-300 to-blue-200 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full space-y-8 bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20">
        
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            📍 Enter in a Place
          </h1>
          <p className="text-gray-600">
            Create a new trip profile and let Angela generate personalized content
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Basic Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                placeholder="e.g., Paris, Tokyo"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Season</label>
              <select
                value={formData.season}
                onChange={(e) => handleInputChange('season', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {seasonOptions.map(season => (
                  <option key={season} value={season}>{season}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Purpose</label>
            <input
              type="text"
              value={formData.purpose}
              onChange={(e) => handleInputChange('purpose', e.target.value)}
              placeholder="e.g., Anniversary trip, Explore culture"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Who With</label>
            <select
              value={formData.whoWith}
              onChange={(e) => handleInputChange('whoWith', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              {whoWithOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>

          {/* Priorities */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Priorities</label>
            <div className="grid grid-cols-2 gap-2">
              {priorityOptions.map(priority => (
                <label key={priority} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.priorities.includes(priority)}
                    onChange={() => handleArrayToggle('priorities', priority)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-sm">{priority}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Vibes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Vibes</label>
            <div className="grid grid-cols-2 gap-2">
              {vibeOptions.map(vibe => (
                <label key={vibe} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.vibes.includes(vibe)}
                    onChange={() => handleArrayToggle('vibes', vibe)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-sm">{vibe}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Mobility */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Mobility</label>
            <div className="space-y-2">
              {mobilityOptions.map(mobility => (
                <label key={mobility} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.mobility.includes(mobility)}
                    onChange={() => handleArrayToggle('mobility', mobility)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-sm">{mobility}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Travel Pace */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Travel Pace</label>
            <div className="space-y-2">
              {travelPaceOptions.map(pace => (
                <label key={pace} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.travelPace.includes(pace)}
                    onChange={() => handleArrayToggle('travelPace', pace)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-sm">{pace}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Budget */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Daily Budget</label>
            <input
              type="text"
              value={formData.budget}
              onChange={(e) => handleInputChange('budget', e.target.value)}
              placeholder="e.g., $100-200/day, Budget-friendly, Luxury"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={loading || !formData.city}
              className={`w-full py-3 px-6 rounded-lg font-semibold transition ${
                loading || !formData.city
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {loading ? 'Generating Profile...' : 'Generate Profile with Angela'}
            </button>
          </div>

        </form>

        <div className="text-center">
          <button
            onClick={() => navigate('/')}
            className="text-gray-600 hover:text-gray-800 transition"
          >
            ← Back to Trip Builder Engine
          </button>
        </div>

      </div>
    </div>
  );
}
