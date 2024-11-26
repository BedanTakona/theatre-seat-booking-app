import React, { useState } from 'react';
import Seat from './Seat';

const SeatMap = ({ seats, onSeatSelect }) => {
    const [selectedSeats, setSelectedSeats] = useState([]);

    const handleSeatClick = (seatId) => {
        setSelectedSeats((prev) => {
            if (prev.includes(seatId)) {
                return prev.filter((id) => id !== seatId);
            } else if (prev.length < 3) { // Limit to 5 seats
                return [...prev, seatId];
            } else {
                alert('You can book a maximum of 3 seats.');
                return prev;
            }
        });
        onSeatSelect(selectedSeats);
    };
    

    return (
        <div className="seat-map">
            {seats.map((seat) => (
                <Seat
                    key={seat.id}
                    seat={seat}
                    onClick={handleSeatClick}
                    isSelected={selectedSeats.includes(seat.id)}
                />
            ))}
        </div>
    );
};

export default SeatMap;