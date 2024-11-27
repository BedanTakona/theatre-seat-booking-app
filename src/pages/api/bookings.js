import fs from 'fs';
import path from 'path';

const bookingsFilePath = path.resolve('src/data/bookings.json');

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const bookingDetails = req.body;

            // Read the existing bookings data from the JSON file
            const data = fs.existsSync(bookingsFilePath)
                ? JSON.parse(fs.readFileSync(bookingsFilePath, 'utf8'))
                : [];

            // Check if any selected seat is already booked
            const isSeatBooked = bookingDetails.selectedSeats.some(seat =>
                data.some(booking => booking.selectedSeats.includes(seat))
            );

            if (isSeatBooked) {
                return res.status(400).json({ message: 'One or more selected seats are already booked.' });
            }

            // Add the new booking to the data
            data.push({
                ...bookingDetails,
                eventTitle: bookingDetails.event.title,
                eventDate: bookingDetails.event.date,
                eventDescription: bookingDetails.event.description,
            });

            // Write the updated data back to the JSON file
            fs.writeFileSync(bookingsFilePath, JSON.stringify(data, null, 2));

            res.status(200).json({ message: 'Booking saved successfully' });
        } catch (error) {
            console.error('Error saving booking:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
