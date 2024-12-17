import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { PostInterface } from './posts.type'


export const postsApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    credentials: 'include',
    // prepareHeaders: headers => {
    //   headers.append('x-auth-skip', 'true')
    // },
  }),
  endpoints: builder => {
    return {
      createPost: builder.mutation({
        invalidatesTags: (_, __, { userId }) => [
          { id: userId, type: 'UserPosts' }, // Указываем тег пользователя
        ],
        query: postData => {
          return {
            body: postData, // Текстовые данные (title, text, tags)
            method: 'POST',
            url: '/post',
          }
        },
      }),
      // Добавляем удаление статьи
      deletePost: builder.mutation<void, { postId: string; userId: string }>({
        invalidatesTags: (_, __, { postId, userId }) => [
          { id: postId, type: 'Post' }, // Удаляем конкретный пост
          { id: userId, type: 'UserPosts' }, // Обновляем список постов пользователя
        ],
        query: ({ postId }) => ({
          method: 'DELETE',
          url: `/post/${postId}`,
        }),
      }),
      deletePostImage: builder.mutation<void, void>({
        invalidatesTags: ['Post'],
        query: () => ({
          method: 'DELETE',
          url: '/post/image',
        }),
      }),
      getPost: builder.query<PostInterface, string>({
        query: postId => `/post/${postId}`,
      }),
      getPostLike: builder.query<{ likedByUser: boolean; likesCount: number }, { postId: string }>({
        providesTags: (_, __, { postId }) => [{ id: postId, type: 'Post' }],
        query: ({ postId }) => ({
          params: { targetType: 'Post' },
          url: `/likes/${postId}`,
        }),
      }),
      getPosts: builder.query<PostInterface[], void>({
        // providesTags: (result, error, { userId }) =>
        //   result
        //     ? [
        //         ...result.map(post => ({ id: post._id, type: 'Post' as const })), // Указываем тип явно
        //         { id: userId, type: 'UserPosts' as const }, // Указываем тип явно
        //       ]
        //     : [{ id: userId, type: 'UserPosts' as const }],
        query: () => `/posts`,
      }),

      getPostsByTags: builder.query<PostInterface[], string[]>({
        query: tags => `/posts/search?tags=${tags.join(',')}`,
      }),
      togglePostLike: builder.mutation<void, { postId: string }>({
        invalidatesTags: (_, __, { postId }) => [{ id: postId, type: 'Post' }],
        query: ({ postId }) => ({
          body: { targetType: 'Post' },
          method: 'POST',
          url: `/like/${postId}`,
        }),
      }),
      // Добавляем редактирование статьи
      updatePost: builder.mutation<void, { data: Partial<PostInterface>; postId: string }>({
        invalidatesTags: (_, __, { postId }) => [{ id: postId, type: 'Post' }],
        query: ({ data, postId }) => ({
          body: data,
          method: 'PATCH',
          url: `/post/${postId}`,
        }),
      }),
      uploadImage: builder.mutation<{ url: string }, FormData>({
        query: formData => ({
          body: formData,
          method: 'POST',
          url: '/upload/image',
        }),
      }),
    }
  },
  reducerPath: 'postsApi',
  tagTypes: ['Post', 'UserPosts'],
})

export const {
  useCreatePostMutation,
  useDeletePostImageMutation,
  useDeletePostMutation,
  useGetPostLikeQuery,
  useGetPostQuery,
  useGetPostsByTagsQuery,
  useGetPostsQuery,
  useTogglePostLikeMutation,
  useUpdatePostMutation,
  useUploadImageMutation,
} = postsApi
