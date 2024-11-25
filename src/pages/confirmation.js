import React from 'react';
import { useRouter } from 'next/router';

const Confirmation = () => {
    const router = useRouter();
    const { name, email, phone, selectedSeats, event } = router.query;

    return (
        <div className="confirmation">
            <h2>Booking Confirmation</h2>
            <p>Event: {event}</p>
            <p>Seats: {selectedSeats}</p>
            <p>Name: {name}</p>
            <p>Email: {email}</p>
            <p>Phone: {phone}</p>
            <p>Your seats are confirmed. Please proceed to payment at the entrance.</p>
        </div>
    );
};

export default Confirmation;
