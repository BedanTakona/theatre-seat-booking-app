import React from 'react';

const Seat = ({ seat, onClick, isSelected, isBooked }) => {
    return (
        <div
            className={`seat ${isSelected ? 'selected' : ''} ${isBooked ? 'booked' : ''}`}
            onClick={() => !isBooked && onClick(seat.id)} // Prevent booking of already booked seats
        >
            {seat.number}
        </div>
    );
};

export default Seat;
