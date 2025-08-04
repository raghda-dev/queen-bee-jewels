//client/app/(main)/home/@modal/(.)settings/components/UserHeader.tsx

'use client';

import React from 'react';
import Image from 'next/image';
import AvatarFallback from 'public/staticAssets/images/fallback.png';
import { Pen, Trash, PlusCircle } from 'lucide-react';
import Button from '../../../../components/Button';

type Props = {
  user: {
    full_name: string;
    username: string;
    avatar?: string;
  } | null;
  onAvatarAction: React.Dispatch<
    React.SetStateAction<'add' | 'edit' | 'remove' | null>
  >;
};

export default function UserHeader({ user, onAvatarAction }: Props) {
  if (!user) {
    return null; // or you could show a skeleton/loader instead
  }

  const hasImage = Boolean(user.avatar);


  const avatarUrl = user?.avatar?.startsWith('http')
    ? user.avatar
    : `${process.env.NEXT_PUBLIC_API_URL}${user?.avatar}`;

  return (
    <div className="mb-6 mt-[-1rem] flex w-full flex-col items-center gap-0 border-b pb-5">
      <div className="relative h-28 w-28 sm:h-32 sm:w-32 lg:h-36 lg:w-36 xl:h-40 xl:w-40 overflow-hidden rounded-full transition-all">
        {hasImage ? (
          <Image
            src={`${avatarUrl}?t=${Date.now()}`}
            alt="User Avatar"
            height={500}
            width={200}
            className="h-full w-full object-cover"
            unoptimized
          />
        ) : (
          <Image
            src={AvatarFallback}
            alt="Default Avatar"
            fill
            // height={900}
            // width={900}
            // className="h-full w-full object-cover"
            unoptimized
            // className="h-[150%] w-[150%] object-cover"
          />
        )}
      </div>

      <div className="mt-4 text-center">
        <h2 className="font-josefin text-lg font-semibold md:text-xl lg:text-xl">
          {user.full_name}
        </h2>
        <p className="md:text-md text-sm text-gray-500 lg:text-lg">
          @{user.username}
        </p>
      </div>

      <div
        className={`mt-6 ${hasImage ? 'flex gap-4' : 'flex justify-center'}`}
      >
        {hasImage ? (
          <>
            <Button
              onClick={() => onAvatarAction('edit')}
              rightIcon={<Pen width={14} height={14} />}
              color="var(--black)"
              shape="rectangle"
              size="small"
            >
              edit my photo
            </Button>
            <Button
              onClick={() => onAvatarAction('remove')}
              rightIcon={<Trash width={14} height={14} />}
              color="var(--black)"
              variant="secondary"
              shape="rectangle"
              size="small"
            >
              remove photo
            </Button>
          </>
        ) : (
          <Button
            onClick={() => onAvatarAction('add')}
            shape="rectangle"
            color="var(--black)"
            rightIcon={<PlusCircle width={15} height={15} />}
          >
            add a photo
          </Button>
        )}
      </div>
    </div>
  );
}
