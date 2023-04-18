import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css"

function Dashboard() {
  const URL = "https://parking-app-79h9.onrender.com";
  const [parkingSpots, setParkingSpots] = useState([]);
  // const [showBookingForm, setShowBookingForm] = useState(false);
  // const [selectedSpotId, setSelectedSpotId] = useState(null);

  const navigate = useNavigate();

  // fetch the parking spots data from the server
  useEffect(() => {
    async function fetchParkingSpots() {
      try {
        const res = await axios.get(`${URL}/api/parking-spots`);
        setParkingSpots(res.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchParkingSpots();
  }, []);

  const handleSpotClick = async (spotId) => {
    try {
      // check if the spot is available
      const res = await axios.get(
        `${URL}/api/parking-spots/${spotId}`
      );
      const { isAvailable } = res.data;
      if (!isAvailable) {
        alert("Sorry, this spot is already booked!");
        return;
      }

      // if the spot is available, show the booking form in a popup
    //   setShowBookingForm(true);
    //   setSelectedSpotId(spotId);
    navigate(`/book/${spotId}`)
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Parking Spot Booking Dashboard</h1>
      <div className="parking-spot-grid">
        {parkingSpots.map((spot) => (
          <div
            key={spot._id}
            className={`parking-spot-box ${
              spot.isAvailable ? "available" : "booked"
            }`}
            onClick={() => handleSpotClick(spot._id)}
          >
            {spot.isAvailable ? "Available" : "Booked"}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;

