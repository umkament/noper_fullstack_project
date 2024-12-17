import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { Saved, ToggleSavedRequest } from './saved.type'


export const savedApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL, credentials: 'include' }),
  endpoints: builder => ({
    // Типизация getSaved: возвращаемый массив объектов типа Saved
    getSaved: builder.query<Saved[], void>({
      providesTags: ['Saved'],
      query: () => 'saved',
    }),
    // Типизация toggleSaved: принимает ToggleSavedRequest и возвращает обновленный объект Saved
    toggleSaved: builder.mutation<Saved, ToggleSavedRequest>({
      invalidatesTags: ['Saved'],
      query: ({ itemId, type }) => ({
        body: { itemId, type },
        method: 'POST',
        url: `saved/toggle`,
      }),
    }),
  }),
  reducerPath: 'savedApi',
  tagTypes: ['Saved'],
})

export const { useGetSavedQuery, useToggleSavedMutation } = savedApi
