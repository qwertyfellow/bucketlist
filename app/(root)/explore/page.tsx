import React from "react";
import BucketListCard from "@/components/BucketListItem";
import { client } from "@/sanity/lib/client";
import { FETCH_ALL_BUCKETLIST } from "@/sanity/queries/bucketlist";

const Page = async () => {
  const bucketListItems = await client.fetch(FETCH_ALL_BUCKETLIST);

  return (
    <div className="section_container">
      <h1 className="text-30-bold mb-6">Explore famous itenaries:</h1>
      <div className="card_grid">
        {bucketListItems.map((item: any) => (
          <BucketListCard
            key={item._id}
            title={item.title}
            destination={item.destination}
            category={item.category}
            likes={item.likes}
            creatorName={item.creator.name}
            slug={item.slug?.current}
          />
        ))}
      </div>
    </div>
  );
};

export default Page;
