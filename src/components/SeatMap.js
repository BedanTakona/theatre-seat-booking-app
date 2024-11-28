import React, { useState, useEffect } from 'react';
import Seat from './Seat';

const SeatMap = ({ seats, onSeatSelect }) => {
    const [bookedSeats, setBookedSeats] = useState([]);
    const [selectedSeats, setSelectedSeats] = useState([]);

    useEffect(() => {
        const storedBookings = JSON.parse(localStorage.getItem('bookings')) || [];
        const bookedSeatIds = storedBookings.flatMap((booking) => booking.selectedSeats || []);
        setBookedSeats(bookedSeatIds);
    }, []);

    const handleSeatClick = (seatId) => {
        if (bookedSeats.includes(seatId)) {
            alert('This seat is already booked.');
            return;
        }

        setSelectedSeats((prev) => {
            if (prev.includes(seatId)) {
                return prev.filter((id) => id !== seatId); // Deselect seat
            } else if (prev.length < 5) { // Limit to 5 seats
                return [...prev, seatId];
            } else {
                alert('You can book a maximum of 5 seats.');
                return prev;
            }
        });
    };

    // Save selected seats when booking
    useEffect(() => {
        onSeatSelect(selectedSeats);
    }, [selectedSeats, onSeatSelect]);

    const calculateTotalPrice = () => {
        return selectedSeats.reduce((total, seatId) => {
            const seat = seats.find((s) => s.id === seatId);
            return seat ? total + seat.price : total;
        }, 0);
    };

    return (
        <div className="seat-map">
            {seats.map((seat) => (
                <Seat
                    key={seat.id}
                    seat={seat}
                    onClick={() => handleSeatClick(seat.id)}
                    isSelected={selectedSeats.includes(seat.id)}
                    isBooked={bookedSeats.includes(seat.id)} // Highlight booked seats
                />
            ))}
            <div className="total-price">
                Total: ${calculateTotalPrice()}
            </div>
        </div>
    );
};

export default SeatMap;
