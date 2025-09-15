import React, { useState } from 'react';

export default function BuildMetaLayer() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const testData = {
    placeSlug: "ParisBudgetSolo",
    city: "Paris",
    season: "Spring",
    whoWith: "Solo",
    budget: "Budget",
    priorities: ["Culture", "Food"],
    vibes: ["Adventure", "Local"],
    mobility: ["Love walking everywhere"],
    travelPace: "Relaxed"
  };

  const handleTest = async () => {
    setLoading(true);
    setError(null);
    setResults(null);

    try {
      console.log('🚀 Testing modular flow...');

      // Step 1: Save place profile
      console.log('📋 Step 1: Saving place profile...');
      const profileResponse = await fetch('https://gofastbackend.onrender.com/tripwell/place-profile-save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testData),
      });

      if (!profileResponse.ok) {
        throw new Error(`Profile save failed: ${profileResponse.status}`);
      }

      const profileResult = await profileResponse.json();
      console.log('✅ Profile saved:', profileResult);

      // Step 2: Generate meta attractions
      console.log('📋 Step 2: Generating meta attractions...');
      const metaResponse = await fetch('https://gofastbackend.onrender.com/tripwell/meta-attractions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          placeSlug: testData.placeSlug,
          city: testData.city,
          season: testData.season
        }),
      });

      if (!metaResponse.ok) {
        throw new Error(`Meta attractions failed: ${metaResponse.status}`);
      }

      const metaResult = await metaResponse.json();
      console.log('✅ Meta attractions generated:', metaResult);

      setResults({
        profile: profileResult,
        meta: metaResult
      });

    } catch (error) {
      console.error('❌ Error in modular flow:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          🧪 Build Meta Layer Test
        </h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Test Data</h2>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
            {JSON.stringify(testData, null, 2)}
          </pre>
        </div>

        <button
          onClick={handleTest}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-lg transition-colors"
        >
          {loading ? 'Testing...' : 'Test Profile Save + Meta Attractions'}
        </button>

        {error && (
          <div className="mt-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <strong>Error:</strong> {error}
          </div>
        )}

        {results && (
          <div className="mt-6 space-y-6">
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
              <strong>Success!</strong> Both routes completed successfully.
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">Profile Save Result</h3>
              <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
                {JSON.stringify(results.profile, null, 2)}
              </pre>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">Meta Attractions Result</h3>
              <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
                {JSON.stringify(results.meta, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
