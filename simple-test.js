// Simple test to check if the meta attractions route is working
console.log('🧪 Testing meta attractions route...');

fetch('https://gofastbackend.onrender.com/tripwell/meta-attractions', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    placeSlug: "BarcelonaTest123",
    city: "Barcelona",
    season: "Summer"
  }),
})
.then(response => {
  console.log('📡 Response status:', response.status);
  console.log('📡 Response ok:', response.ok);
  return response.text();
})
.then(text => {
  console.log('📡 Response text:', text);
})
.catch(error => {
  console.error('❌ Error:', error);
});
