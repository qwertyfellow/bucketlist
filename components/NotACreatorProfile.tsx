import React from 'react';

const NotACreatorProfile = () => {
  return (
    <div className="max-w-xl mx-auto mt-16 text-center p-6 rounded-2xl bg-white">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">You're not a <b>Creator</b></h2>
      <p className="text-gray-600 text-sm mb-5">
        You are not a creator, which means that you are using a different account than that of a creator account.
      </p>
      <p className="text-gray-600 text-sm mb-5">
        Please log out from the current account and use the correct account that is signed up as a <b>creator</b>.
      </p>
    </div>
  );
};

export default NotACreatorProfile;
