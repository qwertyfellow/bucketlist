import React from 'react';
import { PageParams } from '@/constants/pages';
import BucketListForm from '@/components/BucketListForm';
import { auth } from '@/auth';
import NotLoggedIn from '@/components/NotLoggedIn';
import NotACreatorProfile from '@/components/NotACreatorProfile';

const Page = async  ({ params }: { params: Promise<PageParams> }) => {
  const id = (await params).id;
  const session = await auth()

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
        <div className="section_container">
          <BucketListForm />
        </div>
      </>
    }
  }


  return (
    <>
      {renderView()}
    </>
  );
};

export default Page;
