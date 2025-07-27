import React from 'react'
import { PageParams } from '@/constants/pages'
import { auth } from '@/auth'
import NotLoggedIn from '@/components/NotLoggedIn'
import NotACreatorProfile from '@/components/NotACreatorProfile'
import { client } from '@/sanity/lib/client'
import { FETCH_BUCKETLIST_BY_ID } from '@/sanity/queries/bucketlist'
import NotAuthorised from '@/components/NotAuthorised'
import markdownit from 'markdown-it'

const md = markdownit();

const Page = async  ({ params }: { params: Promise<PageParams> }) => {
  const id = (await params).id
  const session = await auth()

  const bucketlist = await client.fetch(FETCH_BUCKETLIST_BY_ID, {id: id})
  const isAuthorised = session?.user?.sanityId === bucketlist.creator._id

  const { title, category, content, destination, description } = bucketlist;
  const parsedContent = md.render(content || "");
  console.log("Logs from Bucketlist view page",bucketlist, session, isAuthorised)

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
            <p className="text-30-semibold text-white mb-5">{description}</p>
          </main>
        </div>
        {/* prose classname is specifically to fix the default css removed by tailwind. */}
        <div
          className="mt-5 section_container prose"
          dangerouslySetInnerHTML={{ __html: parsedContent }}
        />
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
