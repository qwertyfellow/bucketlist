"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What is Roamfluencer about?",
    answer:
      "Roamfluencer is a platform where travel creators can design and share detailed travel itineraries (called bucketlists). Users can explore, rate, and follow their favorite creators, while creators can monetize their expertise."
  },
  {
    question: "How do content creators make money out of it?",
    answer:
      "Creators can publish free or premium itineraries. Premium itineraries can be viewed only by paid users, and Roamfluencer enables a revenue share model to support creators."
  },
  {
    question: "What should an ideal bucketlist itinerary include?",
    answer:
      "An ideal itinerary includes a mix of recommended hotels, travel logistics, food experiences, and activities. It should be practical, detailed, and easy for travelers to follow."
  },
  {
    question: "What is the isLive option?",
    answer:
      "The isLive option indicates whether an itinerary is published and visible to users. Draft itineraries remain hidden until marked as live."
  },
  {
    question: "What is the isPremium option?",
    answer:
      "The isPremium option indicates whether an itinerary is a paid (premium) product. Free itineraries are accessible to all, while premium ones require purchase or subscription."
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
            <span className="font-medium text-gray-800">{faq.question}</span>
            <ChevronDown
              className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                openIndex === index ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Accordion Content */}
          {openIndex === index && (
            <div className="px-4 pb-4 text-gray-600 leading-relaxed">
              {faq.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
