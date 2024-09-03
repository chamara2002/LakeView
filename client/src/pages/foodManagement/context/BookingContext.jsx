import React, { createContext, useState, useEffect } from "react";

export const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [bookingDetails, setBookingDetails] = useState({
    type: "", // 'movie' or 'game'
    itemId: null, // ID of the movie or game
    price: 0, // Price of the movie or game
    seatNumbers: [], // Selected seat numbers
    total: 0, // Total price
  });

  // Function to set or update the booking item
  const setBookingItem = (type, itemId, price) => {
    setBookingDetails({
      type,
      itemId,
      price,
      seatNumbers: [],
      total: 0,
    });
  };

  // Function to add a single seat number
  const addSeatNumber = (seatNumber) => {
    setBookingDetails((prevDetails) => ({
      ...prevDetails,
      seatNumbers: [...prevDetails.seatNumbers, seatNumber],
    }));
  };

  // Function to add multiple seat numbers
  const addSeats = (seats) => {
    setBookingDetails((prevDetails) => ({
      ...prevDetails,
      seatNumbers: seats,
      total: prevDetails.price * seats.length, // Calculate total price
    }));
  };

  // Function to confirm seat selection
  const confirmSelection = () => {
    console.log("Selected Seats:", bookingDetails.seatNumbers);
    // Assuming price per seat is already set in bookingDetails.price
    addSeats(bookingDetails.seatNumbers);
    console.log("Booking Confirmed:", bookingDetails);
  };

  // Function to remove a seat number
  const removeSeatNumber = (seatNumber) => {
    setBookingDetails((prevDetails) => ({
      ...prevDetails,
      seatNumbers: prevDetails.seatNumbers.filter(
        (seat) => seat !== seatNumber
      ),
    }));
  };

  useEffect(() => {
    console.log("Booking Details Updated:", bookingDetails);
  }, [bookingDetails]);

  return (
    <BookingContext.Provider
      value={{
        bookingDetails,
        setBookingItem,
        addSeatNumber,
        addSeats,
        removeSeatNumber,
        confirmSelection,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};
