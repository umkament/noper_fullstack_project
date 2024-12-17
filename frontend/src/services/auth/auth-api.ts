import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { UserInterface } from '../users'
import { UserProfile, UserProfileResponse } from './auth.type'


export const authApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    credentials: 'include',
  }),
  endpoints: builder => {
    return {
      authMe: builder.query<UserInterface | null, void>({
        extraOptions: {
          maxRetries: 0,
        },
        providesTags: ['Me'],
        query: () => `/auth/me`,
      }),
      checkAuthStatus: builder.query<{ authenticated: boolean }, void>({
        query: () => '/auth/status',
      }),
      deleteAvatar: builder.mutation<void, void>({
        invalidatesTags: ['Me'],
        query: () => ({
          method: 'DELETE',
          url: '/auth/avatar',
        }),
      }),
      loginUser: builder.mutation<UserInterface, Partial<UserInterface>>({
        invalidatesTags: ['Me'],
        query: credentials => ({
          body: credentials,
          method: 'POST',
          url: '/auth/login',
        }),
      }),
      logoutUser: builder.mutation<void, void>({
        invalidatesTags: ['Me'],
        async onQueryStarted(_, { dispatch, queryFulfilled }) {
          const patchResult = dispatch(
            authApi.util.updateQueryData('authMe', undefined, () => {
              return null
            })
          )

          try {
            await queryFulfilled
          } catch {
            patchResult.undo()
          }
        },
        query: () => ({
          method: 'POST',
          url: '/auth/logout',
        }),
      }),
      registerUser: builder.mutation<UserInterface, Partial<UserInterface>>({
        invalidatesTags: ['Me'],
        query: newUser => ({
          body: newUser,
          method: 'POST',
          url: '/auth/register',
        }),
      }),
      updateUserProfile: builder.mutation<UserProfileResponse, UserProfile>({
        invalidatesTags: ['Me'],
        async onQueryStarted(profileData, { dispatch, queryFulfilled }) {
          const patchResult = dispatch(
            authApi.util.updateQueryData('authMe', undefined, draft => {
              if (draft) {
                Object.assign(draft, profileData)
              }
            })
          )

          try {
            await queryFulfilled
          } catch {
            patchResult.undo()
          }
        },

        query: profileDate => ({
          body: profileDate,
          method: 'PUT',
          url: '/edit/profile',
        }),
      }),
      uploadAvatar: builder.mutation<{ url: string }, FormData>({
        query: formData => ({
          body: formData,
          method: 'POST',
          url: '/upload',
        }),
      }),
    }
  },
  reducerPath: 'authApi',
  tagTypes: ['Me'],
})

export const {
  useAuthMeQuery,
  useCheckAuthStatusQuery,
  useDeleteAvatarMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useRegisterUserMutation,
  useUpdateUserProfileMutation,
  useUploadAvatarMutation,
} = authApi
