import React from 'react';
import { PageParams } from '@/constants/pages';
import BucketListForm from '@/components/BucketListForm';
import { auth } from '@/auth';

const Page = async  ({ params }: { params: Promise<PageParams> }) => {
  const id = (await params).id;

  const session = await auth()
  console.log("Session from bucketlist create page", session)

  return (
    <>
      <div className="showcase_container bg-primary mb-5">
        <main>
          <h1 className="heading text-secondary">The Bucket List Editor</h1>
          <p className="text-30-semibold text-white mb-5">Use the below editor to create detailed itenary about your travel plan.</p>
        </main>
      </div>
      <BucketListForm />
    </>
  );
};

export default Page;
