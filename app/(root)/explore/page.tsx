import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { FETCH_ALL_BUCKETLIST } from "@/sanity/queries/bucketlist";
import BucketListCard from "@/components/BucketList/BucketListCard";

const Page = async () => {
  const bucketListItems = await client.fetch(FETCH_ALL_BUCKETLIST);

  const renderView = (items: any[]) => {
    if (items.length == 0) {
      return (
          <div className='flex flex-col justify-center items-center'>
            <Image
              src="/empty.png"
              alt="No content found"
              width={250}
              height={250}
            />
            <h3 className="text-20-semibold">No itineraries found.</h3>
            <h1 className="sub-heading text-secondary mb-2">Please change filters/search input.</h1>
          </div>
        )
    }

    return (
      <div className="card_grid">
        {
          items.map((item: any) => (
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
          ))
        }
      </div>
    )
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
        {renderView(bucketListItems)}
      </div>
    </>
  );
};

export default Page;
