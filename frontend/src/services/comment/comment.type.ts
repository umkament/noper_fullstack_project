export interface CommentInterface {
  _id: string
  createdAt: string
  likes: number
  post: string
  text: string
  updatedAt: string
  user: {
    _id: string
    avatarUrl: string
    username: string
  }
}
// Тип для запроса на создание комментария
export interface CreateCommentDto {
  postId: string
  text: string
}

// Тип для ответа на получение всех комментариев
export interface GetCommentsByPostResponse {
  comments: CommentInterface[]
}

// Тип для удаления комментария
export interface DeleteCommentResponse {
  message: string
}
