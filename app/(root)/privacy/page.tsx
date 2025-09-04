import PrivacyAndTerms from '@/components/Admin/PrivacyAndTerms';
import { PageParams } from '@/constants/pages';

export const dynamic = 'force-static'

const Page = async  ({ params }: { params: Promise<PageParams> }) => {

    return (
        <>
            <div className="showcase bg-primary">
                <main className="section_container">
                    <h1 className="heading text-secondary">Privacy, Terms and Conditions</h1>
                    <p className="text-30-semibold text-white mb-4">Your safety and trust is our first priority.</p>
                </main>
            </div>
            <div className="section_container">
                <PrivacyAndTerms />
            </div>
        </>
    )
}

export default Page;
