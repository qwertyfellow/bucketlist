import Link from "next/link";
import styles from "./page.module.css";
import TopCreators from "@/components/Creators/TopCreators";
import NewCreators from "@/components/Creators/NewCreators";
import HowItWorks from "@/components/HowItWorks/HowItWorks";

export default function Home() {
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
            <Link className="button_primary" href={"/bucketlist/create"}>Craft a travel story</Link>
            <Link className="button_primary" href={"/bucketlist/create"}>Manage Travel consultations</Link>
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
