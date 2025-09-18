import React, { useState } from 'react';

const TripSetupTest = () => {
  const [tripData, setTripData] = useState({
    tripName: 'Test Paris Trip',
    purpose: 'Testing trip setup flow',
    city: 'Paris, France',
    startDate: '2024-06-01',
    endDate: '2024-06-05',
    partyCount: 2,
    whoWith: 'spouse',
    joinCode: `TEST-${Date.now()}`
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleTest = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      console.log('🚀 Testing Trip Setup Flow');
      console.log('Trip Data:', tripData);

      // Step 1: Create fake user
      console.log('👤 Step 1: Creating fake user...');
      const userResponse = await fetch('https://gofastbackend.onrender.com/tripwell/user/createOrFind', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firebaseId: `test-user-${Date.now()}`,
          email: 'test@example.com',
          funnelStage: 'full_app'
        })
      });

      const userData = await userResponse.json();
      console.log('User created:', userData);

      if (userData.error) {
        throw new Error(`User creation failed: ${userData.error}`);
      }

      // Step 2: Create trip (this will trigger city creation and meta attractions)
      console.log('🗺️ Step 2: Creating trip...');
      const tripResponse = await fetch('https://gofastbackend.onrender.com/tripwell/trip-setup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer mock-token'
        },
        body: JSON.stringify(tripData)
      });

      const tripResult = await tripResponse.json();
      console.log('Trip created:', tripResult);

      if (!tripResult.ok) {
        throw new Error(`Trip creation failed: ${tripResult.error}`);
      }

      // Step 3: Check content library to see if city and meta attractions were created
      console.log('📚 Step 3: Checking content library...');
      const contentResponse = await fetch('https://gofastbackend.onrender.com/tripwell/content-library/status');
      const contentData = await contentResponse.json();
      console.log('Content Library:', contentData);

      setResult({
        user: userData,
        trip: tripResult,
        content: contentData
      });
      console.log('✅ SUCCESS! Complete flow tested!');

    } catch (error) {
      console.error('❌ Error:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setTripData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Trip Setup Test
        </h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Test Trip Data</h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Trip Name
              </label>
              <input
                type="text"
                value={tripData.tripName}
                onChange={(e) => handleInputChange('tripName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                City
              </label>
              <input
                type="text"
                value={tripData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Date
              </label>
              <input
                type="date"
                value={tripData.startDate}
                onChange={(e) => handleInputChange('startDate', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                End Date
              </label>
              <input
                type="date"
                value={tripData.endDate}
                onChange={(e) => handleInputChange('endDate', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Party Count
              </label>
              <input
                type="number"
                value={tripData.partyCount}
                onChange={(e) => handleInputChange('partyCount', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Who With
              </label>
              <select
                value={tripData.whoWith}
                onChange={(e) => handleInputChange('whoWith', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="spouse">Spouse</option>
                <option value="spouse-kids">Spouse + Kids</option>
                <option value="son-daughter">Son/Daughter</option>
                <option value="friends">Friends</option>
                <option value="solo">Solo</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
          
          <button
            onClick={handleTest}
            disabled={loading}
            className="w-full mt-6 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? 'Testing...' : 'Test Trip Setup Flow'}
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
            <h3 className="text-red-800 font-medium">Error</h3>
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {result && (
          <div className="space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-md p-4">
              <h3 className="text-green-800 font-medium">✅ Success!</h3>
              <p className="text-green-700">Complete flow tested: User → TripBase → City → Meta Attractions</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">User Creation Result</h3>
              <pre className="bg-gray-100 p-4 rounded-md overflow-auto text-sm">
                {JSON.stringify(result.user, null, 2)}
              </pre>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Trip Creation Result</h3>
              <pre className="bg-gray-100 p-4 rounded-md overflow-auto text-sm">
                {JSON.stringify(result.trip, null, 2)}
              </pre>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Content Library Status</h3>
              <pre className="bg-gray-100 p-4 rounded-md overflow-auto text-sm">
                {JSON.stringify(result.content, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TripSetupTest;
