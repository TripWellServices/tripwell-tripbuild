import React, { useState } from 'react';

export default function BuildMetaLayer() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const testData = {
    placeSlug: "BarcelonaBudgetSolo",
    inputVariables: {
      city: "Barcelona",
      season: "Summer",
      whoWith: "Solo",
      budget: "Budget",
      priorities: ["Culture", "Food"],
      vibes: ["Adventure", "Local"],
      mobility: ["Love walking everywhere"],
      travelPace: "Relaxed"
    },
    // New persona system data
    personaData: {
      primaryPersona: "art",
      budget: "moderate", 
      whoWith: "solo"
    }
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

      // Step 1.5: Create trip persona
      console.log('📋 Step 1.5: Creating trip persona...');
      const personaResponse = await fetch('https://gofastbackend.onrender.com/tripwell/tripintent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tripId: "test-trip-123",
          userId: "test-user-123",
          ...testData.personaData
        }),
      });

      if (!personaResponse.ok) {
        throw new Error(`Persona creation failed: ${personaResponse.status}`);
      }

      const personaResult = await personaResponse.json();
      console.log('✅ Persona created:', personaResult);

      // Step 2: Generate meta attractions
      console.log('📋 Step 2: Generating meta attractions...');
      const metaResponse = await fetch('https://gofastbackend.onrender.com/tripwell/meta-attractions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          placeSlug: testData.placeSlug,
          city: testData.inputVariables.city,
          season: testData.inputVariables.season
        }),
      });

      if (!metaResponse.ok) {
        throw new Error(`Meta attractions failed: ${metaResponse.status}`);
      }

      const metaResult = await metaResponse.json();
      console.log('✅ Meta attractions generated:', metaResult);

      // Step 2.5: Generate sample attractions for persona learning
      console.log('📋 Step 2.5: Generating sample attractions...');
      const samplesResponse = await fetch('https://gofastbackend.onrender.com/tripwell/persona-samples', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tripId: "test-trip-123",
          userId: "test-user-123",
          city: testData.inputVariables.city,
          personas: personaResult.personas,
          budget: testData.personaData.budget,
          whoWith: testData.personaData.whoWith
        }),
      });

      if (!samplesResponse.ok) {
        throw new Error(`Sample attractions failed: ${samplesResponse.status}`);
      }

      const samplesResult = await samplesResponse.json();
      console.log('✅ Sample attractions generated:', samplesResult);

      // Step 3: Build personalized itinerary (using persona weights and meta attractions)
      console.log('📋 Step 3: Building personalized itinerary...');
      const buildResponse = await fetch('https://gofastbackend.onrender.com/tripwell/itinerary/build', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tripId: "test-trip-123",
          userId: "test-user-123",
          selectedMetas: [], // Would come from meta selection UI
          selectedSamples: [] // Would come from sample selection UI
        }),
      });

      if (!buildResponse.ok) {
        throw new Error(`Build list failed: ${buildResponse.status}`);
      }

      const buildResult = await buildResponse.json();
      console.log('✅ Personalized list built:', buildResult);

      setResults({
        profile: profileResult,
        persona: personaResult,
        meta: metaResult,
        samples: samplesResult,
        build: buildResult
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
          {loading ? 'Testing...' : 'Test Full Persona Flow (Profile → Persona → Meta → Samples → Itinerary)'}
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
              <h3 className="text-xl font-semibold text-gray-700 mb-4">Persona Creation Result</h3>
              <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
                {JSON.stringify(results.persona, null, 2)}
              </pre>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">Meta Attractions Result</h3>
              <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
                {JSON.stringify(results.meta, null, 2)}
              </pre>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">Sample Attractions Result</h3>
              <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
                {JSON.stringify(results.samples, null, 2)}
              </pre>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">Final Itinerary Result</h3>
              <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
                {JSON.stringify(results.build, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
