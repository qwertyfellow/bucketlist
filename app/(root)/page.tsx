"use client"

import styles from "./page.module.css";
import HowItWorks from "@/components/HowItWorks/HowItWorks";
import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter()
  return (
    <>
      <div className="showcase bg-primary">

        {/* Main header section */}
        <main className="section_container text-center">
          <h1 className="heading text-secondary">Turn Your Journeys Into Earnings</h1>
          <p className="text-16-medium text-white">Share your travel stories, craft stunning itineraries, and earn from every hotel, restaurant, and flights you recommend.</p>
          <p className="text-16-medium text-white mb-5">You can also sign up for being a travel consultant, through which you can offer 1:1 consultancies for travel plans.</p>
          <span>
            {/* TODO: Fix the responsiveness of the link or change to buttons. */}
            <button className="button_primary" onClick={() => {
              router.push("/bucketlist/create")
            }}>Craft a travel story</button>
            <button className="button_primary_outline" onClick={() => {
              router.push("/creators/manage")
            }}>Manage Travel consultations</button>
          </span>
        </main>
      </div>

      <br />
      {/* How it works section */}
      <HowItWorks />

      {/* Footer */}
    </>
  );
}
