import React from 'react'
import Link from 'next/link'
import { PageParams } from '@/constants/pages'
import { auth, signIn } from '@/auth'
import CreatorSignupButton from '@/components/CreatorSignUpButton'

const Page = async  ({ params }: { params: Promise<PageParams> }) => {

  const session = await auth();
  console.log("session from creator joining page", session)

  return (
    <div>

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
    </div>
  )
}

export default Page
