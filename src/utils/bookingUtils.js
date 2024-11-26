// bookingUtils.js

// Function to check if a seat is available
export const isSeatAvailable = (seatId, bookedSeats) => {
  return !bookedSeats.includes(seatId);
};

// Function to book a seat
export const bookSeat = (seatId, bookedSeats) => {
  if (!bookedSeats.includes(seatId)) {
    bookedSeats.push(seatId);
    return true;  // Seat successfully booked
  }
  return false;  // Seat is already booked
};

// Function to cancel a booking (un-book a seat)
export const cancelBooking = (seatId, bookedSeats) => {
  const index = bookedSeats.indexOf(seatId);
  if (index !== -1) {
    bookedSeats.splice(index, 1);
    return true;  // Booking successfully canceled
  }
  return false;  // Seat was not booked
};

// Function to get the total number of booked seats
export const getBookedSeatsCount = (bookedSeats) => {
  return bookedSeats.length;
};

// Function to get the available seats from all seats
export const getAvailableSeats = (seats, bookedSeats) => {
  return seats.filter(seat => !bookedSeats.includes(seat.id));
};

// Function to get the booked seats from all seats
export const getBookedSeats = (seats, bookedSeats) => {
  return seats.filter(seat => bookedSeats.includes(seat.id));
};

// Function to validate booking information (like user name, email, etc.)
export const validateBookingInfo = (bookingInfo) => {
  const { name, email, seatId } = bookingInfo;

  if (!name || !email || !seatId) {
    return { valid: false, message: 'All fields are required.' };
  }

  // Basic email validation regex
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    return { valid: false, message: 'Invalid email format.' };
  }

  return { valid: true, message: '' };
};
