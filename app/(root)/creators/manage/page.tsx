import { PageParams } from '@/constants/pages';
import TravelConsultations from '@/components/Creators/TravelConsultationsInfo';

export const dynamic = 'force-static'

const Page = async  ({ params }: { params: Promise<PageParams> }) => {

    return (
        <>
            <div className="showcase bg-primary">
                <main className="section_container text-center">
                    <h1 className="heading text-secondary">Travel consultations</h1>
                    <p className="text-30-semibold text-white mb-4"></p>
                </main>
            </div>
            <div className="section_container">
                <TravelConsultations />
            </div>
        </>
    )
}

export default Page;
