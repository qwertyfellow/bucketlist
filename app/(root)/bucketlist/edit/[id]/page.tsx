import React from 'react'
import { PageParams } from '@/constants/pages';
import { auth } from '@/auth';
import { notFound } from 'next/navigation';
import NotLoggedIn from '@/components/NotLoggedIn'
import NotACreatorProfile from '@/components/NotACreatorProfile'
import NotAuthorised from '@/components/NotAuthorised'
import { client } from '@/sanity/lib/client';
import { FETCH_BUCKETLIST_BY_ID } from '@/sanity/queries/bucketlist';
import BucketListForm from '@/components/BucketListForm';

const Page = async  ({ params }: { params: Promise<PageParams> }) => {

    const id = (await params).id;
    const session = await auth();

    const bucketlistToBeEdited = await client.fetch(FETCH_BUCKETLIST_BY_ID, {id: id})
    const { title, description} = bucketlistToBeEdited;
    const isAuthorised = session?.user?.sanityId === bucketlistToBeEdited?.creator?._id

    // Handler when bucketlist not found use-case.
    if(!bucketlistToBeEdited) return notFound();

    const renderView = () => {
        if(!session) {
        return <NotLoggedIn />
        } else if (session && session?.user?.loginType!= "creator") {
        return <NotACreatorProfile />
        } else if (session && session?.user?.loginType == "creator" && !isAuthorised) {
        return <NotAuthorised />
        } else {
        return<>
        <div className="showcase bg-primary">
            <main className="section_container">
                <h1 className="heading text-secondary">{title}</h1>
                <p className="text-30-semibold text-white mb-4">{description}</p>
            </main>
        </div>
        <div className="section_container">
          <BucketListForm editBucketlist={bucketlistToBeEdited}/>
        </div>
        /**
        1. Update the form component to show values from edit item
        2. Create another server action to handle edit flow
         */
        </>
        }
    }

    return (
        <>
        {renderView()}
        </>
    )
}

export default Page;
