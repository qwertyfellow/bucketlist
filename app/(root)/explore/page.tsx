import React from "react";
import BucketListCard from "@/components/BucketListCard";
import { client } from "@/sanity/lib/client";
import { FETCH_ALL_BUCKETLIST } from "@/sanity/queries/bucketlist";

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
        slug={item.slug?.current}
      />
    ));
  };

  return (
    <div className="section_container">
      <h1 className="text-30-bold mb-6">Explore famous itenaries:</h1>
      <div className="card_grid">
        {renderView(bucketListItems)}
      </div>
    </div>
  );
};

export default Page;
