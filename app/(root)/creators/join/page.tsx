import React from 'react'
import { PageParams } from '@/constants/pages'
import { auth } from '@/auth'
import CreatorSignupButton from '@/components/CreatorSignUpButton'
import { redirect } from 'next/navigation'

const Page = async  ({ params }: { params: Promise<PageParams> }) => {

  const session = await auth();
  const userEmail = session?.user?.email;
  const userName = session?.user?.name

  if (session?.loginType === "creator") {
    return redirect(`/creators/profile/${session.accountId}`);
  }

  const renderView = () => {
    if(session?.loginType == "creator") {
      return <>
        <div className="bg-primary text-center">
          <div className="colored_container">
            <main>
              <h1 className="heading text-secondary">Welcome, {userName}</h1>
              <p className="text-secondary mb-5">You already joined as Creator using the account <b>{userEmail}</b></p>
              <p className="text-30-semibold text-white mb-5">Create and earn from your travel experiences.</p>
            </main>
          </div>
        </div>
      </>
    } else {
      return <>
        {/* Header section */}
        <div className="bg-primary text-center">
          <div className="colored_container">
            <main>
              <h1 className="heading text-secondary">Onboard as a Travel Content Creator</h1>
              <p className="text-30-semibold text-white mb-5">Create and earn from your travel experiences.</p>
              <span>
                <CreatorSignupButton />
              </span>
            </main>
          </div>
        </div>

        {/* Rules section */}
        <section className='section_container'>
          <h2 className="sub-heading ">Points to be noted:</h2>
          <ul>
            <li>1. Please use <b>separate</b> accounts for creator and normal user, in-case you want to use this platform as both creator and user.</li>
            <li>2. You can create iternaries only with your <b>creator</b> account.</li>
            <li>3. You will be automaticaly redirected to creator's profile page if you are already signed in using creator account.</li>
          </ul>
        </section>
      </>
    }
  }

  return (
    <div>
      {renderView()}
    </div>
  )
}

export default Page
