'use client';

import Image from 'next/image';
import { Heart } from 'lucide-react';
import Link from 'next/link';

type BucketListCardProps = {
  title: string;
  destination: string;
  category: string;
  tags?: string[];
  likes: number;
  creatorName: string;
  creatorImage?: string;
  slug: string;
  id: string;
};

export default function BucketListCard({
  title,
  destination,
  category,
  likes,
  creatorName,
  creatorImage,
  slug,
  id
}: BucketListCardProps) {
  return (
    <Link href={`/bucketlist/view/${id}`} className="no-underline">
      <div className="relative rounded-[var(--radius)] shadow-md border border-gray-200 bg-white flex flex-col justify-between min-h-[280px] overflow-hidden p-5 transition-transform duration-200 ease-in-out hover:scale-[1.05]">
        {/* Title */}
        <h3 className="text-20-medium mb-3 line-clamp-2">{title}</h3>

        {/* Gradient footer section */}
        <div className="absolute inset-x-0 bottom-0 px-5 py-4 bg-gradient-to-t from-white via-white/80 to-transparent">
          {/* Destination + Likes */}
          <div className="flex justify-between items-center mb-2">
            <p className="text-14-normal text-gray-600 badge">{destination}</p>

            <div className="flex items-center text-sm text-gray-500">
              <Heart className="size-4 mr-1 text-red-500" />
              {likes}
            </div>
          </div>

          {/* Category + Creator */}
          <div className="flex-between pt-2 border-t border-gray-100">
            <span className="text-xs">{category}</span>

            <div className="flex items-center gap-2">
              {creatorImage && (
                <Image
                  src={creatorImage}
                  alt={creatorName}
                  width={18}
                  height={18}
                  className="avatar"
                />
              )}
              <span className="text-sm font-medium text-black">by {creatorName}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
