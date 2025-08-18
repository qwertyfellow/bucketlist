import Link from "next/link";
import styles from "./page.module.css";
import TopCreators from "@/components/Creators/TopCreators";
import NewCreators from "@/components/Creators/NewCreators";

export default function Home() {
  return (
    <>
      <div className="showcase bg-primary">

        {/* Main header section */}
        <main className="section_container text-center">
          <h1 className="heading text-secondary">Turn Your Journeys Into Earnings</h1>
          <p className="text-16-medium text-white mb-5">Share your travel stories, craft stunning itineraries, and earn from every hotel, restaurant, and flights you recommend.</p>
          <span>
            {/* TODO: Fix the responsiveness of the link or change to buttons. */}
            <Link className="button_primary" href={"/bucketlist/create"}>Craft a travel story</Link>
          </span>
        </main>
      </div>

      <br />
      {/* Top content creators section */}
      <section className="section_container">
        <TopCreators />
      </section>

      {/* New content creators section */}
      <section className="section_container">
        <NewCreators />
      </section>

      {/* New content creators section */}

      {/* How it works section */}

      {/* Footer */}
    </>
  );
}
