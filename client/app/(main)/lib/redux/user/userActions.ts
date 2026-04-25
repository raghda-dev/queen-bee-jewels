// client/app/(main)/lib/redux/user/userActions.ts

import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'sonner';
import { User, UserUpdatePayload } from './userTypes';
import { updateUser } from './userSlice';

// ───────────────────────
// GET USER PROFILE
// ───────────────────────

export const getUserProfile = createAsyncThunk<User, void, { rejectValue: string }>(
  'user/getUserProfile',
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/profile`, {
        credentials: 'include',
      });

      if (res.status === 401) {
        // Not logged in — silently return rejection (no toast)
        return rejectWithValue('Unauthorized');
      }

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Failed to fetch user.');
      }

      const data: User = await res.json();
      return data;

    } catch (err) {
      const message = (err as Error).message || 'Failed to fetch user.';

      // ✅ Only show toast for errors other than "Unauthorized"
      if (message !== 'Unauthorized') {
        toast(message, { className: 'toast-error' });
      }

      return rejectWithValue(message);
    }
  }
);


// ───────────────────────
// UPDATE USER PROFILE
// ───────────────────────
export const updateUserProfile = createAsyncThunk<
  User,
  UserUpdatePayload,
  { rejectValue: string }
>(
  'user/updateUserProfile',
  async (updatedData, { rejectWithValue, dispatch }) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/profile`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(updatedData),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Update failed.');
      }

      const updatedUser: User = await res.json();

      dispatch(updateUser(updatedUser));
      toast('Profile updated', { className: 'toast-success' });
      return updatedUser;
    } catch (err) {
      const message = (err as Error).message || 'Update failed.';
      toast(message, { className: 'toast-error' });
      return rejectWithValue(message);
    }
  }
);

// ───────────────────────
// REMOVE USER AVATAR
// ───────────────────────
export const removeUserAvatar = createAsyncThunk<User, void, { rejectValue: string }>(
  'user/removeUserAvatar',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/avatar`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Failed to remove avatar.');
      }

      const updatedUser: User = await res.json();

      dispatch(updateUser(updatedUser));
      toast('Avatar removed', { className: 'toast-error' });
      return updatedUser;
    } catch (err) {
      const message = (err as Error).message || 'Failed to remove avatar.';
      toast(message, { className: 'toast-error' });
      return rejectWithValue(message);
    }
  }
);


// ───────────────────────
// UPDATE USER INFO (Form 1)
// ───────────────────────
export const updateUserInfo = createAsyncThunk<
  User,
  { full_name?: string; email?: string; username?: string; address?: string },
  { rejectValue: string }
>(
  'user/updateUserInfo',
  async (info, { rejectWithValue, dispatch }) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/profile/info`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(info),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Failed to update info');
      }

      const updatedUser: User = await res.json();
      dispatch(updateUser(updatedUser));
      toast('Information updated', { className: 'toast-success' });
      return updatedUser;
    } catch (err) {
      const message = (err as Error).message || 'Failed to update info';
      toast(message, { className: 'toast-error' });
      return rejectWithValue(message);
    }
  }
);

// ───────────────────────
// UPDATE USER PASSWORD (Form 2)
// ───────────────────────


export const updateUserPassword = createAsyncThunk<
  void,
  { currentPassword: string; newPassword: string },
  { rejectValue: string }
>(
  'user/updateUserPassword',
  async ({ currentPassword, newPassword }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/profile/password`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Failed to update password');
      }

      // ✅ No toast here
      return;
    } catch (err) {
      const message = (err as Error).message || 'Failed to update password';
      return rejectWithValue(message);
    }
  }
);
