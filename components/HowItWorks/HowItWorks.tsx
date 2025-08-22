'use client';

import Image from 'next/image';
import steps from './sections';

export default function HowItWorks() {
  const renderSections = () => {
    return (
      <div className="space-y-16">
        {steps.map((step, index) => (
          <div key={step.id}>
            <div
              className={`flex flex-col md:flex-row items-center md:gap-12 ${
                index % 2 === 1 ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Step Image */}
              <div className="relative w-full md:w-auto flex justify-center">
                <div className="relative w-[250px] h-[250px] md:w-[300px] md:h-[300px] rounded-xl overflow-hidden">
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Step details */}
              <div className="w-full md:flex-1 mt-6 md:mt-0 text-center md:text-left">
                <h3 className="text-2xl font-semibold text-gray-800">
                  Step {step.id}: <span className='color_highlight'>{step.title}</span>
                </h3>
                <p className="mt-4 text-gray-600 text-lg">{step.description}</p>
                {step?.description2 && <p className="mt-4 color_highlight text-lg">{step?.description2}</p>}
              </div>
            </div>

            {/* Separator */}
            {index < steps.length - 1 && (
              <div className="block  my-10 border-t border-gray-300"></div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <section className="section_container">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="section_heading">
          <span className='color_highlight'>How</span> It Works
        </h2>
        <p className="mt-4 mb-12 text-center text-gray-600 max-w-2xl mx-auto">
          Share your journeys, inspire others, and earn by linking hotels, stays, and activities.
        </p>

        {/* Steps */}
        {renderSections()}
      </div>
    </section>
  );
}
