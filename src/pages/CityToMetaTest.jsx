import React, { useState } from 'react';

const CityToMetaTest = () => {
  const [city, setCity] = useState('');
  const [season, setSeason] = useState('Summer');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handleTest = async () => {
    if (!city.trim()) {
      setError('Please enter a city');
      return;
    }

    setLoading(true);
    setError(null);
    setResults(null);

    try {
      console.log('🚀 Starting City to Meta Test');
      console.log('City:', city, 'Season:', season);

      // Step 1: Create city using parseCityService
      console.log('📝 Step 1: Creating city object...');
      const cityResponse = await fetch('https://gofastbackend.onrender.com/tripwell/parse-city', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ city })
      });

      const cityResult = await cityResponse.json();
      console.log('City Result:', cityResult);

      if (cityResult.status !== 'success') {
        throw new Error(`City creation failed: ${cityResult.message}`);
      }

      // Step 2: Generate meta attractions using metaCreatorRoute
      console.log('🎯 Step 2: Generating meta attractions...');
      const placeSlug = `${city.toLowerCase().replace(/\s+/g, '-')}-${season.toLowerCase()}`;
      
      const metaCreatorResponse = await fetch('https://gofastbackend.onrender.com/tripwell/meta-creator', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          placeSlug,
          city,
          season
        })
      });

      const metaCreatorResult = await metaCreatorResponse.json();
      console.log('Meta Creator Result:', metaCreatorResult);

      if (metaCreatorResult.status !== 'success') {
        throw new Error(`Meta creator failed: ${metaCreatorResult.message}`);
      }

      // Step 3: Parse and save meta attractions using metaParseAndSaveRoute
      console.log('💾 Step 3: Parsing and saving meta attractions...');
      const metaParseSaveResponse = await fetch('https://gofastbackend.onrender.com/tripwell/meta-parse-and-save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          placeSlug,
          city,
          season,
          rawResponse: metaCreatorResult.rawResponse
        })
      });

      const metaParseSaveResult = await metaParseSaveResponse.json();
      console.log('Meta Parse/Save Result:', metaParseSaveResult);

      if (metaParseSaveResult.status !== 'success') {
        throw new Error(`Meta parse/save failed: ${metaParseSaveResult.message}`);
      }

      // Success!
      setResults({
        city: cityResult,
        metaCreator: metaCreatorResult,
        metaParseSave: metaParseSaveResult
      });

      console.log('✅ SUCCESS! City to Meta flow complete!');

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
          City to Meta Test
        </h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Test Configuration</h2>
          
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
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Season
              </label>
              <select
                value={season}
                onChange={(e) => setSeason(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Spring">Spring</option>
                <option value="Summer">Summer</option>
                <option value="Fall">Fall</option>
                <option value="Winter">Winter</option>
              </select>
            </div>
            
            <button
              onClick={handleTest}
              disabled={loading || !city.trim()}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? 'Testing...' : 'Test City to Meta Flow'}
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
            <h3 className="text-red-800 font-medium">Error</h3>
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {results && (
          <div className="space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-md p-4">
              <h3 className="text-green-800 font-medium">✅ Success!</h3>
              <p className="text-green-700">City to Meta flow completed successfully</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">City Creation Result</h3>
              <pre className="bg-gray-100 p-4 rounded-md overflow-auto text-sm">
                {JSON.stringify(results.city, null, 2)}
              </pre>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Meta Creator Result</h3>
              <pre className="bg-gray-100 p-4 rounded-md overflow-auto text-sm">
                {JSON.stringify(results.metaCreator, null, 2)}
              </pre>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Meta Parse/Save Result</h3>
              <pre className="bg-gray-100 p-4 rounded-md overflow-auto text-sm">
                {JSON.stringify(results.metaParseSave, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CityToMetaTest;
