🏨 StayMantra – AI Powered Hotel Search & Price Comparison (MERN Stack)
📌 Overview
StayMantra is an AI-powered hotel search engine built with the MERN stack (MongoDB, Express.js, React.js, Node.js) that lets users find hotels, compare prices, and book deals directly from top travel platforms.

Users can search by:

📍 Destination (auto-suggested using OpenStreetMap API)

📅 Check-in & Check-out dates

👥 Number of guests

🛏 Number of rooms

For demo purposes, hotel details & prices are AI-generated and compared across multiple booking platforms like Booking.com, Agoda, and Expedia.
It works similar to Trivago, but without requiring paid APIs for this demo.

✨ Features
🔍 AI-powered hotel search (prompt-based data generation)

📍 Location auto-suggestions using OpenStreetMap API

💰 Price comparison from multiple booking platforms

📅 Date & guest filters for accurate results

🔗 Direct booking redirection to hotel sites

📧 OTP-based authentication via Nodemailer

🎨 Responsive UI with React + TailwindCSS

🛠 Tech Stack (MERN)
Frontend: React.js, TailwindCSS, React Router

Backend: Node.js, Express.js

Database: MongoDB

Authentication: Nodemailer (OTP)

Map/Location API: OpenStreetMap API

Image API: Unsplash API (Demo purposes)

AI Data: Prompt-based generation

Hosting: Vercel / Render / Your choice

⚠️ Note on Images
This is a demo project.

Real hotel images require the Google Places API, which is a paid service.

To keep it free, images are fetched from Unsplash API using the hotel’s destination as the search keyword.

This means images might be generic or repeated and may not match the actual hotel.

For production, replace with Google Places API for accurate visuals.

🚀 How It Works
User enters location, dates, guests, and rooms.

Backend AI generates hotels & booking deals from multiple platforms.

Frontend displays results with descriptions, ratings, prices, and booking links.

Clicking a booking link redirects to the respective platform.
