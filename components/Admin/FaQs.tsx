"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What is Roamfluencer about ?",
    answer: "Roamfluencer is a platform where travel influencers can design and share detailed travel itineraries.",
    line1: "Travel enthusiasists(users) can explore, rate, and follow their favorite travel creators. Users can also view the itineraries created by travel influencers to plan their travel needs."
  },
  {
    question: "How do Travel content creators make money on Roamfluencer?",
    answer:
      "Creators can earn in two primary ways:",
      line1: "1. Engagement-based rewards – Roamfluencer pays creators based on the views, likes, and overall engagement their itineraries receive. The more travelers interact with your itineraries, the higher your potential earnings.",
      line2: "2. Affiliate opportunities – Creators can add their own affiliate links (e.g., hotels, flights, activities) within their itineraries. Any bookings or purchases made through those links generate direct income for the creator.",
      additionalText:"This means the platform both rewards organic engagement and enables creators to earn directly from partnerships and affiliates they already work with."
  },
  {
    question: "What does 'engagement' mean on my itineraries?",
    answer:
      "Engagement refers to how travelers interact with your itineraries.",
      line1: "It includes metrics like **number of views**, **likes**, and overall user activity on your content. These engagement metrics directly contribute to how much you earn from Roamfluencer’s engagement-based rewards."
  },
  {
    question: "What should an ideal bucketlist itinerary include?",
    answer:
      "An ideal itinerary includes a mix of recommended hotels, travel logistics, food experiences, and activities. It should be practical, detailed, and easy for travelers to follow. Adding affiliate links (e.g., hotel bookings, flight deals, tours) can also enhance monetization potential."
  },
  {
    question: "What is the isLive option?",
    answer:
      "The isLive option indicates whether an itinerary is published and visible to users. Draft itineraries remain hidden until marked as live."
  },
  {
    question: "What is the isPremium option?",
    answer:
      "The isPremium option indicates whether an itinerary is a paid (premium) product. Free itineraries are accessible to all, while premium ones require purchase or subscription. Creators can use this to offer exclusive, high-value content to paying users."
  }
];


export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="border border-gray-200 rounded-xl shadow-sm"
        >
          {/* Accordion Header */}
          <button
            onClick={() => toggleAccordion(index)}
            className="w-full flex justify-between items-center px-4 py-3 text-left"
          >
            <span className="font-semibold text-gray-800">{faq.question}</span>
            <ChevronDown
              className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                openIndex === index ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Accordion Content */}
          {openIndex === index && (
            <div className="px-4 pb-4 text-gray-600 leading-relaxed">
              <p className="text-gray-600 leading-relaxed mb-3">{faq.answer}</p>
              <p className="text-gray-600 leading-relaxed mb-3">{faq.line1}</p>
              <p className="text-gray-600 leading-relaxed mb-3">{faq.line2}</p>
              <p className="text-gray-600 leading-relaxed mb-3">{faq.additionalText}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
