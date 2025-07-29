import React from 'react'
import { Suspense } from "react";
import { PageParams } from '@/constants/pages'
import { auth } from '@/auth'
import NotLoggedIn from '@/components/NotLoggedIn'
import NotACreatorProfile from '@/components/NotACreatorProfile'
import { client } from '@/sanity/lib/client'
import { FETCH_BUCKETLIST_BY_ID } from '@/sanity/queries/bucketlist'
import NotAuthorised from '@/components/NotAuthorised'
import markdownit from 'markdown-it'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import View from '@/components/View'
import { Heart } from 'lucide-react';

const md = markdownit();
export const experimental_ppr = true;

const Page = async  ({ params }: { params: Promise<PageParams> }) => {
  const id = (await params).id
  const session = await auth()

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
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                  <p className="text-20-semibold">by</p>
                  <Image
                  src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzxxL9QJwd8uvlxEfRNeIQ0f95csFDE_kRRg&s"}
                  alt={creator?.name}
                  width={28}
                  height={28}
                  className="avatar"
                />
                <p className="text-20-semibold">{creator?.name}</p>
              </div>
              <div>
                <span className="badge mr-2">
                  <Heart style={{
                    display: "inline",
                    height: "15px",
                  }}/>
                  {likes && likes != 0 ? ` liked by ${likes} ` : "No likes yet" }
                </span>
                <span className="badge mr-2">
                  {category}
                </span>
                <span className="badge">
                  {destination}
                </span>
              </div>
            </div>
          </main>
        </div>
        {/* prose classname is specifically to fix the default css removed by tailwind. */}
        <div
          className="mt-5 section_container prose"
          dangerouslySetInnerHTML={{ __html: parsedContent }}
        />
        <Suspense fallback={<p>Loading...</p>}>
          <View id={bucketlist._id}/>
        </Suspense>
      </>
      /**
       * Add isLive indicator on next to title
       */
    }
  }

  return (
    <>
      {renderView()}
    </>
  )
}

export default Page
