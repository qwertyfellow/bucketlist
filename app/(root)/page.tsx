import styles from "./page.module.css";

export default function Home() {
  return (
    <div className="colored_container">
      <main>
        <h1 className="heading text-secondary">The Bucket List 🏖️ ✈️ 🚂</h1>
        <p className="text-30-semibold text-white mb-5">Curated iternaries by the world famous travel influencers.</p>
        <span>
          <button className="bg-secondary rounded px-3 py-2 mr-2 text-white">Explore iternaries</button>
          <button className="bg-secondary rounded px-3 py-2 mr-2 text-white">Sign up as creator</button>
        </span>
      </main>
    </div>
  );
}
