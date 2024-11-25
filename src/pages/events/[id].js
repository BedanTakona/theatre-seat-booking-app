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
            setEvent(eventData);
        }
    }, [id]);

    const handleSeatSelect = (seats) => {
        setSelectedSeats(seats);
    };

    const handleBookingSubmit = (bookingDetails) => {
        // Process booking and redirect to confirmation
        router.push({
            pathname: '/confirmation',
            query: { ...bookingDetails },
        });
    };

    if (!event) return <div>Loading...</div>;

    return (
        <div className="event-page">
            <h1>{event.title}</h1>
            <p>{event.date}</p>
            <p>{event.description}</p>
            <SeatMap seats={event.seats} onSeatSelect={handleSeatSelect} />
            <BookingForm
                selectedSeats={selectedSeats}
                event={event}
                onSubmit={handleBookingSubmit}
            />
        </div>
    );
};

export default EventPage;
