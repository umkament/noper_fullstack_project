import React from 'react'

import { useGetSavedQuery, useToggleSavedMutation } from '@/services/saved'
import { CiBookmarkPlus } from 'react-icons/ci'
import { GiBinoculars } from 'react-icons/gi'

import s from './saveButton.module.scss'

import { Button } from '../button'

interface SaveButtonProps {
  itemId: string
  type: 'post' | 'user'
}

export const SaveButton: React.FC<SaveButtonProps> = ({ itemId, type }) => {
  const { data: savedItems, error, isLoading, refetch } = useGetSavedQuery()
  const [toggleSaved, { isLoading: isToggling }] = useToggleSavedMutation()

  if (isLoading) {
    console.log('Loading saved items...')
  }

  if (error) {
    console.error('Error fetching saved items:', error)
  }

  console.log('Saved items:', savedItems)

  const isSaved = savedItems?.some(item => item.type === type && item.itemId === itemId)

  const handleClick = async () => {
    try {
      await toggleSaved({ itemId, type }).unwrap()
      refetch() // Обновляем данные
    } catch (err) {
      console.error('Ошибка при сохранении:', err)
    }
  }

  return (
    <Button className={s.saved} disabled={isLoading || isToggling} onClick={handleClick}>
      {isSaved ? <GiBinoculars size={22} /> : <CiBookmarkPlus size={22} />}
    </Button>
  )
}
