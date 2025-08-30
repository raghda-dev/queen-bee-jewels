// client/app/(main)/lib/redux/user/userSlice.ts

// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { User, UserState } from './userTypes';
// import { getUserProfile, removeUserAvatar } from './userActions';
// import { RootState } from '../store';

// const initialState: UserState = {
//   user: null,
//   loading: false,
//   error: null,
// };

// const userSlice = createSlice({
//   name: 'user',
//   initialState,
//   reducers: {
//     updateUser: (state, action: PayloadAction<Partial<User>>) => {
//       if (state.user) {
//         state.user = { ...state.user, ...action.payload };
//       }
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(getUserProfile.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(getUserProfile.fulfilled, (state, action: PayloadAction<User>) => {
//         state.loading = false;
//         state.user = action.payload;
//       })
//       .addCase(getUserProfile.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//         state.user = null;
//       })
//       .addCase(removeUserAvatar.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(removeUserAvatar.fulfilled, (state) => {
//         state.loading = false;
//       })
//       .addCase(removeUserAvatar.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       });
//   },
// });

// // ✅ Add selectors
// export const selectUser = (state: RootState) => state.user.user;
// export const selectUserLoading = (state: RootState) => state.user.loading;

// export const { updateUser } = userSlice.actions;
// export default userSlice.reducer;








// client/app/(main)/lib/redux/user/userSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, UserState } from './userTypes';
import { getUserProfile, removeUserAvatar } from './userActions';
import { RootState } from '../store';


const initialState: UserState = {
  user: null,
  token: null,
  isLoggedIn: false,
  loading: false,
  error: null,
};


const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Update user partially
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    // Set user and clear errors on login success
    loginSuccess: (state, action: PayloadAction<{ user: User | null; token: string }>) => {
      state.user = action.payload.user;
      state.error = null;
      // Note: token can be stored in localStorage only, no need to keep in state unless you want
    },
    // Clear user and errors on logout
    logout: (state) => {
      state.user = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserProfile.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.user = null;
      })
      .addCase(removeUserAvatar.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeUserAvatar.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(removeUserAvatar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Selectors
export const selectUser = (state: RootState) => state.user.user;
export const selectUserLoading = (state: RootState) => state.user.loading;
export const selectUserError = (state: RootState) => state.user.error;

export const { updateUser, loginSuccess, logout } = userSlice.actions;
export default userSlice.reducer;

