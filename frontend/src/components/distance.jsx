import React, { useState, useEffect } from "react";
import { LoadScript } from "@react-google-maps/api";

const Distance = ({ destination }) => {
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
            if (response.rows && response.rows.length > 0) {
              const element = response.rows[0].elements[0];
              if (element.status === "OK") {
                setDistance(element.distance.text);
                setDuration(element.duration.text);
              } else if (element.status === "ZERO_RESULTS") {
                setError("No route found");
              } else {
                setError(`Error with element: ${element.status}`);
              }
            } else {
              console.error("No rows in response:", response);
              setError("Error calculating distance");
            }
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
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCSKWQxL9Ohla8ksCNm5Kba4IC03Si14CY&libraries=places`;
      script.onload = () => {
        getCurrentLocation();
      };
      document.head.appendChild(script);
    }
  }, [destination]);

  return (
    <LoadScript googleMapsApiKey="AIzaSyCSKWQxL9Ohla8ksCNm5Kba4IC03Si14CY">
      <div>
        <h1>Distance and Time Calculator</h1>
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

export default Distance;
