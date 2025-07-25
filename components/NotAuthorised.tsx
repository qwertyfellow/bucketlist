import { auth } from '@/auth';
import Link from 'next/link';
import React from 'react';

const NotAuthorised = async () => {

    const session = await auth();
    const userId = session?.user?.sanityId

    return (
        <div className="max-w-xl mx-auto mt-16 text-center p-6 rounded-2xl bg-white">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">You're not authorised to view this page.</h2>
            <span>
                <Link className="bg-secondary rounded px-3 py-2 m-2 text-white" href={"/"}>Go to home page</Link>
                <Link className="button_primary" href={`/creators/profile/${userId}`}>Go to profile page</Link>
            </span>
        </div>
    );
};

export default NotAuthorised;
