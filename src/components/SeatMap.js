import React, { useState } from 'react';
import Seat from './Seat';

const SeatMap = ({ seats, onSeatSelect }) => {
    const [selectedSeats, setSelectedSeats] = useState([]);

    const handleSeatClick = (seatId) => {
        setSelectedSeats((prev) => {
            if (prev.includes(seatId)) {
                return prev.filter((id) => id !== seatId);
            } else {
                return [...prev, seatId];
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
