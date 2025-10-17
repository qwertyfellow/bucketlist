'use client';

import Image from 'next/image';
import Link from 'next/link';
import { BookOpen, Eye } from 'lucide-react';

type CreatorCardProps = {
  id: string;
  name: string;
  image?: string;
  storiesCount: number;
  viewsCount: number;
};

export default function CreatorCard({
  id,
  name,
  image,
  storiesCount,
  viewsCount,
}: CreatorCardProps) {
  return (
    <Link href={`/creator/${id}`} className="no-underline">
      <div className="relative rounded-[var(--radius)] shadow-md border border-gray-200 overflow-hidden transition-transform duration-200 ease-in-out hover:scale-[1.05] w-full aspect-square">
        
        {/* Full-width image */}
        {image && (
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover"
          />
        )}

        {/* Gradient footer section */}
        <div className="absolute inset-x-0 bottom-0 px-4 py-3 bg-gradient-to-t from-[rgba(0,0,0,0.7)] via-[rgba(0,0,0,0.35)] to-transparent">
          <h3 className="text-lg font-medium truncate text-white mb-2">{name}</h3>

          {/* Stats */}
          <div className="flex items-center justify-start gap-4 text-xs text-gray-200">
            {/* Stories */}
            {storiesCount && <div className="flex items-center gap-1">
              <BookOpen className="size-3 text-blue-300" />
              <span>{storiesCount}</span>
            </div>}
            {/* Views */}
            {viewsCount && <div className="flex items-center gap-1">
              <Eye className="size-3 text-green-300" />
              <span>{viewsCount}</span>
            </div>}
          </div>
        </div>
      </div>
    </Link>
  );
}
