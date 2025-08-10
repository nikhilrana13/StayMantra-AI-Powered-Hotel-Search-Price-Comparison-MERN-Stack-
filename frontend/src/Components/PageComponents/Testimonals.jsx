
import React from "react";

const testimonials = [
  {
    name: "Aarav Mehta",
    role: "Travel Enthusiast",
    feedback:
      "StayMantra made my vacation planning so much easier! The booking process was smooth, and the recommendations were spot on.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Priya Sharma",
    role: "Business Traveler",
    feedback:
      "I travel often for work, and StayMantra has become my go-to platform. Reliable, quick, and always great deals!",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Rohan Kapoor",
    role: "Adventure Seeker",
    feedback:
      "The user-friendly design and top-notch support make StayMantra stand out. Highly recommend it to anyone looking for a great stay.",
    image: "https://randomuser.me/api/portraits/men/51.jpg",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-gradient-to-b  py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          What Our Customers Say
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          Hear from our happy travelers who have experienced StayMantra
        </p>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {testimonials.map((t, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300"
            >
              <div className="flex flex-col items-center">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-20 h-20 rounded-full border-4 border-indigo-500 shadow-md"
                />
                <h3 className="mt-4 text-xl font-semibold text-gray-900">
                  {t.name}
                </h3>
                <p className="text-sm text-gray-500">{t.role}</p>
                <p className="mt-4 text-gray-600 italic">“{t.feedback}”</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
