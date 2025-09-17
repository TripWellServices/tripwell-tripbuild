const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

async function testUserCreation() {
  console.log("🚀 Testing User Creation with Dummy Data");
  console.log("==========================================");
  
  const baseUrl = "https://gofastbackend.onrender.com/tripwell";
  
  try {
    // Step 1: Create a test user
    console.log("\n👤 Step 1: Creating test user...");
    
    const testUserData = {
      firebaseId: "test-user-123",
      email: "test@example.com",
      funnelStage: "full_app"
    };
    
    console.log("Test User Data:", testUserData);
    
    const userResponse = await fetch(`${baseUrl}/user/createOrFind`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testUserData)
    });
    
    const userResult = await userResponse.json();
    console.log("User Creation Result:", JSON.stringify(userResult, null, 2));
    
    if (userResult.error) {
      throw new Error(`User creation failed: ${userResult.error}`);
    }
    
    console.log("\n✅ User created/found successfully!");
    console.log("User ID:", userResult._id);
    console.log("Is New User:", userResult.isNewUser);
    
    // Step 2: Now test city parser with the user's trip data
    console.log("\n🏙️ Step 2: Testing city parser with trip data...");
    
    const tripData = {
      tripName: "Test Paris Trip",
      purpose: "Testing city parser",
      city: "Paris, France",
      startDate: "2024-06-01",
      endDate: "2024-06-05",
      partyCount: 2,
      whoWith: ["partner"],
      joinCode: "TEST123",
      demoMode: true
    };
    
    console.log("Trip Data:", tripData);
    
    // Try the parse-city route we created
    const cityResponse = await fetch(`${baseUrl}/parse-city`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ city: tripData.city })
    });
    
    const cityResult = await cityResponse.json();
    console.log("City Parser Result:", JSON.stringify(cityResult, null, 2));
    
    if (cityResult.status === 'success') {
      console.log("\n✅ City parsed and saved!");
      console.log("City ID:", cityResult.city.cityId);
      console.log("City Name:", cityResult.city.cityName);
      console.log("Database:", cityResult.database);
    } else {
      console.log("❌ City parser failed:", cityResult.message);
    }
    
    // Step 3: Check content library status
    console.log("\n📚 Step 3: Checking content library...");
    
    const contentResponse = await fetch(`${baseUrl}/content-library/status`);
    const contentResult = await contentResponse.json();
    console.log("Content Library Status:", JSON.stringify(contentResult, null, 2));
    
  } catch (error) {
    console.error("❌ Error:", error.message);
  }
}

testUserCreation();
