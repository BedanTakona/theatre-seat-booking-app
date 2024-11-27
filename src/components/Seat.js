import React from 'react';

const Seat = ({ seat, onClick, isSelected, isBooked }) => {
    return (
        <div
            className={`seat ${isSelected ? 'selected' : ''} ${isBooked ? 'booked' : ''}`}
            onClick={() => !isBooked && onClick(seat.id)} // Prevent booking of already booked seats
        >
            <span>{seat.number}</span>
            <span className="seat-price">${seat.price}</span> {/* Show price */}
        </div>
    );
};

export default Seat;
