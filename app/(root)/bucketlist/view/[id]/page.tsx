import React from 'react'
import { Suspense } from "react";
import { PageParams } from '@/constants/pages'
import { auth } from '@/auth'
import NotLoggedIn from '@/components/Auth/NotLoggedIn'
import NotACreatorProfile from '@/components/Auth/NotACreatorProfile'
import NotAuthorised from '@/components/Auth/NotAuthorised'
import { client } from '@/sanity/lib/client'
import { FETCH_BUCKETLIST_BY_ID } from '@/sanity/queries/bucketlist'
import markdownit from 'markdown-it'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import View from '@/components/View'
import { Edit, Loader} from 'lucide-react';
import Link from 'next/link';
import DeleteBucketlistButton from '@/components/BucketList/DeleteBucketList';

const md = markdownit();
export const experimental_ppr = true;

const Page = async ({ params }: { params: Promise<PageParams> }) => {
  const id = (await params).id
  const session = await auth()
  const bucketlist = await client.fetch(FETCH_BUCKETLIST_BY_ID, { id: id })

  // Handler when bucketlist not found use-case.
  if (!bucketlist) return notFound();

  // Destructure the data
  const { title, category, content, creator, destination, description, likes, isLive, views } = bucketlist;
  const isAuthorised = session?.user?.sanityId === bucketlist.creator?._id
  const parsedContent = md.render(content || "");

  const renderView = () => {
    if (!session) {
      return <NotLoggedIn />
    } else if (session && session?.user?.loginType != "creator") {
      return <NotACreatorProfile />
    } else if (session && session?.user?.loginType == "creator" && !isAuthorised) {
      return <NotAuthorised />
    } else {
      return (
        <>
          <div className="showcase bg-primary">
            <main className="section_container">
              {/* Title */}
              <h1 className="heading text-secondary flex items-center gap-2">
                {title}
              </h1>

              {/* Description */}
              <p className="text-30-semibold text-white mb-4">{description}</p>

              {/* Row: Badges + Action Buttons */}
              <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
                {/* Left: Badges */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="badge">{likes ? `❤️ Liked by ${likes}` : "No likes yet"}</span>
                  <span className="badge">{category}</span>
                  <span className="badge">{destination}</span>
                </div>

                {/* Right: Edit & Delete buttons */}
                {isAuthorised && <div className="flex gap-2">
                  <Link href={`/bucketlist/edit/${id}`} className='flex items-center gap-1 button_info'>
                    <Edit width={"15px"} height={"15px"}/>
                    <p>Edit</p>
                  </Link>
                  <div className='flex items-center gap-1 button_danger'>
                    <DeleteBucketlistButton id={id} creatorId={bucketlist.creator?._id}/>
                  </div>
                </div>}
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-3">
                <p className="text-20-semibold">by</p>
                <Image
                  src={creator?.image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzxxL9QJwd8uvlxEfRNeIQ0f95csFDE_kRRg&s"}
                  alt={creator?.name}
                  width={28}
                  height={28}
                  className="avatar"
                />
                <p className="text-20-semibold">{creator?.name}</p>
              </div>
            </main>
          </div>

          {/* Bucketlist Markdown Content */}
          <div
            className="mt-5 section_container prose"
            dangerouslySetInnerHTML={{ __html: parsedContent }}
          />

          {/* Analytics View (Suspense) */}
          <Suspense fallback={<Loader className="bottom-right-fixed" />}>
            <View id={bucketlist._id} />
          </Suspense>
        </>
      )
    }
  }

  return <>{renderView()}</>
}

export default Page
