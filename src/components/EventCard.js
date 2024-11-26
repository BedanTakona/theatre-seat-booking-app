import React from 'react';
import Link from 'next/link';

const EventCard = ({ event }) => {
    return (
        <div className="event-card">
            <img 
            className="event-image"
                src={event.image} 
                alt={`Image for ${event.title}`} 
                
            />
            <h3>{event.title}</h3>
            <p>{event.date}</p>
            <p>{event.description}</p>
            <Link href={`/events/${event.id}`}>
                Book Seats
            </Link>
        </div>
    );
};

export default EventCard;
