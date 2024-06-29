import React, { useState, useEffect } from "react";
import { LoadScript } from "@react-google-maps/api";

const App = () => {
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const destination = { lat: 12.935339, lng: 77.620963 }; // Example destination (Third Wave Coffee Roasters)

  useEffect(() => {
    const calculateDistance = (origin) => {
      const service = new window.google.maps.DistanceMatrixService();
      service.getDistanceMatrix(
        {
          origins: [origin],
          destinations: [destination],
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (response, status) => {
          if (status === "OK") {
            const result = response.rows[0].elements[0];
            setDistance(result.distance.text);
            setDuration(result.duration.text);
          } else {
            console.error("Error fetching distance matrix", status);
            setError("Error calculating distance");
          }
          setLoading(false);
        }
      );
    };

    const getCurrentLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const origin = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            calculateDistance(origin);
          },
          (error) => {
            console.error("Error getting user location", error);
            setError("Error getting user location");
            setLoading(false);
          }
        );
      } else {
        console.error("Geolocation not supported");
        setError("Geolocation not supported");
        setLoading(false);
      }
    };

    if (window.google) {
      getCurrentLocation();
    } else {
      const script = document.createElement("script");
      script.src =
        " https://maps.googleapis.com/maps/api/js?key=AIzaSyCSKWQxL9Ohla8ksCNm5Kba4IC03Si14CY";
      script.onload = () => {
        getCurrentLocation();
      };
      document.head.appendChild(script);
    }
  }, []);

  return (
    <LoadScript googleMapsApiKey="AIzaSyCSKWQxL9Ohla8ksCNm5Kba4IC03Si14CY">
      <div>
        {loading ? (
          <p>Calculating...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div>
            <p>Distance: {distance}</p>
            <p>Duration: {duration}</p>
          </div>
        )}
      </div>
    </LoadScript>
  );
};

export default App;
