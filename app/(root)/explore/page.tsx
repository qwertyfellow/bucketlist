import React from "react";
import { client } from "@/sanity/lib/client";
import { FETCH_ALL_BUCKETLIST } from "@/sanity/queries/bucketlist";
import BucketListCard from "@/components/BucketList/BucketListCard";

const Page = async () => {
  const bucketListItems = await client.fetch(FETCH_ALL_BUCKETLIST);

  const renderView = (items: any[]) => {
    if (items.length === 0) {
      return <h2 className="text-center">No items found</h2>;
    }

    return items.map((item: any) => (
      <BucketListCard
        key={item._id}
        id={item._id}
        title={item.title}
        destination={item.destination}
        category={item.category}
        likes={item.likes}
        creatorName={item.creator.name}
        creatorImage={item?.creator?.image}
        coverImage={item?.coverImage}
        slug={item.slug?.current}
      />
    ));
  };

  return (
    <>
      <div className="showcase bg-primary">
          <main className="section_container">
              <h1 className="heading text-secondary">Explore all the great itineraries</h1>
              <p className="text-30-semibold text-white mb-4">Crafted with care and love by your favourite travel influencers.</p>
          </main>
      </div>
      <div className="section_container">
        <div className="card_grid">
          {renderView(bucketListItems)}
        </div>
      </div>
    </>
  );
};

export default Page;
