import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { UserInterface } from '.'
import { UserPostsResponce } from '../posts'


export const usersApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    credentials: 'include',
  }),
  endpoints: builder => {
    return {
      getUser: builder.query<UserInterface, string>({
        query: userId => `/user/${userId}`,
      }),
      getUserLike: builder.query<{ likedByUser: boolean; likesCount: number }, { userId: string }>({
        providesTags: (_, __, { userId }) => [{ id: userId, type: 'User' }],
        query: ({ userId }) => ({
          params: { targetType: 'User' },
          url: `/likes/${userId}`,
        }),
      }),
      getUserPosts: builder.query<UserPostsResponce, string>({
        providesTags: (result, _, userId) => {
          if (Array.isArray(result)) {
            // Если результат — массив постов
            return [
              ...result.map(post => ({ id: post._id, type: 'Post' as const })), // Теги для каждого поста
              { id: userId, type: 'UserPosts' as const }, // Тег для списка постов пользователя
            ]
          }

          // Если результат — NoPostsResponse
          return [{ id: userId, type: 'UserPosts' as const }]
        },
        query: userId => `/user/${userId}/posts`,
      }),
      getUsers: builder.query<UserInterface[], void>({
        query: () => `/users`,
      }),
      toggleUserLike: builder.mutation<void, { userId: string }>({
        invalidatesTags: (_, __, { userId }) => [{ id: userId, type: 'User' }],
        query: ({ userId }) => ({
          body: { targetType: 'User' },
          method: 'POST',
          url: `/like/${userId}`,
        }),
      }),
    }
  },
  reducerPath: 'usersApi',
  tagTypes: ['User', 'Post', 'UserPosts'],
})

export const {
  useGetUserLikeQuery,
  useGetUserPostsQuery,
  useGetUserQuery,
  useGetUsersQuery,
  useToggleUserLikeMutation,
} = usersApi
