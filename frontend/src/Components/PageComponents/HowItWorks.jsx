import React from "react";
import { Search, Layers, CreditCard, CalendarCheck } from "lucide-react";


export default function HowItWorks({ onCTAClick }) {
  const steps = [
    {
      id: 1,
      title: "Search your destination",
      desc: "Type a city or landmark — we'll show matching places and available dates.",
      icon: <Search className="w-6 h-6" />,
      color: "bg-indigo-50 text-indigo-700",
    },
    {
      id: 2,
      title: "Compare prices",
      desc: "We scan 100+ booking sites and list the best deals side-by-side.",
      icon: <Layers className="w-6 h-6" />,
      color: "bg-emerald-50 text-emerald-700",
    },
    {
      id: 3,
      title: "Secure booking",
      desc: "Pick the price you like and we'll take you to the provider to complete booking.",
      icon: <CreditCard className="w-6 h-6" />,
      color: "bg-yellow-50 text-yellow-700",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl sm:text-4xl font-extrabold">How StayMantra works</h2>
        <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
          Find great hotel deals in three easy steps. Search, compare, and book — all in one place.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {steps.map((s) => (
          <article
            key={s.id}
            className="group relative rounded-2xl border hover:shadow-lg transition-shadow duration-200 bg-white p-6 flex flex-col gap-4"
            aria-labelledby={`how-step-${s.id}`}
          >
            <div className="flex items-center gap-4">
              <div className={`flex items-center justify-center w-12 h-12 rounded-lg ${s.color}`}>{s.icon}</div>
              <div>
                <h3 id={`how-step-${s.id}`} className="text-lg font-semibold">
                  {s.title}
                </h3>
                <p className="text-sm text-gray-500">{s.desc}</p>
              </div>
            </div>

            <div className="mt-auto">
              <button
                type="button"
                onClick={onCTAClick}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium bg-slate-50 border hover:bg-slate-100"
              >
                Try it now
              </button>
            </div>

            {/* subtle accent */}
            <span className="absolute -bottom-3 -right-3 opacity-5 text-8xl select-none">{s.id}</span>
          </article>
        ))}
      </div>

      <div className="mt-10 text-center">
        <p className="text-sm text-gray-600">Prefer human help? Call us or chat with support for custom requests.</p>
        <div className="mt-4">
          <button
            onClick={onCTAClick}
            className="inline-flex items-center gap-2 bg-green-700 text-white px-5 py-3 rounded-md font-semibold hover:bg-green-800 transition"
          >
            Start Searching
          </button>
        </div>
      </div>
    </section>
  );
}
