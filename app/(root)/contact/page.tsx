import ContactUs from '@/components/Admin/ContactUs';
import { PageParams } from '@/constants/pages';

export const dynamic = 'force-static'

const Page = async  ({ params }: { params: Promise<PageParams> }) => {

    return (
        <>
            <div className="showcase bg-primary">
                <main className="section_container">
                    <h1 className="heading text-secondary">Round the clock, at your support</h1>
                    <p className="text-30-semibold text-white mb-4">Please share your concerns at the below mentioned details, we will reach out to you at the earliest.</p>
                </main>
            </div>
            <div className="section_container">
                <ContactUs />
            </div>
        </>
    )
}

export default Page;
