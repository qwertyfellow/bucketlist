import React from 'react'
import { PageParams } from '@/constants/pages'

const Page = async  ({ params }: { params: Promise<PageParams> }) => {
  const id = (await params).id
  return (
    <div>
      <h1>The Bucket List viewing page</h1>
    </div>
  )
}

export default Page
