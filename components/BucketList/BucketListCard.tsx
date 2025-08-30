'use client';

import Image from 'next/image';
import { Heart } from 'lucide-react';
import Link from 'next/link';
import { useMemo } from 'react';

type BucketListCardProps = {
  title: string;
  destination: string;
  coverImage: string;
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
  coverImage,
  likes,
  creatorName,
  creatorImage,
  slug,
  id,
}: BucketListCardProps) {
  const randomBg = useMemo(() => {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 70%, 90%)`;
  }, [id]);

  return (
    <Link href={`/bucketlist/view/${id}`} className="no-underline">
      <div
        style={{ backgroundColor: coverImage ? '' : randomBg }}
        className="relative rounded-[var(--radius)] shadow-md border border-gray-200 flex flex-col justify-between min-h-[350px] overflow-hidden transition-transform duration-200 ease-in-out hover:scale-[1.05]"
      >
        {/* Background image if exists */}
        {coverImage && (
          <Image
            src={coverImage}
            alt={title}
            fill
            className="absolute inset-0 object-cover"
          />
        )}

        {/* Gradient overlay (extends higher) */}
        <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-white via-white/90 to-transparent pointer-events-none" />

        {/* Foreground content */}
        <div className="relative z-10 flex flex-col justify-between h-full p-5 mt-auto">
          <h3 className="text-20-medium mb-3 line-clamp-2">{title}</h3>

          <div className="mt-auto">
            <div className="flex justify-between items-center mb-2">
              <p className="text-14-normal text-gray-600 badge">{destination}</p>
              <div className="flex items-center text-sm text-gray-500">
                <Heart className="size-4 mr-1 text-red-500" />
                {likes}
              </div>
            </div>

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
                <span className="text-sm font-medium text-black">
                  by {creatorName}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
