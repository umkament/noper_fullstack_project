import { UserInterface } from '../users'

export interface PostInterface {
  _id: string
  createdAt: Date
  imageUrl?: string
  likes: number
  tags?: string[]
  text: string
  title: string
  updatedAt: Date
  user: UserInterface
  viewsCount: number
}

export interface NoPostsResponce {
  message: string
  posts: []
}

export type UserPostsResponce = NoPostsResponce | PostInterface[]

// export type UserPostsResponce = PostInterface[]
