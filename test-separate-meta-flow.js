const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

async function testSeparateMetaFlow() {
  console.log("🚀 Testing Separate Meta Flow");
  console.log("================================");
  
  const baseUrl = "http://localhost:3001/tripwell";
  const testData = {
    placeSlug: "paris-france-summer",
    city: "Paris",
    season: "Summer"
  };
  
  try {
    // Step 1: Call Meta Creator Route
    console.log("\n📝 Step 1: Calling Meta Creator Route...");
    console.log("Data:", testData);
    
    const creatorResponse = await fetch(`${baseUrl}/meta-creator`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData)
    });
    
    const creatorResult = await creatorResponse.json();
    console.log("Creator Response:", JSON.stringify(creatorResult, null, 2));
    
    if (creatorResult.status !== "success") {
      throw new Error(`Meta creator failed: ${creatorResult.message}`);
    }
    
    // Step 2: Call Meta Parse/Save Route
    console.log("\n💾 Step 2: Calling Meta Parse/Save Route...");
    const parseSaveData = {
      ...testData,
      rawResponse: creatorResult.rawResponse
    };
    console.log("Parse/Save Data:", parseSaveData);
    
    const parseSaveResponse = await fetch(`${baseUrl}/meta-parse-and-save`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(parseSaveData)
    });
    
    const parseSaveResult = await parseSaveResponse.json();
    console.log("Parse/Save Response:", JSON.stringify(parseSaveResult, null, 2));
    
    if (parseSaveResult.status !== "success") {
      throw new Error(`Meta parse/save failed: ${parseSaveResult.message}`);
    }
    
    console.log("\n✅ SUCCESS! Separate Meta Flow Complete!");
    console.log("Meta Attractions ID:", parseSaveResult.metaAttractionsId);
    console.log("Number of attractions:", parseSaveResult.metaAttractions.length);
    
  } catch (error) {
    console.error("❌ Error:", error.message);
  }
}

testSeparateMetaFlow();
