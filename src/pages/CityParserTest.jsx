import React, { useState } from 'react';

const CityParserTest = () => {
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleTest = async () => {
    if (!city.trim()) {
      setError('Please enter a city');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      console.log('🚀 Testing City Parser in Sandbox');
      console.log('City:', city);

      // Step 1: Create a test user first
      console.log('👤 Step 1: Creating test user...');
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

      // Step 2: Create a TripBase with the city
      console.log('🗺️ Step 2: Creating TripBase with city...');
      const tripData = {
        joinCode: `TEST-${Date.now()}`,
        tripName: "Test Trip",
        purpose: "Testing city parser",
        startDate: "2024-06-01",
        endDate: "2024-06-05",
        city: city,
        partyCount: 2,
        whoWith: "spouse"
      };
      
      const tripResponse = await fetch('https://gofastbackend.onrender.com/tripwell/trip-created', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(tripData)
      });
      
      const tripResult = await tripResponse.json();
      console.log('TripBase created:', tripResult);
      
      if (tripResult.error) {
        throw new Error(`TripBase creation failed: ${tripResult.error}`);
      }
      
      // Step 3: Test city parser with TripBase ID
      console.log('🏙️ Step 3: Testing city parser with TripBase ID...');
      const cityResponse = await fetch('https://gofastbackend.onrender.com/tripwell/parse-city', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          tripId: tripResult.tripId,
          city: city // Fallback city
        })
      });

      const cityData = await cityResponse.json();
      console.log('City Parser Result:', cityData);

      if (cityData.status !== 'success') {
        throw new Error(`City parser failed: ${cityData.message}`);
      }

      // Step 3: Check content library
      console.log('📚 Step 3: Checking content library...');
      const contentResponse = await fetch('https://gofastbackend.onrender.com/tripwell/content-library/status');
      const contentData = await contentResponse.json();
      console.log('Content Library:', contentData);

      setResult({
        user: userData,
        city: cityData,
        content: contentData
      });
      console.log('✅ SUCCESS! User created, city parsed, and saved to MongoDB!');

    } catch (error) {
      console.error('❌ Error:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          City Parser Test
        </h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Test City Parser</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                City
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city name (e.g., Paris, Tokyo, New York)"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <button
              onClick={handleTest}
              disabled={loading || !city.trim()}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? 'Testing...' : 'Test City Parser'}
            </button>
          </div>
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
              <p className="text-green-700">City saved to MongoDB and user linked!</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">User Creation Result</h3>
              <pre className="bg-gray-100 p-4 rounded-md overflow-auto text-sm">
                {JSON.stringify(result.user, null, 2)}
              </pre>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">City Parser Result</h3>
              <pre className="bg-gray-100 p-4 rounded-md overflow-auto text-sm">
                {JSON.stringify(result.city, null, 2)}
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

export default CityParserTest;
