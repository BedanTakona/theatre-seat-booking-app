import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import BookingForm from '../../components/BookingForm';
import SeatMap from '../../components/SeatMap';
import eventsData from '../../data/events.json';

const EventPage = () => {
    const router = useRouter();
    const { id } = router.query;

    const [event, setEvent] = useState(null);
    const [selectedSeats, setSelectedSeats] = useState([]);

    useEffect(() => {
        if (id) {
            const eventData = eventsData.find((e) => e.id === id);
            if (eventData) {
                setEvent(eventData);
            } else {
                console.error('Event not found');
            }
        }
    }, [id]);

    const handleSeatSelect = (seats) => {
        setSelectedSeats(seats);
    };

    const handleBookingSubmit = async (bookingDetails) => {
        // Map the selected seats to include price and other details
        const seatsWithPrice = selectedSeats.map((seatId) => {
            const seat = event.seats.find((s) => s.id === seatId);
            return seat ? { id: seat.id, number: seat.number, price: seat.price } : null;
        }).filter(seat => seat !== null);
    
        // Calculate total cost
        const totalCost = seatsWithPrice.reduce((total, seat) => total + seat.price, 0);
    
        // Create booking data to send to the API
        const bookingData = {
            ...bookingDetails,
            selectedSeats: seatsWithPrice,
            totalCost,
            eventTitle: event.title,
            eventDate: event.date,
            eventDescription: event.description,
        };
    
        try {
            // Send the booking data to the API
            const response = await fetch('/api/bookings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bookingData),
            });
    
            if (response.ok) {
                // Wait for the booking data response from the API
                const bookingResponse = await response.json();
                const { id: bookingId } = bookingResponse.booking;
    
                // Redirect to the confirmation page with all relevant booking data
                router.push(`/confirmation?bookingId=${bookingId}&name=${bookingDetails.name}&email=${bookingDetails.email}&phone=${bookingDetails.phone}&selectedSeats=${JSON.stringify(seatsWithPrice)}&eventTitle=${event.title}&eventDate=${event.date}&eventDescription=${event.description}&totalCost=${totalCost}`);
            } else {
                console.error('Error submitting booking:', await response.json());
            }
        } catch (error) {
            console.error('Error submitting booking:', error);
        }
    };
    
    if (!event) return <div>Loading...</div>;

    return (
        <div className="event-page">
            <h1>{event.title}</h1>
            <p>{event.date}</p>
            <p>{event.description}</p>
            <SeatMap seats={event.seats} onSeatSelect={handleSeatSelect} />
            <BookingForm
                event={event}
                selectedSeats={selectedSeats}
                onSubmit={handleBookingSubmit}
            />
        </div>
    );
};

export default EventPage;
