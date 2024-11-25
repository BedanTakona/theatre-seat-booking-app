import React from 'react';

const Seat = ({ seat, onClick, isSelected }) => {
    return (
        <div
            className={`seat ${isSelected ? 'selected' : ''}`}
            onClick={() => onClick(seat.id)}
        >
            {seat.number}
        </div>
    );
};

export default Seat;
