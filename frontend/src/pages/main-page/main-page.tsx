import React, { useState } from 'react'

import { Input } from '@/components/ui/input'
import { UserPostCard } from '@/forms/userPostCard'
import { useGetPostsByTagsQuery, useGetPostsQuery } from '@/services/posts/posts-api'

import s from './main-page.module.scss'

export const MainPage: React.FC = () => {
  const [tags, setTags] = useState<string[]>([])

  // Получение всех постов
  const { data: allPosts, error: allPostsError, isLoading: allPostsLoading } = useGetPostsQuery()

  // Получение постов по тегам
  const {
    data: filteredPosts,
    error: filteredPostsError,
    isLoading: filteredPostsLoading,
  } = useGetPostsByTagsQuery(tags, {
    skip: tags.length === 0, // Пропускаем запрос, если нет тегов
  })

  // Выбираем, какие посты показывать
  const postsToShow = tags.length === 0 ? allPosts : filteredPosts

  const isLoading = tags.length === 0 ? allPostsLoading : filteredPostsLoading
  const error = tags.length === 0 ? allPostsError : filteredPostsError

  // Обработчик изменения инпута
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputTags = e.target.value
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag) // Убираем пустые значения

    setTags(inputTags)
  }

  return (
    <div className={s.container}>
      {/* Поле ввода для тегов */}
      <div className={s.searchContainer}>
        <Input
          className={s.input}
          onChange={handleInputChange}
          placeholder={'Введите теги через запятую'}
          type={'text'}
        />
      </div>

      {/* Лоадер */}
      {isLoading && <div>Загрузка...</div>}

      {/* Ошибка */}
      {error && <div>Ошибка: {JSON.stringify(error)}</div>}

      {/* Отображение постов */}
      {postsToShow && postsToShow.length > 0 ? (
        postsToShow.map(post => <UserPostCard key={post._id} post={post} />)
      ) : (
        <div>Совпадений не найдено</div>
      )}
    </div>
  )
}
