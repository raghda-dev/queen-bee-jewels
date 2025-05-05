'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import Button from '../../../../components/Button';
import Avatar from '../../../../../../public/staticAssets/images/Avatar.png';
import { Trash, PlusCircle, Pen } from 'lucide-react';

export default function AccountPage() {
  const [hasImage, setHasImage] = useState(true); // Simulate avatar state
  const [newPassword, setNewPassword] = useState(''); // Simulate new password state
  const [showRetype, setShowRetype] = useState(false); // Simulate retype password state
  const [confirmPassword, setConfirmPassword] = useState(''); // Simulate confirm password state

  const name = 'Raghda Mazhar';
  const username = '@raghda-dev';

  useEffect(() => {
    // Disable scrolling
    document.body.style.overflow = 'hidden';
  
    // Cleanup when component unmounts
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <section className="flex flex-col items-center justify-start max-h-[85vh]">
      {/* Avatar */}
      <div className='flex flex-col items-center gap-0 mb-6 w-full mt-[-1rem] pb-5 border-b border-gray-300'>
      <div className="relative h-28 w-28 lg:h-36 lg:w-36 overflow-hidden rounded-full">
        {hasImage ? (
          <Image src={Avatar} alt="User Avatar" fill className="object-cover" />
        ) : (
          <div className="h-full w-full bg-gray-200 rounded-full" />
        )}
      </div>

      {/* Name & Username */}
      <div className="mt-4 text-center">
        <h2 className="text-lg md:text-xl lg:text-xl font-semibold">{name}</h2>
        <p className="text-sm md:text-md lg:text-lg text-gray-500">{username}</p>
      </div>

      {/* Avatar Action Buttons */}
      <div className={`mt-6 ${hasImage ? 'flex gap-4' : 'flex justify-center'}`}>
        {hasImage ? (
          <>
            <Button
              rightIcon={<Pen width={15} height={15} />}
              color="var(--black)"
              shape="rectangle"
              size="small"
            >
              edit my photo
            </Button>
            <Button
              rightIcon={<Trash width={15} height={16} />}
              variant="secondary"
              shape="rectangle"
              size="small"
            >
              remove photo
            </Button>
          </>
        ) : (
          <Button shape="rectangle" color='var(--black)' rightIcon={<PlusCircle width={15} height={15} />}>
            add a photo
          </Button>
        )
        }
        </div>
      </div>
      <div className='grid grid-cols-1 max-h-[55%] w-full xs:w-[90%] sm:w-[80%] md:w-[90%] transition-all p-0 '>
      {/* Account Info Form */}
      <form className="w-[80%] md:w-full px-4 py-10 grid md:grid-cols-2 gap-x-6 gap-y-5">
        {/* Name & Email */}
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-grayDark ">
              Name
            </label>
            <input
              id="name"
              type="text"
              defaultValue={name}
              className="w-[90%] border border-gray-300 rounded-md px-4 py-2 text-sm"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-grayDark ">
              Email
            </label>
            <input
              id="email"
              type="email"
              defaultValue="raghda@example.com"
              className="w-[90%] border border-gray-300 rounded-md px-4 py-2 text-sm"
            />
          </div>

        {/* Username & Address */}
          <div>
            <label htmlFor="username" className="block text-sm font-semibold text-grayDark ">
              Username
            </label>
            <input
              id="username"
              type="text"
              defaultValue="@raghda-dev"
              className="w-[90%] border border-gray-300 rounded-md px-4 py-2 text-sm"
            />
          </div>
          <div>
            <label htmlFor="address" >
              Address
            </label>
            <input
              id="address"
              type="text"
              placeholder="123 Street, Ramallah"
              className="w-[90%] border border-gray-300 rounded-md px-4 py-2 text-sm"
            />
          </div>
        {/* Update Info Button */}
        <div className="flex justify-center w-[70%]">
          <Button shape="rectangle" size="small" type="submit" color='var(--purple-medium)'>
            Update my information
          </Button>
        </div>
      </form>

{/* Password Form */}
<form
  onSubmit={(e) => {
    e.preventDefault();
    // Optional: handle submission
  }}
  className="w-[80%] max-w-3xl md:max-w-2xl px-4 pb-10 space-y-6"
>
  <div className="flex flex-col gap-6">
    {/* New Password */}
    <div>
      <label htmlFor="newPassword" className="block text-sm text-gray-700 mb-1">
        New password
      </label>
      <input
        id="newPassword"
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        onBlur={() => {
          if (newPassword.trim().length > 0) setShowRetype(true);
        }}
        className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm"
      />
    </div>

    {/* Retype Password (conditionally shown) */}
    {showRetype && (
      <div>
        <label htmlFor="confirmPassword" className="block text-sm text-gray-700 mb-1">
          Retype your password
        </label>
        <input
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm"
        />
      </div>
    )}

    {/* Submit Button */}
    <div className="flex justify-center w-[70%]">
      <Button shape="rectangle" size="small" type="submit" color='var(--purple-medium)'>
        Set my password
      </Button>
    </div>
  </div>
</form>
</div>
</section>
  );
}
