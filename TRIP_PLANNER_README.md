# TripWell Trip Planner Service

A comprehensive Python service for intelligent trip planning with POI recognition and itinerary optimization.

## Features

### 🎯 POI Recognition
- **Text Analysis**: Extract Points of Interest from user text input
- **Google Places Integration**: Rich POI data with ratings, photos, and reviews
- **Smart Categorization**: Automatically categorize POIs (restaurants, attractions, hotels, etc.)
- **Location Context**: Use location context for better POI search results

### 🗺️ Itinerary Generation
- **Multi-day Planning**: Create optimized itineraries for any trip duration
- **Smart Scheduling**: Distribute POIs across days with realistic timing
- **Preference Filtering**: Filter POIs by budget, rating, and category preferences
- **Travel Optimization**: Consider travel time between locations

### 💾 Data Management
- **MongoDB Storage**: Persistent storage for itineraries and POI data
- **User Association**: Link itineraries to users and trips
- **Version Control**: Track itinerary updates and changes
- **Analytics**: Usage tracking and performance metrics

## Quick Start

### 1. Environment Setup

Copy the environment template and add your credentials:

```bash
cp env_template.txt .env
```

Required environment variables:
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/GoFastFamily
GOOGLE_PLACES_API_KEY=your_google_places_api_key_here
```

### 2. Database Setup

Initialize the MongoDB collections:

```bash
python setup_trip_planner_db.py
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Run the Service

```bash
python main.py
```

The service will be available at `http://localhost:5000`

## API Endpoints

### POI Extraction
```http
POST /trip-planner/extract-pois
Content-Type: application/json

{
  "text": "I want to visit the Eiffel Tower and Louvre Museum in Paris",
  "location": "Paris, France",
  "user_id": "user123"
}
```

### Itinerary Generation
```http
POST /trip-planner/generate-itinerary
Content-Type: application/json

{
  "user_id": "user123",
  "destination": "Paris, France",
  "start_date": "2024-06-01",
  "end_date": "2024-06-03",
  "pois": [
    {
      "name": "Eiffel Tower",
      "address": "Champ de Mars, 5 Avenue Anatole France, 75007 Paris, France",
      "latitude": 48.8584,
      "longitude": 2.2945,
      "category": "attraction",
      "rating": 4.6,
      "price_level": 2
    }
  ],
  "preferences": {
    "max_price_level": 3,
    "preferred_categories": ["attraction", "museum"],
    "min_rating": 4.0
  }
}
```

### Get User Itineraries
```http
GET /trip-planner/itineraries/{user_id}
```

### Get Specific Itinerary
```http
GET /trip-planner/itinerary/{itinerary_id}
```

### Update Itinerary
```http
PUT /trip-planner/itinerary/{itinerary_id}
Content-Type: application/json

{
  "updates": {
    "status": "confirmed",
    "notes": "Updated preferences"
  }
}
```

### Delete Itinerary
```http
DELETE /trip-planner/itinerary/{itinerary_id}
```

## Data Models

### POI (Point of Interest)
```python
{
  "name": "Eiffel Tower",
  "address": "Champ de Mars, 5 Avenue Anatole France, 75007 Paris, France",
  "latitude": 48.8584,
  "longitude": 2.2945,
  "category": "attraction",
  "rating": 4.6,
  "price_level": 2,
  "opening_hours": {...},
  "description": "Iconic iron tower in Paris",
  "place_id": "ChIJLU7jZClu5kcR4PcOOO6p3I0",
  "photos": [...],
  "reviews": [...]
}
```

### Itinerary
```python
{
  "itinerary_id": "itinerary_user123_1234567890",
  "user_id": "user123",
  "trip_id": "trip456",
  "destination": "Paris, France",
  "start_date": "2024-06-01",
  "end_date": "2024-06-03",
  "duration_days": 3,
  "days": [
    {
      "date": "2024-06-01",
      "day_number": 1,
      "activities": [
        {
          "poi": {...},
          "start_time": "09:00",
          "end_time": "11:00",
          "duration_minutes": 120,
          "travel_time_to_next": 30,
          "notes": "Visit Eiffel Tower"
        }
      ],
      "total_distance": 5.2,
      "estimated_duration": 480,
      "notes": "Day 1 in Paris, France"
    }
  ],
  "total_estimated_cost": 150.0,
  "preferences": {...},
  "created_at": "2024-01-15T10:30:00",
  "updated_at": "2024-01-15T10:30:00",
  "status": "draft",
  "tags": ["paris", "sightseeing"]
}
```

## Testing

Run the test suite to verify functionality:

```bash
python test_trip_planner.py
```

The test script will:
- Test POI extraction from sample text
- Generate a sample itinerary
- Test database operations
- Test API endpoints (if server is running)

## Integration with Existing Backend

The trip planner service is integrated with your existing FastAPI service:

1. **Main Service**: Trip planner endpoints are included in `main.py`
2. **Database**: Uses the same MongoDB instance (`GoFastFamily`)
3. **Authentication**: Can be extended to use your existing auth system
4. **User Management**: Links to your existing user system

## Configuration

### Google Places API Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Enable the Places API
3. Create credentials (API Key)
4. Add the key to your `.env` file

### MongoDB Collections

The service creates these collections:
- `itineraries`: Stores travel itineraries
- `pois`: Caches POI data
- `trip_planner_analytics`: Usage tracking

## Development

### Adding New POI Sources

Extend the `_search_google_places` method or add new methods for other APIs:

```python
def _search_foursquare(self, query: str, location: str = None) -> List[POI]:
    # Implement Foursquare API integration
    pass
```

### Customizing Itinerary Logic

Modify the `_distribute_pois_for_day` method to implement custom optimization algorithms:

```python
def _distribute_pois_for_day(self, pois: List[POI], day_num: int, total_days: int, preferences: Dict) -> List[POI]:
    # Implement custom POI distribution logic
    # Consider: distance optimization, time constraints, user preferences
    pass
```

### Adding New Categories

Update the `_categorize_place` method to handle new POI categories:

```python
def _categorize_place(self, types: List[str]) -> str:
    category_mapping = {
        'amusement_park': 'entertainment',
        'zoo': 'entertainment',
        'aquarium': 'entertainment',
        # Add new categories here
    }
    # ... rest of the method
```

## Performance Considerations

- **POI Caching**: POIs are cached in MongoDB to reduce API calls
- **Database Indexes**: Optimized indexes for fast queries
- **Rate Limiting**: Consider implementing rate limiting for external APIs
- **Async Operations**: Consider making external API calls async for better performance

## Security

- **API Key Protection**: Store API keys in environment variables
- **Input Validation**: All inputs are validated using Pydantic models
- **User Isolation**: Itineraries are isolated by user_id
- **Data Sanitization**: User inputs are sanitized before processing

## Monitoring

The service includes built-in analytics and logging:

- **Usage Tracking**: Track POI extractions and itinerary generations
- **Performance Metrics**: Monitor response times and success rates
- **Error Logging**: Comprehensive error logging for debugging
- **Health Checks**: Built-in health check endpoints

## Future Enhancements

- **Machine Learning**: Use ML for better POI recommendations
- **Real-time Updates**: Live itinerary updates based on conditions
- **Social Features**: Share and collaborate on itineraries
- **Mobile Integration**: Native mobile app integration
- **Advanced Optimization**: Route optimization algorithms
- **Weather Integration**: Weather-based itinerary adjustments
