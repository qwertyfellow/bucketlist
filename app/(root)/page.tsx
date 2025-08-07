import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className="showcase bg-primary">
      <main className="section_container">
        <h1 className="heading text-secondary">The Bucket List 🏖️ ✈️ 🚂</h1>
        <p className="text-30-semibold text-white mb-5">Curated iternaries by the world famous travel influencers.</p>
        <span>
          {/* TODO: Fix the responsiveness of the link or change to buttons. */}
          <Link className="button_primary" href={"/bucketlist/create"}>Create an itinerary</Link>
        </span>
      </main>
    </div>
  );
}
