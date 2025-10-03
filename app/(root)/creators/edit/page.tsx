import React from 'react'
import { PageParams } from '@/constants/pages'
import { auth } from '@/auth'
import CreatorSigninButton from '@/components/Auth/CreatorSignInButton'
import { notFound, redirect } from 'next/navigation'

const Page = async  ({ params }: { params: Promise<PageParams> }) => {

  const session = await auth();
  const userEmail = session?.user?.email;
  const userName = session?.user?.name

  if (session?.loginType === "creator") {
    return redirect(`/creators/profile/${session.accountId}`);
  }

  const renderView = () => {
    return <>
    Edit page
    </>
  }

  return (
    <div>
      {renderView()}
    </div>
  )
}

export default Page
