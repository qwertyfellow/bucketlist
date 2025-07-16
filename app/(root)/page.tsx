import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className="showcase_container bg-primary">
      <main>
        <h1 className="heading text-secondary">The Bucket List 🏖️ ✈️ 🚂</h1>
        <p className="text-30-semibold text-white mb-5">Curated iternaries by the world famous travel influencers.</p>
        <span>
          <Link className="bg-secondary rounded px-3 py-2 m-2 text-white" href={"/explore"}>Explore itenaries</Link>
          <Link className="button_primary" href={"/creators/join"}>Sign up as creator</Link>
        </span>
      </main>
    </div>
  );
}
