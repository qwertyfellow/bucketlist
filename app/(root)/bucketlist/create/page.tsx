import React from 'react';
import { PageParams } from '@/constants/pages';
import BucketListForm from '@/components/BucketListForm';
import { auth } from '@/auth';

const Page = async  ({ params }: { params: Promise<PageParams> }) => {
  const id = (await params).id;

  const session = await auth()
  console.log("Session from bucketlist create page", session)

  return (
    <div>
      {/* // Todo 1: Add session check */}
      {/* // Todo 2: Add bucketlist creation rules/guides */}
      <BucketListForm />
    </div>
  );
};

export default Page;
