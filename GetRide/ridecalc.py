import requests

# Your Mapbox Access Token
MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoidGpyYWZmNSIsImEiOiJjbTRidjAyY2MwNGtvMmlwejh0eXFvam5kIn0.l3mAmoeo5hD3-cOk7KE13g'

# Mapbox Geocoding API URL
MAPBOX_GEOCODING_URL = 'https://api.mapbox.com/geocoding/v5/mapbox.places'

# Mapbox Directions API URL
MAPBOX_DIRECTIONS_URL = 'https://api.mapbox.com/directions/v5/mapbox/driving'


def get_coordinates(address):
    """
    Convert an address into longitude,latitude coordinates using the Mapbox Geocoding API.
    """
    try:
        # Full URL for the geocoding request
        url = f"{MAPBOX_GEOCODING_URL}/{address}.json"
        params = {
            'access_token': MAPBOX_ACCESS_TOKEN,
            'limit': 1  # Return the best match only
        }

        # Send the GET request
        response = requests.get(url, params=params)
        response.raise_for_status()
        data = response.json()

        # Extract coordinates (longitude,latitude)
        coordinates = data['features'][0]['geometry']['coordinates']
        return f"{coordinates[0]},{coordinates[1]}"  # Format as 'longitude,latitude'
    except Exception as e:
        print(f"Error in geocoding: {e}")
        return None


def get_travel_time(start_address, end_address):
    """
    Calculate travel time and distance between two addresses using the Mapbox Directions API.
    """
    # Convert addresses to coordinates
    start_coordinates = get_coordinates(start_address)
    end_coordinates = get_coordinates(end_address)

    if not start_coordinates or not end_coordinates:
        print("Failed to retrieve coordinates for one or both addresses.")
        return None

    try:
        # Full URL for the directions request
        url = f"{MAPBOX_DIRECTIONS_URL}/{start_coordinates};{end_coordinates}"
        params = {
            'alternatives': 'false',        # Don't return alternative routes
            'geometries': 'geojson',        # Return geometry in GeoJSON format
            'overview': 'false',            # Don't include the route geometry
            'access_token': MAPBOX_ACCESS_TOKEN  # Your Mapbox token
        }

        # Send the GET request
        response = requests.get(url, params=params)
        response.raise_for_status()
        data = response.json()

        # Extract travel time (duration) in seconds
        duration_seconds = data['routes'][0]['duration']
        duration_minutes = duration_seconds / 60  # Convert to minutes

        # Extract travel distance (distance) in meters
        distance_meters = data['routes'][0]['distance']
        distance_kilometers = distance_meters / 1000  # Convert to kilometers

        return {
            'duration_minutes': round(duration_minutes, 2),
            'distance_kilometers': round(distance_kilometers, 2)
        }

    except Exception as e:
        print(f"Error in directions: {e}")
        return None


# Input addresses
start_address = "8 Choate Ln, Ipswich, MA"
end_address = "7 Town Farm Rd, Ipswich, MA"
add_address = "Sylven Residential Area, Amherst, MA"
# Get travel time and distance
normal = get_travel_time(start_address, end_address)
add1 = get_travel_time(start_address, add_address)
add2 = get_travel_time(add_address, end_address)
if normal and add1 and add2:
    print(f"Travel Time: {normal['duration_minutes']} minutes")
    print(f"Added Time: {(add1['duration_minutes'] + add2['duration_minutes']) - normal['duration_minutes']} minutes")
