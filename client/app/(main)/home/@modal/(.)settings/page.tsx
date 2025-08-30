//client/app/(main)/home/@modal/(.)settings/page.tsx

'use client';

import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../lib/redux/hooks';
import {
  selectUser,
  selectUserLoading,
  updateUser,
} from '../../../lib/redux/user/userSlice';

import {
  updateUserInfo,
  updateUserPassword,
  removeUserAvatar,
} from '../../../lib/redux/user/userActions';

import AvatarModal from '../../../components/modals/avatarModal/AvatarModal';
import UserHeader from './components/UserHeader';
import Button from '../../../components/Button';
import { toast } from 'sonner';
import { Eye, EyeOff } from 'lucide-react';

export default function AccountSettings() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const isLoading = useAppSelector(selectUserLoading);

  const [avatarAction, setAvatarAction] = useState<
    'edit' | 'add' | 'remove' | null
  >(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    full_name: user?.full_name || '',
    email: user?.email || '',
    username: user?.username || '',
    address: user?.address || '',
  });

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showPasswordFields, setShowPasswordFields] = useState(false);

  useEffect(() => {
    setShowPasswordFields(newPassword.trim().length > 0);
  }, [newPassword]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setSelectedImage(file);
  };

  const handleAvatarConfirm = async () => {
    if (!selectedImage) return;

    const formData = new FormData();
    formData.append('avatar', selectedImage);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/avatar`,
        {
          method: 'PATCH',
          body: formData,
          credentials: 'include',
        }
      );

      if (!res.ok) throw new Error('Upload failed');

      const data = await res.json();
      dispatch(updateUser({ avatar: data.avatar }));
      toast('Avatar updated', { className: 'toast-success' });
    } catch (error) {
      toast((error as Error).message || 'Failed to upload avatar', {
        className: 'toast-error',
      });
    } finally {
      setAvatarAction(null);
      setSelectedImage(null);
    }
  };

  const handleRemoveAvatar = async () => {
    try {
      await dispatch(removeUserAvatar()).unwrap();
      setAvatarAction(null);
    } catch (error) {
      toast((error as Error).message || 'Failed to remove avatar', {
        className: 'toast-error',
      });
    }
  };

  const handleInfoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleInfoSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(updateUserInfo(formData)).unwrap();
    } catch (err) {
      console.error(err);
    }
  };

  const handlePasswordSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword || !currentPassword) {
      toast('Please fill in all password fields.', {
        className: 'toast-error',
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast('Passwords do not match', { className: 'toast-error' });
      return;
    }

    try {
      await dispatch(
        updateUserPassword({ currentPassword, newPassword })
      ).unwrap();
      toast('Password updated successfully', { className: 'toast-success' });
      setNewPassword('');
      setConfirmPassword('');
      setCurrentPassword('');
    } catch (err) {
      toast((err as Error).message || 'Password update failed', {
        className: 'toast-error',
      });
    }
  };

  if (isLoading || !user) {
    return (
      <div className="border p-6 text-center text-gray-500">
        Loading user profile...
      </div>
    );
  }

  return (
    <div className="mt-[-1rem] grid max-h-[100%] w-[90%] grid-cols-1 p-4 pb-6 transition-all xs:w-[90%] sm:w-[80%] md:w-[90%]">
      <UserHeader
        user={user}
        onAvatarAction={(action) => {
          if (action === 'remove') {
            handleRemoveAvatar();
          } else {
            setAvatarAction(action);
          }
        }}
      />

      {avatarAction && (
        <AvatarModal
          type={avatarAction}
          imageUrl={user.avatar}
          onFileChange={handleFileChange}
          onConfirm={handleAvatarConfirm}
          onCancel={() => {
            setAvatarAction(null);
            setSelectedImage(null);
          }}
        />
      )}

      {/* Info Form */}
      <form
        onSubmit={handleInfoSubmit}
        className="grid w-[80%] gap-x-6 gap-y-3 px-4 py-2 md:w-full md:grid-cols-2"
      >
        {/* ... Name, Email, etc. inputs ... */}

        <div>
          <label
            htmlFor="full_name"
            className="sm:text-md block text-sm font-semibold text-grayDark md:text-lg lg:text-xl"
          >
            Name
          </label>
          <input
            id="full_name"
            type="text"
            value={formData.full_name}
            onChange={handleInfoChange}
            className="sm:text-md w-[90%] rounded-md border border-gray-300 px-4 py-2 text-sm md:text-lg lg:text-xl"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="sm:text-md block text-sm font-semibold text-grayDark md:text-lg lg:text-xl"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={handleInfoChange}
            className="sm:text-md w-[90%] rounded-md border border-gray-300 px-4 py-2 text-sm md:text-lg lg:text-xl"
          />
        </div>

        <div>
          <label
            htmlFor="username"
            className="sm:text-md block text-sm font-semibold text-grayDark md:text-lg lg:text-xl"
          >
            Username
          </label>
          <input
            id="username"
            type="text"
            value={formData.username}
            onChange={handleInfoChange}
            className="sm:text-md w-[90%] rounded-md border border-gray-300 px-4 py-2 text-sm md:text-lg lg:text-xl"
          />
        </div>

        <div>
          <label
            htmlFor="address"
            className="sm:text-md block text-sm font-semibold text-grayDark md:text-lg lg:text-xl"
          >
            Address
          </label>
          <input
            id="address"
            type="text"
            placeholder="123 Street, Ramallah"
            value={formData.address}
            onChange={handleInfoChange}
            className="sm:text-md w-[90%] rounded-md border border-gray-300 px-4 py-2 text-sm md:text-lg lg:text-xl"
          />
        </div>

        {/* <div className="flex w-[70%] justify-center">
          <Button shape="rectangle" size="medium" type="submit" color="var(--purple-medium)">
            Update my information
          </Button>
        </div> */}
        <div className="flex w-[70%] justify-center">
          <Button
            shape="rectangle"
            size="medium"
            type="submit"
            color="var(--purple-medium)"
          >
            {/* Mobile text */}
            <span className="sm:hidden">Update</span>
            {/* Tablet+ text */}
            <span className="hidden sm:inline">Update my information</span>
          </Button>
        </div>
      </form>

      {/* Password Form */}
      <form
        onSubmit={handlePasswordSubmit}
        className="w-[80%] max-w-3xl px-4 pb-10 md:max-w-2xl"
      >
        <div className="flex flex-col gap-6">
          <div>
            <label
              htmlFor="newPassword"
              className="sm:text-md mb-1 block text-sm font-semibold text-grayDark md:text-lg lg:text-xl"
            >
              New Password
            </label>
            <div className="relative w-[90%]">
              <input
                id="newPassword"
                type={showNewPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="sm:text-md w-full rounded-md border border-gray-300 px-4 py-2 text-sm md:text-lg lg:text-xl"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                onClick={() => setShowNewPassword((prev) => !prev)}
              >
                {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {showPasswordFields && (
            <div className="flex w-[126%] flex-row justify-between gap-4">
              <div className="flex-1">
                <label
                  htmlFor="confirmPassword"
                  className="sm:text-md mb-1 block text-sm font-semibold text-grayDark md:text-lg lg:text-xl"
                >
                  Confirm Password
                </label>
                <div className="relative w-[70%] sm:w-[90%]">
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="sm:text-md w-full rounded-md border border-gray-300 px-4 py-2 text-sm md:text-lg lg:text-xl"
                  />
                  <button
                    type="button"
                    className="absolute right-[-6%] top-1/2 -translate-y-1/2 text-gray-500"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={16} />
                    ) : (
                      <Eye size={16} />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex-1">
                <label
                  htmlFor="currentPassword"
                  className="sm:text-md mb-1 block text-sm font-semibold text-grayDark md:text-lg lg:text-xl"
                >
                  Current Password
                </label>
                <div className="relative w-[70%] sm:w-[90%]">
                  <input
                    id="currentPassword"
                    type={showCurrentPassword ? 'text' : 'password'}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="sm:text-md w-full rounded-md border border-gray-300 px-4 py-2 text-sm md:text-lg lg:text-xl"
                  />
                  <button
                    type="button"
                    className="absolute right-[-6%] top-1/2 -translate-y-1/2 text-gray-500"
                    onClick={() => setShowCurrentPassword((prev) => !prev)}
                  >
                    {showCurrentPassword ? (
                      <EyeOff size={16} />
                    ) : (
                      <Eye size={16} />
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="flex w-[70%] justify-center">
            <Button
              shape="rectangle"
              size="medium"
              type="submit"
              color="var(--purple-medium)"
            >
              Set my password
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
