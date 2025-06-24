import React from 'react'
import { PageParams } from '@/constants/pages'

const Page = async  ({ params }: { params: Promise<PageParams> }) => {
  return (
    <div>
      <h1>Users profile page</h1>
    </div>
  )
}

export default Page
