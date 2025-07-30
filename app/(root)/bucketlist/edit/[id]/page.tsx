import React from 'react'
import { PageParams } from '@/constants/pages';
import { auth } from '@/auth';
import { notFound } from 'next/navigation';
import NotLoggedIn from '@/components/NotLoggedIn'
import NotACreatorProfile from '@/components/NotACreatorProfile'
import NotAuthorised from '@/components/NotAuthorised'
import { client } from '@/sanity/lib/client';
import markdownit from 'markdown-it'
import { FETCH_BUCKETLIST_BY_ID } from '@/sanity/queries/bucketlist';
import BucketListForm from '@/components/BucketListForm';

const md = markdownit();
const Page = async  ({ params }: { params: Promise<PageParams> }) => {

    const id = (await params).id;
    const session = await auth();

    const bucketlist = await client.fetch(FETCH_BUCKETLIST_BY_ID, {id: id})

    // Handler when bucketlist not found use-case.
    if(!bucketlist) return notFound();
    const isAuthorised = session?.user?.sanityId === bucketlist?.creator?._id

    const { title, category, content, creator, destination, description, likes } = bucketlist;
    const parsedContent = md.render(content || "");

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
          <BucketListForm />
        </div>
        </>
        /**
         * Integrate bucketlist form component
         * Populate the data on to the bucketlist form component
         */
        }
    }

    return (
        <>
        {renderView()}
        </>
    )
}

export default Page;
