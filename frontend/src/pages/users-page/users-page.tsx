import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { UserCard } from '@/forms/userCard'
import { useGetUsersQuery } from '@/services/users'

import s from './users-page.module.scss'

export function UsersListPage() {
  const { data: users, error, isLoading } = useGetUsersQuery()
  const [sortType, setSortType] = useState<'new' | 'old' | 'random'>('new') // По умолчанию: от новых к старым
  const [sortedUsers, setSortedUsers] = useState(users || []) // остояние для отсортированных пользователей

  useEffect(() => {
    if (!users) {
      return
    }
    const sorted = [...users]

    if (sortType === 'new') {
      sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    } else if (sortType === 'old') {
      sorted.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
    } else if (sortType === 'random') {
      for (let i = sorted.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))

        ;[sorted[i], sorted[j]] = [sorted[j], sorted[i]] // Fisher-Yates shuffle
      }
    }

    setSortedUsers(sorted)
  }, [users, sortType])

  const handleSort = (type: 'new' | 'old' | 'random') => {
    if (type === 'random') {
      setSortType('new') // Сбросить тип сортировки перед обновлением
      setTimeout(() => setSortType(type), 0) // Задержка для форсирования обновления
    } else {
      setSortType(type)
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {JSON.stringify(error)}</div>
  }

  return (
    <div className={s.mainContainer}>
      <div className={s.usersContainer}>
        {sortedUsers?.map(user => <UserCard key={user._id} user={user} />)}
      </div>
      <div className={s.rightContainer}>
        <div className={s.fixed}>
          <Button onClick={() => handleSort('new')}>новички</Button>
          <Button onClick={() => handleSort('old')}>давние</Button>
          <Button onClick={() => handleSort('random')}>рандомные</Button>
        </div>
      </div>
    </div>
  )
}
