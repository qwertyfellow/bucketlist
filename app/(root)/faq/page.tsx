import FaQs from '@/components/Admin/FaQs';
import { PageParams } from '@/constants/pages';

export const dynamic = 'force-static'

const Page = async  ({ params }: { params: Promise<PageParams> }) => {

    return (
        <>
            <div className="showcase bg-primary">
                <main className="section_container">
                    <h1 className="heading text-secondary">Frequently Asked Questions</h1>
                    <p className="text-30-semibold text-white mb-4">Everything you need to know about Roamfluencer — from how it works,
    how creators earn, to understanding features like <code>isLive </code>
    and <code>isPremium</code>.</p>
                </main>
            </div>
            <div className="section_container">
                <FaQs />
            </div>
        </>
    )
}

export default Page;
