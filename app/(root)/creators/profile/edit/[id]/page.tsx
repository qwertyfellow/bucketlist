import { auth } from "@/auth";
import { client } from "@/sanity/lib/client";
import { notFound } from "next/navigation";
import Image from "next/image";

import type { PageParams, SearchParams } from "@/constants/pages";
import NotLoggedIn from "@/components/Auth/NotLoggedIn";
import NotACreatorProfile from "@/components/Auth/NotACreatorProfile";
import NotAuthorised from "@/components/Auth/NotAuthorised";
import CreatorEditForm from "@/components/Creators/CreatorEditForm";

import { FETCH_CREATOR_BY_SANITY_ID_QUERY } from "@/sanity/queries/creator";

const Page = async ({
  params,
  searchParams,
}: {
  params: Promise<PageParams>;
  searchParams: Promise<SearchParams>;
}) => {

  // Variables
  const { id } = await params;
  const session = await auth();

  // Fetch creator details
  const creator = await client.fetch(FETCH_CREATOR_BY_SANITY_ID_QUERY, { id });

  // If creator not found → 404
  if (!creator) return notFound();

  const isAuthorised = session?.user?.sanityId === creator?._id;

  const renderView = () => {
    if (!session) {
      return <NotLoggedIn />;
    } else if (session?.user?.loginType !== "creator") {
      return <NotACreatorProfile />;
    } else if (!isAuthorised) {
      return <NotAuthorised />;
    }

    return (
      <>
        <div className="showcase bg-primary">
          <main className="section_container">
            <div className="flex items-center gap-4 mb-4">
              {creator?.image && (
                <Image
                  src={creator.image}
                  alt={`${creator.name}'s avatar`}
                  width={75}
                  height={100}
                  className="rounded-full border border-white"
                />
              )}
              <h1 className="heading text-secondary">Edit Profile</h1>
            </div>
            <p className="text-30-semibold text-white mb-5">
              Update your creator information below.
            </p>
          </main>
        </div>

        <div className="section_container">
          <CreatorEditForm creator={creator} />
        </div>
      </>
    );
  };

  return <>{renderView()}</>;
};

export default Page;
