import React from 'react';
import Link from 'next/link';
import eventsData from '../data/events.json';

const IndexPage = () => {
    return (
        <div className="index-page">
            <h1>Welcome to the Theatre Booking System</h1>
            <p>Choose an event and book your seat today!</p>
            <div className="events-list">
                {eventsData.map((event) => (
                    <div key={event.id} className="event-card">
                        <h2>{event.title}</h2>
                        <p>{event.date}</p>
                        <p>{event.description}</p>
                        <Link href={`/events/${event.id}`}>
                            Book Tickets
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default IndexPage;
