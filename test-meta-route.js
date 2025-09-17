// Quick test of the meta attractions route
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

async function testMetaRoute() {
  try {
    console.log('🧪 Testing meta attractions route...');
    
    const response = await fetch('https://gofastbackend.onrender.com/tripwell/meta-attractions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        placeSlug: "BarcelonaTest123",
        city: "Barcelona",
        season: "Summer"
      }),
    });

    if (!response.ok) {
      throw new Error(`Meta route failed: ${response.status}`);
    }

    const result = await response.json();
    console.log('✅ Meta attractions result:');
    console.log(JSON.stringify(result, null, 2));
    
    if (result.metaAttractions && result.metaAttractions.length > 0) {
      console.log(`\n🎯 Found ${result.metaAttractions.length} meta attractions:`);
      result.metaAttractions.forEach((attraction, index) => {
        console.log(`${index + 1}. ${attraction.name} (${attraction.type}) - ${attraction.reason}`);
      });
    }
    
  } catch (error) {
    console.error('❌ Error testing meta route:', error);
  }
}

testMetaRoute();
