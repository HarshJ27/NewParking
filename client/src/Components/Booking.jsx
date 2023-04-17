import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import CarPark from "../CarPark.png";

const AuthContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-direction: column;
  margin-top: 2rem;
`;

const LeftSec = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1.7rem;
  img {
    width: 50px;
    height: 50px;
  }
  h2 {
    color: white;
    span {
      color: #ffab10;
    }
  }
`;

const MainForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #d1d1d1;
  padding-top: 1rem;
  padding-bottom: 2rem;
  padding-left: 2rem;
  padding-right: 2rem;
  border-radius: 20px;
  box-shadow: #8a8a8a;
  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    input {
      border: none;
      border-radius: 20px;
      background-color: #f5f5f5;
      padding-top: 10px;
      padding-bottom: 10px;
      color: black;
      width: 15rem;
      padding-top: 0.8rem;
      padding-bottom: 0.8rem;
      padding-left: 0.9rem;
    }
    button {
      border: none;
      padding-top: 1rem;
      padding-bottom: 1rem;
      padding-left: 2rem;
      padding-right: 2rem;
      border-radius: 15px;
      font-size: 1.2rem;
      font-weight: 600;
      background-color: #faa404;
      color: white;
      margin-top: 1.2rem;
      :hover {
        background-color: #db8f00;
      }
    }
  }
  p {
    font-weight: 600;
  }
`;

function BookingForm() {
  const navigate = useNavigate();
  const spotId = useParams(); // get the spotId from the URL params
  console.log(spotId.id)
  const finalId = spotId.id;
  const [formData, setFormData] = useState({
    bookingDate: "",
    bookingTime: "",
    duration: "",
    carName: "",
    carNumber: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `http://localhost:8001/api/bookings/${finalId}`,
        formData
      );
      // navigate to the dashboard page after successful booking
      navigate("/parking-spots");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AuthContainer>
      <LeftSec>
        <h2>
          Welcome to Parkin-<span>Go</span>
        </h2>
        <img src={CarPark} alt="" />
      </LeftSec>
      <MainForm>
        <h2>Book Parking Spot</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="booking-date">Booking Date:</label>
          <input
            type="date"
            id="booking-date"
            name="bookingDate"
            value={formData.bookingDate}
            onChange={handleChange}
            placeholder="Booking Date"
            required
          />

          <label htmlFor="booking-time">Booking Time:</label>
          <input
            type="time"
            id="booking-time"
            name="bookingTime"
            value={formData.bookingTime}
            onChange={handleChange}
            placeholder="Booking Time"
            required
          />

          {/* <label htmlFor="duration">Duration (hours):</label> */}
          <input
            type="number"
            name="duration"
            id="duration"
            value={formData.duration}
            onChange={handleChange}
            placeholder="Duration of Parking(in hours)"
            required
          />

          {/* <label htmlFor="car-name">Car Name:</label> */}
          <input
            type="text"
            id="car-name"
            name="carName"
            value={formData.carName}
            onChange={handleChange}
            placeholder="Car Name"
            required
          />

          {/* <label htmlFor="car-number">Car Number:</label> */}
          <input
            type="text"
            id="car-number"
            name="carNumber"
            value={formData.carNumber}
            onChange={handleChange}
            placeholder="Car Number"
            required
          />

          <button type="submit">Book Now</button>
        </form>
      </MainForm>
    </AuthContainer>
  );
}

export default BookingForm;
