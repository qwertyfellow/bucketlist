import Image from 'next/image';
import { notFound } from 'next/navigation';
import { auth } from '@/auth';
import { client } from '@/sanity/lib/client';

import { PageParams, SearchParams } from '@/constants/pages'
import NotLoggedIn from '@/components/Auth/NotLoggedIn';
import NotACreatorProfile from '@/components/Auth/NotACreatorProfile';
import NotAuthorised from '@/components/Auth/NotAuthorised';
import BucketListCard from '@/components/BucketList/BucketListCard';

import { FETCH_CREATOR_BY_SANITY_ID_QUERY } from '@/sanity/queries/creator';
import { FETCH_BUCKETLISTS_BY_CREATOR_ID } from '@/sanity/queries/bucketlist';
import BucketlistFilters from '@/components/BucketList/BucketListFilters';
import { Edit } from 'lucide-react';
import Link from 'next/link';

const Page = async ({
  params,
  searchParams,
}: {
  params: Promise<PageParams>;
  searchParams: Promise<SearchParams>;
}) => {

  // Variables
  const id = (await params).id;
  const session = await auth();

  // Filters
  const isLive = (await searchParams)?.isLive;
  const isPremium = (await searchParams)?.isPremium;

  const [creator, bucketListItems] = await Promise.all([
    client.fetch(FETCH_CREATOR_BY_SANITY_ID_QUERY, { id }),
    client.fetch(FETCH_BUCKETLISTS_BY_CREATOR_ID, {
      id,
      isLive: isLive !== undefined && isLive !== '' ? isLive === 'true' : null,
      isPremium: isPremium !== undefined && isPremium !== '' ? isPremium === 'true' : null,
    }),
  ]);

  if (!creator) return notFound();

  const { bio, email, image, name } = creator;
  const isAuthorised = session?.user?.sanityId === creator?._id;

  const renderBucketListItems = (items: any[]) => {
    if (items?.length === 0) {
      return (
        <div className='flex flex-col justify-center items-center'>
          <Image
            src="/empty.png"
            alt="No content found"
            width={250}
            height={250}
          />
          <h3 className="text-20-semibold">No bucketlists found</h3>
          <h1 className="sub-heading text-secondary mb-2">Please create new bucketlists</h1>
        </div>
      )
    }

    return (
      <>
        <h1 className="text-30-bold mb-2">Your bucketlists</h1>
        <p className="text-14-normal">
          You can edit, make live, delete the below itineraries by clicking on the itinerary.
        </p>
        <br />
        <div className="card_grid">
          {items.map((item: any) => (
            <BucketListCard
              key={item._id}
              id={item._id}
              title={item.title}
              destination={item.destination}
              category={item.category}
              likes={item.likes}
              creatorName={item.creator.name}
              creatorImage={image}
              coverImage={item?.coverImage}
              slug={item.slug?.current}
            />
          ))}
        </div>
      </>
    );
  };

  const renderView = () => {
    if (!session) {
      return <NotLoggedIn />;
    } else if (session?.user?.loginType !== 'creator') {
      return <NotACreatorProfile />;
    } else if (!isAuthorised) {
      return <NotAuthorised />;
    }

    return (
      <>
        <div className="showcase bg-primary">
          <main className="section_container">
            <div className="flex items-center gap-4 mb-4">
              {image && (
                <Image
                  src={image}
                  alt={`${name}'s avatar`}
                  width={64}
                  height={64}
                  className="rounded-full border border-white"
                />
              )}
              <h1 className="heading text-secondary">Welcome, {name}</h1>
              <Link href={`/creators/profile/edit/${id}`}><Edit /></Link>
            </div>
            <p className="text-30-semibold text-white mb-5">
              This is the place where you can find all details related to your account.
            </p>
          </main>
        </div>
        <div className="section_container">
          <BucketlistFilters />
          {renderBucketListItems(bucketListItems)}
        </div>
      </>
    );
  };

  return <>{renderView()}</>;
};

export default Page;
