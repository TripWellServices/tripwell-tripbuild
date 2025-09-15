import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function GenerateTests() {
  const navigate = useNavigate();
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState(null);
  const [currentTest, setCurrentTest] = useState(0);
  const [totalTests] = useState(11);

  const testProfiles = [
    {
      name: "Paris Budget Backpacker",
      whoWith: "solo"
    },
    {
      name: "Paris Luxury Romantic", 
      whoWith: "spouse"
    },
    {
      name: "Paris Family Educational",
      whoWith: "spouse-kids"
    },
    {
      name: "Paris Adventure Seeker",
      whoWith: "friends"
    },
    {
      name: "Paris Foodie Explorer",
      whoWith: "friends"
    },
    {
      name: "Paris Parent-Child Cultural",
      whoWith: "son-daughter"
    },
    {
      name: "Paris Business Traveler",
      whoWith: "solo"
    },
    {
      name: "Paris Shopping Enthusiast",
      whoWith: "friends"
    },
    {
      name: "Paris Nightlife Explorer",
      whoWith: "friends"
    },
    {
      name: "Paris Wellness Retreat",
      whoWith: "spouse"
    },
    {
      name: "Paris Group Travel",
      whoWith: "other"
    }
  ];

  const runTests = async () => {
    setIsRunning(true);
    setResults(null);
    setCurrentTest(0);

    try {
      // Call the existing backend test route
      const response = await fetch('http://localhost:3000/tripwell/anchorgpttest', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setResults(data);
        setCurrentTest(totalTests);
      } else {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Test failed:', error);
      setResults({ error: error.message });
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-purple-300 to-pink-200 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full space-y-8">
        
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">
            🧪 Angela Test Suite
          </h1>
          <p className="text-white/90 text-lg drop-shadow-md">
            Generate and analyze Angela's behavior across 11 different user profiles
          </p>
        </div>

        {/* Test Profiles Preview */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Test Profiles</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {testProfiles.map((profile, index) => (
              <div 
                key={index}
                className={`p-2 rounded text-sm ${
                  currentTest > index 
                    ? 'bg-green-100 text-green-800' 
                    : currentTest === index && isRunning
                    ? 'bg-blue-100 text-blue-800 animate-pulse'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {index + 1}. {profile.name}
              </div>
            ))}
          </div>
        </div>

        {/* Control Panel */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 text-center">
          {!isRunning && !results && (
            <div className="space-y-4">
              <p className="text-gray-600">
                This will run 11 comprehensive tests with 10-second delays between OpenAI calls
              </p>
              <button 
                onClick={runTests}
                className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
              >
                🚀 Start Test Suite
              </button>
            </div>
          )}

          {isRunning && (
            <div className="space-y-4">
              <div className="text-lg font-semibold text-gray-800">
                Running Test {currentTest + 1} of {totalTests}
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-purple-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${((currentTest + 1) / totalTests) * 100}%` }}
                ></div>
              </div>
              <p className="text-gray-600">
                {testProfiles[currentTest]?.name}
              </p>
            </div>
          )}

          {results && (
            <div className="space-y-4">
              {results.error ? (
                <div className="text-red-600">
                  <h3 className="font-bold">❌ Test Failed</h3>
                  <p>{results.error}</p>
                </div>
              ) : (
                <div className="text-green-600">
                  <h3 className="font-bold">✅ Tests Completed!</h3>
                  <p>Generated {results.anchors?.length || 0} anchor suggestions</p>
                </div>
              )}
              <button 
                onClick={() => {
                  setResults(null);
                  setCurrentTest(0);
                }}
                className="bg-gray-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-700 transition"
              >
                Run Again
              </button>
            </div>
          )}
        </div>

        {/* Back Button */}
        <div className="text-center">
          <button 
            onClick={() => navigate('/')}
            className="bg-white/20 text-white px-6 py-2 rounded-lg font-semibold hover:bg-white/30 transition"
          >
            ← Back to Home
          </button>
        </div>

      </div>
    </div>
  );
}
