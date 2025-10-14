import { PageParams, SearchParams } from '@/constants/pages'
import { auth } from '@/auth'

const Page = async ({
  params,
  searchParams,
}: {
  params: Promise<PageParams>;
  searchParams: Promise<SearchParams>;
}) => {

  // Variables
  const id = (await params).id;
  const session = await auth();

  const userEmail = session?.user?.email;
  const userName = session?.user?.name


  const renderView = () => {
    return <>
    Edit page {id}
    </>
  }

  return (
    <div>
      {renderView()}
    </div>
  )
}

export default Page
