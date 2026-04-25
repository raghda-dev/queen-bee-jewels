// client/app/(main)/home/@modal/(.)settings/chat/ChatMessageCard.tsx

'use client';

import Image from 'next/image';
import { Trash } from 'lucide-react';
import AvatarFallback from 'public/staticAssets/images/fallback.png';


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
  // Normalize avatar URL
  let avatarUrl: string | null = null;
  if (avatar) {
    avatarUrl = avatar.startsWith('http')
      ? avatar
      : `${process.env.NEXT_PUBLIC_API_URL}${avatar}`;
  }

  return (
    <div className="w-[98%]">
      <div className="p-2 relative flex w-full items-center gap-4 rounded-lg border border-gray-200 bg-white shadow-sm transition hover:shadow-md">
        {/* Avatar */}
        <div className="w-[60px] h-[60px] flex-shrink-0 flex items-center justify-center rounded-full overflow-hidden">
          <Image
            src={avatarUrl || AvatarFallback}
            alt="Sender Avatar"
            width={60}
            height={60}
            className="w-full h-full object-cover"
            unoptimized
          />
        </div>

        {/* Text section */}
        <div className="p-2">
          <p className="lg:text-lg text-sm font-semibold text-black sm:text-base">
            {subject}
          </p>
          <p className="mt-1 text-sm md:text-md lg:text-lg text-grayDark sm:text-sm w-[80%]">
            {body}
          </p>
          <p className="mt-2 text-sm xs:text-md md:text-lg text-grayDark font-medium font-josefin">
            {sender}
          </p>
        </div>

        {/* Delete icon */}
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
