import React from 'react';
import CreatorSigninButton from './CreatorSignInButton';

const NotLoggedIn = () => {
  return (
    <div className="max-w-xl mx-auto mt-16 text-center p-6 rounded-2xl bg-white">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">You're not logged in</h2>
      <p className="text-gray-600 text-sm mb-5">
        Please log in to access this page.
      </p>
      <CreatorSigninButton />
    </div>
  );
};

export default NotLoggedIn;
