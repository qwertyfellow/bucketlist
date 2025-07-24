import React from 'react'
import { PageParams } from '@/constants/pages'
import { auth } from '@/auth'
import NotLoggedIn from '@/components/NotLoggedIn'
import NotACreatorProfile from '@/components/NotACreatorProfile'
import { client } from '@/sanity/lib/client'
import { FETCH_BUCKETLIST_BY_ID } from '@/sanity/queries/bucketlist'

const Page = async  ({ params }: { params: Promise<PageParams> }) => {
  const id = (await params).id
  const session = await auth()

  const bucketlist = await client.fetch(FETCH_BUCKETLIST_BY_ID, {id: id})
  console.log("bucketlist by id", bucketlist, session)

  const renderView = () => {
    if(!session) {
      return <NotLoggedIn />
    } else if (session && session?.user?.loginType!= "creator") {
      return <NotACreatorProfile />
    } else {
      return<>
        <div className="showcase bg-primary">
          <main className="section_container">
            <h1 className="heading text-secondary">The Bucket List Editor</h1>
            <p className="text-30-semibold text-white mb-5">Use the below editor to create detailed itenary about your travel plan.</p>
          </main>
        </div>
        <div className="mt-5">
          <h1>The Bucket List viewing page {id}</h1>
        </div>
      </>
    }
  }

  // 3. If session is present, query the sanity using the id from the url
  // 4. Verify if the session id and the item.creator.id matches, else render not authorised page.
  return (
    <>
      {renderView()}
    </>
  )
}

export default Page
