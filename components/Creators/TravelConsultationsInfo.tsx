'use client';

import { Users, Plane, Calendar, MapPin, MessageSquare } from "lucide-react";

const TravelConsultationsInfo = () => {
  return (
    <div className="space-y-8 p-6">
      <div>
        <p className="text-gray-600 mt-2">
          Offer personalized travel guidance and 1-on-1 consultations to your audience.
          Help travelers plan unforgettable trips, build trust, and turn your travel expertise into value.
        </p>
      </div>

      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <Users className="w-9 h-9 text-primary mt-1" />
          <div>
            <h2 className="text-lg font-semibold text-gray-800">What is a Travel Consultation?</h2>
            <p className="text-gray-600 mt-1">
              A travel consultation allows you to connect directly with users who seek your help to
              plan their next adventure — whether it’s crafting a detailed itinerary, suggesting
              local experiences, or managing their entire travel plan end-to-end.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <Plane className="w-6 h-6 text-primary mt-1" />
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Types of Consultations</h2>
            <ul className="list-disc list-inside text-gray-600 mt-1 space-y-1">
              <li><strong>Itinerary Planning:</strong> Suggest activities, stays, and travel routes.</li>
              <li><strong>Full Trip Management:</strong> Manage the end-to-end trip logistics for the traveler.</li>
              <li><strong>Destination Guidance:</strong> Help travelers decide where to go based on their preferences and budget.</li>
            </ul>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <Calendar className="w-6 h-6 text-primary mt-1" />
          <div>
            <h2 className="text-lg font-semibold text-gray-800">How It Works</h2>
            <ol className="list-decimal list-inside text-gray-600 mt-1 space-y-1">
              <li>Users browse your profile and send consultation requests.</li>
              <li>You’ll get notified with their trip details and preferences.</li>
              <li>Accept requests that fit your expertise and start consulting!</li>
            </ol>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <MessageSquare className="w-6 h-6 text-primary mt-1" />
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Why Offer Consultations?</h2>
            <ul className="list-disc list-inside text-gray-600 mt-1 space-y-1">
              <li>Monetize your travel expertise directly through the platform.</li>
              <li>Build deeper relationships with your followers.</li>
              <li>Help travelers experience destinations the way you do.</li>
            </ul>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <MapPin className="w-6 h-6 text-primary mt-1" />
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Where Can You Offer It?</h2>
            <p className="text-gray-600 mt-1">
              Consultations can be offered for any destination you’ve explored or specialize in — 
              from hidden mountain villages to luxury islands.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-10 text-gray-500 text-sm border-t pt-4">
        Once enabled, you’ll be able to manage all your consultation requests directly from your creator dashboard.
      </div>
    </div>
  );
};

export default TravelConsultationsInfo;
