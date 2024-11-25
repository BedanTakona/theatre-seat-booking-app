import React, { useState } from 'react';

const BookingForm = ({ selectedSeats, event, onSubmit }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const bookingDetails = {
            name,
            email,
            phone,
            selectedSeats,
            event,
        };
        onSubmit(bookingDetails);
    };

    return (
        <div className="booking-form">
            <h2>Confirm Your Booking</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Full Name</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="phone">Phone Number</label>
                    <input
                        type="tel"
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Submit Booking</button>
            </form>
        </div>
    );
};

export default BookingForm;
