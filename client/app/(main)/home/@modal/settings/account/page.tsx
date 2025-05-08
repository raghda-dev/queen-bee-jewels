'use client';

// import Image from 'next/image';
import { useState, useEffect } from 'react';
import Button from '../../../../components/Button';
import UserHeader from '../components/UserHeader';
// import { Trash, PlusCircle, Pen } from 'lucide-react';
import AvatarModal from 'app/(main)/components/modals/avatarModal/AvatarModal';



export default function AccountPage() {
  const [newPassword, setNewPassword] = useState('');
  const [showRetype, setShowRetype] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [avatarAction, setAvatarAction] = useState<'edit' | 'remove' | 'add' | null>(null);

  const name = 'Raghda Mazhar';
  const username = '@raghda-dev';

  const handlePrimary = () => {
    console.log(`${avatarAction} photo confirmed`);
    setAvatarAction(null);
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <section className="flex flex-col items-center justify-start max-h-[87vh]">
      
      {/* User Header with avatar + actions */}
      <div className='w-full'>
        <UserHeader
          onEdit={() => setAvatarAction('edit')}
          onRemove={() => setAvatarAction('remove')}
          onAdd={() => setAvatarAction('add')}
        />
      </div>

      {/* Forms */}
      <div className='grid grid-cols-1 max-h-[50%] w-full xs:w-[90%] sm:w-[80%] md:w-[90%] transition-all p-0 mt-[-1rem]'>

        {/* Account Info Form */}
        <form className="w-[80%] md:w-full px-4 py-10 grid md:grid-cols-2 gap-x-6 gap-y-5">
          <div>
            <label htmlFor="name" className="block text-sm sm:text-md md:text-lg lg:text-xl font-semibold text-grayDark">
              Name
            </label>
            <input
              id="name"
              type="text"
              defaultValue={name}
              className="w-[90%] border border-gray-300 rounded-md px-4 py-2 text-sm sm:text-md md:text-lg lg:text-xl"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm sm:text-md md:text-lg lg:text-xl font-semibold text-grayDark">
              Email
            </label>
            <input
              id="email"
              type="email"
              defaultValue="raghda@example.com"
              className="w-[90%] border border-gray-300 rounded-md px-4 py-2 text-sm sm:text-md md:text-lg lg:text-xl"
            />
          </div>
          <div>
            <label htmlFor="username" className="block text-sm sm:text-md md:text-lg lg:text-xl font-semibold text-grayDark">
              Username
            </label>
            <input
              id="username"
              type="text"
              defaultValue={username}
              className="w-[90%] border border-gray-300 rounded-md px-4 py-2 text-sm sm:text-md md:text-lg lg:text-xl"
            />
          </div>
          <div>
            <label htmlFor="address" className="block text-sm sm:text-md md:text-lg lg:text-xl font-semibold text-grayDark">
              Address
            </label>
            <input
              id="address"
              type="text"
              placeholder="123 Street, Ramallah"
              className="w-[90%] border border-gray-300 rounded-md px-4 py-2 text-sm sm:text-md md:text-lg lg:text-xl"
            />
          </div>
          <div className="flex justify-center w-[70%]">
            <Button shape="rectangle" size="medium" type="submit" color='var(--purple-medium)'>
              Update my information
            </Button>
          </div>
        </form>

        {/* Password Form */}
        <form
          onSubmit={(e) => e.preventDefault()}
          className="w-[80%] max-w-3xl md:max-w-2xl px-4 pb-10 space-y-6"
        >
          <div className="flex flex-col gap-6">
            <div>
              <label htmlFor="newPassword" className="block text-sm sm:text-md md:text-lg lg:text-xl text-grayDark font-semibold mb-1">
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
                className="w-[90%] border border-gray-300 rounded-md px-4 py-2 text-sm sm:text-md md:text-lg lg:text-xl"
              />
            </div>

            {showRetype && (
              <div>
                <label htmlFor="confirmPassword" className="block text-sm sm:text-md md:text-lg lg:text-xl text-grayDark font-semibold mb-1">
                  Retype your password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-[90%] border border-gray-300 rounded-md px-4 py-2 text-sm sm:text-md md:text-lg lg:text-xl"
                />
              </div>
            )}

            <div className="flex justify-center w-[70%]">
              <Button shape="rectangle" size="medium" type="submit" color='var(--purple-medium)'>
                Set my password
              </Button>
            </div>
          </div>
        </form>
      </div>

      {/* Modal */}
      {avatarAction && (
        <AvatarModal
          type={avatarAction}
          onConfirm={handlePrimary}
          onCancel={() => setAvatarAction(null)}
        />
      )}
    </section>
  );
}
