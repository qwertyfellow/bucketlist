'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function BucketlistFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isLive, setIsLive] = useState(searchParams.get('isLive') || '');
  const [isPremium, setIsPremium] = useState(searchParams.get('isPremium') || '');

  // Update the URL whenever filters change
  useEffect(() => {
    const params = new URLSearchParams();

    if (isLive) params.set('isLive', isLive);
    if (isPremium) params.set('isPremium', isPremium);

    router.replace(`?${params.toString()}`);
  }, [isLive, isPremium, router]);

  return (
    <div className="flex gap-6 mb-6">
      {/* Live Filter */}
      <div className="flex flex-col">
        <label htmlFor="isLive" className="text-sm font-medium mb-1">
          Status
        </label>
        <select
          id="isLive"
          value={isLive}
          onChange={(e) => setIsLive(e.target.value)}
          className="border rounded-md p-2"
        >
          <option value="">All</option>
          <option value="true">Live</option>
          <option value="false">Draft</option>
        </select>
      </div>

      {/* Premium Filter */}
      <div className="flex flex-col">
        <label htmlFor="isPremium" className="text-sm font-medium mb-1">
          Type
        </label>
        <select
          id="isPremium"
          value={isPremium}
          onChange={(e) => setIsPremium(e.target.value)}
          className="border rounded-md p-2"
        >
          <option value="">All</option>
          <option value="true">Premium</option>
          <option value="false">Free</option>
        </select>
      </div>
    </div>
  );
}
