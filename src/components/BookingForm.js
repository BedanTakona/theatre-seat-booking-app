import React, { useState } from 'react';
import { useRouter } from 'next/router';

const BookingForm = ({ selectedSeats, event }) => {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
    
        const bookingDetails = {
            id: Date.now().toString(),
            name,
            email,
            phone,
            selectedSeats,
            event,
        };
    
        setIsSubmitting(true);
    
        try {
            // Retrieve existing bookings or initialize an empty array
            const existingBookings = JSON.parse(localStorage.getItem('bookings')) || [];
            // Add the new booking to the existing ones
            const updatedBookings = [...existingBookings, bookingDetails];
            // Save the updated bookings to local storage
            localStorage.setItem('bookings', JSON.stringify(updatedBookings));
    
            setSuccessMessage('Booking successful! Redirecting to confirmation...');
            router.push('/confirmation'); // Redirect to the confirmation page
        } catch (error) {
            console.error('Error saving booking:', error);
            alert('Booking failed. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };
    

    return (
        <div className="booking-form">
            <h2>Confirm Your Booking</h2>
            {successMessage ? (
                <div>
                    <p className="success-message">{successMessage}</p>
                    <button onClick={() => router.push('/')}>Go to Home Page</button>
                </div>
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
                    <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting...' : 'Submit Booking'}
                    </button>
                </form>
            )}
        </div>
    );
};

export default BookingForm;
