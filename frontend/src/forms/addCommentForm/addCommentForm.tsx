import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { TextArea } from '@/components/ui/textarea'
import { CommentInterface, useCreateCommentMutation } from '@/services/comment'

import s from './addCommentForm.module.scss'

// Импортируем API
type AddCommentFormType = {
  //onAddComment: (newComment: CommentInterface) => void
  onAddComment: (newComment: CommentInterface) => void

  postId?: string | undefined
}

export const AddCommentForm: React.FC<AddCommentFormType> = ({ onAddComment, postId }) => {
  const navigate = useNavigate()
  const [text, setText] = useState<string>('')
  const [createComment] = useCreateCommentMutation()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!postId) {
      console.error('postId отсутствует')

      return
    }

    try {
      const newComment = await createComment({ postId, text }).unwrap()

      console.log('Created Comment:', newComment)
      setText('')
      onAddComment(newComment)
    } catch (error: any) {
      console.error('Ошибка при добавлении комментария', error)
      // Обработка ошибки
      if (error.status === 403) {
        navigate('/auth/login')
      }
    }
  }

  return (
    <form className={s.styletoform} onSubmit={handleSubmit}>
      <TextArea
        onChange={e => setText(e.target.value)}
        placeholder={'оставь комментарий'}
        required
        value={text}
      />
      <Button type={'submit'}>Отправить</Button>
    </form>
  )
}
