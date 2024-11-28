import fs from 'fs';
import path from 'path';

const bookingsFilePath = path.resolve('src/data/bookings.json');

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const bookingDetails = req.body;

            // Validate required fields
            const { name, email, phone, selectedSeats, totalCost, event } = bookingDetails;
            if (!name || !email || !phone || !selectedSeats || !totalCost || !event) {
                return res.status(400).json({ message: 'Missing required booking details.' });
            }

            // Parse selectedSeats if it's a JSON string
            let parsedSeats = selectedSeats;
            if (typeof selectedSeats === 'string') {
                try {
                    parsedSeats = JSON.parse(selectedSeats);
                } catch {
                    return res.status(400).json({ message: 'Invalid format for selectedSeats.' });
                }
            }

            // Load existing bookings
            const existingBookings = fs.existsSync(bookingsFilePath)
                ? JSON.parse(fs.readFileSync(bookingsFilePath, 'utf8'))
                : [];

            // Check if any selected seat is already booked
            const isSeatBooked = parsedSeats.some(seat =>
                existingBookings.some(booking =>
                    booking.selectedSeats.includes(seat)
                )
            );

            if (isSeatBooked) {
                return res.status(400).json({ message: 'One or more selected seats are already booked.' });
            }

            // Prepare new booking object
            const newBooking = {
                id: Date.now(),
                name,
                email,
                phone,
                selectedSeats: parsedSeats,
                totalCost,
                eventTitle: event.title,
                eventDate: event.date,
                eventDescription: event.description,
            };

            // Append new booking to existing bookings
            existingBookings.push(newBooking);

            // Save updated bookings back to the JSON file
            fs.writeFileSync(bookingsFilePath, JSON.stringify(existingBookings, null, 2));

            res.status(201).json({ message: 'Booking saved successfully', booking: newBooking });
        } catch (error) {
            console.error('Error saving booking:', error);
            res.status(500).json({ message: 'Internal server error.' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed.' });
    }
}
