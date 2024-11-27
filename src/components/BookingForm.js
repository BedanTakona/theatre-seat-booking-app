import React, { useState } from 'react';
import { useRouter } from 'next/router';

const BookingForm = ({ selectedSeats, event, onSubmit }) => {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const bookingDetails = {
            name,
            email,
            phone,
            selectedSeats,
            event,
        };

        setIsSubmitting(true);
        try {
            await onSubmit(bookingDetails); // Passes data to parent function to save
            setSuccessMessage('Booking successful! Click below to go to the home page.');
        } catch (error) {
            setErrorMessage('Booking failed. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="booking-form">
            <h2>Confirm Your Booking</h2>
            {successMessage ? (
                <p className="success-message">{successMessage}</p>
            ) : (
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
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting...' : 'Submit Booking'}
                    </button>
                </form>
            )}
        </div>
    );
};

export default BookingForm;
