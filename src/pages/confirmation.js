import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const Confirmation = () => {
    const router = useRouter();
    const { name, email, phone, selectedSeats, eventTitle, eventDate, eventDescription } = router.query;

    const [seats, setSeats] = useState([]);
    const [totalCost, setTotalCost] = useState(0); // State for total cost

    // Handle the selectedSeats data and parse it
    useEffect(() => {
        if (selectedSeats) {
            try {
                const parsedSeats = JSON.parse(selectedSeats); // Parse the JSON string back into an array of seat objects
                setSeats(parsedSeats);

                // Calculate total cost
                const cost = parsedSeats.reduce((total, seat) => total + seat.price, 0);
                setTotalCost(cost);
            } catch (error) {
                console.error("Error parsing selected seats:", error);
            }
        }
    }, [selectedSeats]);

    const handleGoHome = () => {
        router.push('/'); // Manually navigate to the home page
    };

    // Function to format the seat details with prices
    function getSeatDetails(seats) {
        if (!seats || seats.length === 0) {
            return <p>No seats selected.</p>;
        }

        return seats.map((seat) => (
            <p key={seat.id}>
                <strong>Seat {seat.number}:</strong> ${seat.price}
            </p>
        ));
    }

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
                        {getSeatDetails(seats)} {/* Display seats with prices */}
                    </div>
                    <p><strong>Total Cost:</strong> ${totalCost}</p> {/* Display total cost */}
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
