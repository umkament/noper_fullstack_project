import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { CommentInterface, CreateCommentDto } from './comment.type'


export const commentApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    credentials: 'include',
  }),
  endpoints: builder => {
    return {
      createComment: builder.mutation<CommentInterface, CreateCommentDto>({
        query: ({ postId, text }) => ({
          body: { postId, text },
          method: 'POST',
          url: '/comment',
        }),
      }),
      deleteComment: builder.mutation<void, string>({
        query: commentId => ({
          method: 'DELETE',
          url: `/comment/${commentId}`,
        }),
      }),
      getAllCommentLikes: builder.query<
        Record<string, { likedByUser: boolean; likesCount: number }>,
        { targetIds: string[]|undefined; targetType: string }
      >({
        providesTags: (_, __, { targetIds }) =>
          targetIds
            ? targetIds.map(id => ({ id, type: 'CommentLikes' }))
            : [],
        query: ({ targetIds, targetType }) => ({
          body: { targetIds },
          method: 'POST',
          params: { targetType },
          url: `/likes/bulk`,
        }),
      }),
      getCommentLike: builder.query<
        { likedByUser: boolean; likesCount: number },
        { commentId: string }
      >({
        providesTags: (_, __, { commentId }) => [{ id: commentId, type: 'CommentLikes' }],
        query: ({ commentId }) => ({
          params: { targetType: 'Comment' },
          url: `/likes/${commentId}`,
        }),
      }),

      getCommentsByPost: builder.query<CommentInterface[], string>({
        query: postId => `/comments/${postId}`,
      }),
      toggleCommentLike: builder.mutation<void, { commentId: string }>({
        invalidatesTags: (_, __, { commentId }) => [
          { id: commentId, type: 'CommentLikes' },
        ],
        query: ({ commentId }) => ({
          body: { targetType: 'Comment' },
          method: 'POST',
          url: `/like/${commentId}`,
        }),
      }),
    }
  },
  reducerPath: 'commentApi',
  tagTypes: ['Comment', 'CommentLikes'],
})

export const {
  useCreateCommentMutation,
  useDeleteCommentMutation,
  useGetAllCommentLikesQuery,
  useGetCommentLikeQuery,
  useGetCommentsByPostQuery,
  useToggleCommentLikeMutation,
} = commentApi
