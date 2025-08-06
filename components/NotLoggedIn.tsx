import React from 'react';
import CreatorSigninButton from './CreatorSignInButton';
import Image from 'next/image';

const NotLoggedIn = () => {
  return (
    <div className="max-w-xl mx-auto mt-16 text-center p-6 rounded-2xl bg-white">
      <div className='flex flex-col items-center'>
        <div>
          <Image src="/ad.png" width={250} height={250} alt="Ad image" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">You're not logged in</h2>
          <p className="text-gray-600 text-sm mb-5">
            Please log in to access this page.
          </p>
          <CreatorSigninButton />
        </div>
      </div>
    </div>
  );
};

export default NotLoggedIn;
