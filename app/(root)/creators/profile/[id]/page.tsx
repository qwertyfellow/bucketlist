import React from 'react'
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { auth } from '@/auth';
import { client } from '@/sanity/lib/client';

import { PageParams } from '@/constants/pages'
import NotLoggedIn from '@/components/NotLoggedIn';
import NotACreatorProfile from '@/components/NotACreatorProfile';
import NotAuthorised from '@/components/NotAuthorised';
import BucketListCard from '@/components/BucketListItem';

import { FETCH_CREATOR_BY_SANITY_ID_QUERY } from '@/sanity/queries/creator';
import { FETCH_BUCKETLISTS_BY_CREATOR_ID } from '@/sanity/queries/bucketlist';
import Link from 'next/link';

const Page = async ({ params }: { params: Promise<PageParams> }) => {
  const id = (await params).id;
  const session = await auth();

  const [creator, bucketListItems] = await Promise.all([
    client.fetch(FETCH_CREATOR_BY_SANITY_ID_QUERY, { id }),
    client.fetch(FETCH_BUCKETLISTS_BY_CREATOR_ID, { id })
  ])

  if (!creator) return notFound();

  const { bio, email, image, name } = creator;
  const isAuthorised = session?.user?.sanityId === creator?._id;

  const renderBucketListItems = (items: any[]) => {
    if (items?.length === 0) {
      return <>
        <h1 className="sub-heading text-secondary">No bucketlists found</h1>
        <p className="text-14-normal mb-5">Please create new bucketlists</p>
      </>
    }

    return <>
    <p className="text-14-normal mb-5">You can edit, make live, delete the below items.</p>
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
        creatorImage={item.creatorImage}
        slug={item.slug?.current}
        />
      ))}
    </div>
    </>
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
            </div>
            {/* <p className="text-30-semibold text-white mb-5">{bio}</p> */}
            <p className="text-30-semibold text-white mb-5">
              This is the place where you can find all details related to your account.
            </p>
            <span>
              <Link className="button_primary" href={"/bucketlist/create"}>Create a bucketlist</Link>
            </span>
          </main>
        </div>
        <div className="section_container">
          <h1 className="text-30-bold mb-2">Your bucketlists</h1>
          {renderBucketListItems(bucketListItems)}
        </div>
      </>
    );
  };

  return <>{renderView()}</>;
};

export default Page;

/**
 * 2. Add Edit and Delete buttons for each item
 */