'use client';

import Image from 'next/image';
import { Heart } from 'lucide-react';

type BucketListCardProps = {
  title: string;
  destination: string;
  category: string;
  tags?: string[];
  likes: number;
  creatorName: string;
  creatorImage?: string;
  slug: string;
};

export default function BucketListCard({
  title,
  destination,
  category,
  likes,
  creatorName,
  creatorImage,
}: BucketListCardProps) {
  return (
    <div className="rounded-[var(--radius)] shadow-md border border-gray-200 p-5 bg-white flex flex-col justify-between">
      {/* Title */}
      <h3 className="text-20-medium mb-3">{title}</h3>

      {/* Destination (optional) */}
      <p className="text-14-normal text-gray-600 mb-2">{destination}</p>

      {/* Footer */}
      <div className="flex-between mt-auto pt-4 border-t border-gray-100">
        {/* Category Chip */}
        <span className="text-xs">{category}</span>

        <div className="flex items-center gap-3">
          {/* Likes */}
          <div className="flex items-center text-sm text-gray-500">
            <Heart className="size-4 mr-1 text-red-500" />
            {likes}
          </div>

          {/* Creator */}
          <div className="flex items-center gap-2">
            {true && (
              <Image
                src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzxxL9QJwd8uvlxEfRNeIQ0f95csFDE_kRRg&s"}
                alt={creatorName}
                width={28}
                height={28}
                className="rounded-full object-cover"
              />
            )}
            <span className="text-sm font-medium text-black">{creatorName}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
