import React from 'react'
import { PageParams } from '@/constants/pages'
import { auth } from '@/auth';
import NotLoggedIn from '@/components/NotLoggedIn';
import NotACreatorProfile from '@/components/NotACreatorProfile';
import { client } from '@/sanity/lib/client';
import { FETCH_CREATOR_BY_SANITY_ID_QUERY } from '@/sanity/queries/creator';
import { notFound } from 'next/navigation';
import NotAuthorised from '@/components/NotAuthorised';

const Page = async  ({ params }: { params: Promise<PageParams> }) => {

  const id = (await params).id;
  const session = await auth();

  const creator = await client.fetch(FETCH_CREATOR_BY_SANITY_ID_QUERY, {id: id})

  // Handler when bucketlist not found use-case.
  if(!creator) return notFound();

  // Destructure the data
  const { bio, email, image, name } = creator;
  const isAuthorised = session?.user?.sanityId === creator?._id

  /**
   * 1. Handle session not found use-case
   * 2. Handle id not found use-case
   * 3. Handle session and id does not match use-case
   * 4. Handle success case
   * 5. Link the profile page on the navbar
   */

  const renderView = () => {
    if (!session) {
      return <NotLoggedIn />
    } else if (session && session?.user?.loginType!="creator") {
      return <NotACreatorProfile />
    } else if (session && session?.user?.loginType!="creator" && !isAuthorised) {
      return <NotAuthorised />
    }
    return <div>
        <h1>Creators profile page {id}</h1>
    </div>
  }
    return (
      <>
        {renderView()}
      </>
    )
}

export default Page
