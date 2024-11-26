import React from 'react';
import { useRouter } from 'next/router';

const Confirmation = () => {
    const router = useRouter();
    const { name, email, phone, selectedSeats, eventTitle, eventDate, eventDescription } = router.query;

    const handleGoHome = () => {
        router.push('/'); // Manually navigate to the home page
    };

    return (
        <div className="confirmation">
            <h2>Booking Confirmation</h2>
            <div className="confirmation-wrap">
                <div className="details">
                    <p><strong>Event:</strong> {eventTitle || "Event not available"}</p>
                    <p><strong>Seats:</strong> {Array.isArray(selectedSeats) ? selectedSeats.join(', ') : selectedSeats}</p>
                    <p><strong>Name:</strong> {name}</p>
                    <p><strong>Email:</strong> {email}</p>
                    <p><strong>Phone:</strong> {phone}</p>
                    <p>Your seats are confirmed. Please proceed to payment at the entrance.</p>
                </div>
                <button onClick={handleGoHome}>Go to Home Page</button>
            </div>
        </div>
    );
};

export default Confirmation;
