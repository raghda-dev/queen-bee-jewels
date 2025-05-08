
//app/(main)/components/userHeader.tsx

'use client';

import React, {useState} from 'react';
import Image from 'next/image';
import Avatar from 'public/staticAssets/images/Avatar.png';
import { Pen, Trash, PlusCircle } from 'lucide-react';
import Button from '../../../../components/Button';

type Props = {
  onEdit?: () => void;
  onRemove?: () => void;
  onAdd?: () => void;
};


export default function UserHeader({
  onEdit,
  onRemove,
  onAdd,
}: Props) {

  const [hasImage, setHasImage] = useState(true);
  const name = 'Raghda Mazhar';
  const username = '@raghda-dev';

  return (
    <div className="flex flex-col items-center gap-0 mb-6 w-full mt-[-1rem] pb-5 border-b">
      <div className="relative h-24 w-24 md:w-28 md:h-28 lg:h-32 lg:w-32 overflow-hidden rounded-full transition-all">
        {hasImage ? (
          <Image src={Avatar} alt="User Avatar" fill className="object-fit" />
        ) : (
          <div className="h-full w-full bg-gray-200 rounded-full" />
        )}
      </div>

      <div className="mt-4 text-center">
        <h2 className="text-lg md:text-xl lg:text-xl font-semibold font-josefin">{name}</h2>
        <p className="text-sm md:text-md lg:text-lg text-gray-500">{username}</p>
      </div>

      {onEdit || onRemove || onAdd ? (
        <div className={`mt-6 ${hasImage ? 'flex gap-4' : 'flex justify-center'}`}>
          {hasImage ? (
            <>
              <Button onClick={onEdit} rightIcon={<Pen width={15} height={15} />} color="var(--black)" shape="rectangle" size="small">
                edit my photo
              </Button>
              <Button onClick={onRemove} rightIcon={<Trash width={15} height={16} />} variant="secondary" shape="rectangle" size="small">
                remove photo
              </Button>
            </>
          ) : (
            <Button onClick={onAdd} shape="rectangle" color="var(--black)" rightIcon={<PlusCircle width={15} height={15} />}>
              add a photo
            </Button>
          )}
        </div>
      ) : null}
    </div>
  );
}
