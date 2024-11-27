import React from 'react';
import { useRouter } from 'next/router';

const Confirmation = () => {
    const router = useRouter();
    const { name, email, phone, selectedSeats, eventTitle, eventDate, eventDescription } = router.query;

    const handleGoHome = () => {
        router.push('/'); // Manually navigate to the home page
    };

    // Function to format the seat details with prices
    const getSeatDetails = (seats) => {
        return seats.map(seat => (
            <p key={seat.id}>
                <strong>Seat {seat.number}:</strong> ${seat.price}
            </p>
        ));
    };

    return (
        <div className="confirmation">
            <h2>Booking Confirmation</h2>
            <div className="confirmation-wrap">
                <div className="details">
                    <p><strong>Event:</strong> {eventTitle || "Event not available"}</p>
                    <p><strong>Date:</strong> {eventDate || "Date not available"}</p>
                    <p><strong>Description:</strong> {eventDescription || "Description not available"}</p>
                    <div>
                        <strong>Seats:</strong>
                        {getSeatDetails(selectedSeats)} {/* Display seats with prices */}
                    </div>
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
