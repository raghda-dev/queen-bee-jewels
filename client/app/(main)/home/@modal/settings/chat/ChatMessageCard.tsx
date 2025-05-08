'use client';

import Image from 'next/image';
import { Trash } from 'lucide-react';
import Avatar from 'public/staticAssets/images/Avatar.png';

type ChatMessageCardProps = {
  avatar?: string; // optional override
  subject: string;
  body: string;
  sender: string;
  onDelete?: () => void;
};

export default function ChatMessageCard({
  avatar,
  subject,
  body,
  sender,
  onDelete,
}: ChatMessageCardProps) {
  return (
    <div className='w-[98%]'>
    <div className="relative flex w-full items-start gap-4 rounded-lg border border-gray-200 bg-white shadow-sm transition hover:shadow-md">
      {/* Avatar */}
      <div className="mt-1 flex-shrink-0">
        <Image
          src={avatar || Avatar}
          alt="Sender Avatar"
          width={40}
          height={40}
          className="rounded-full object-cover"
        />
      </div>

      {/* Text section */}
      <div className='p-2'>
        <p className="lg:text-lg text-sm font-semibold text-black sm:text-base">
          {subject}
        </p>
        <p className="mt-1 text-sm md:text-md lg:text-lg text-grayDark sm:text-sm w-[80%]">{body}</p>
        <p className="mt-2 text-sm xs:text-md md:text-lg text-grayDark font-medium font-josefin">{sender}</p>
      </div>

      {/* Delete icon to the left */}
      <button
        onClick={onDelete}
        className="absolute right-3 top-10 text-gray-500 hover:text-orangeDark"
      >
        <Trash size={16} />
      </button>
    </div>
    </div>
  );
}
