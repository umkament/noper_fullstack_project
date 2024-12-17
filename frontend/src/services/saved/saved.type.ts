// saved.type.ts
export interface Saved {
  id: string // ID пользователя или поста
  itemId: string // ID поста или пользователя
  type: 'post' | 'user' // Тип объекта (пост или пользователь)
}

export interface ToggleSavedRequest {
  itemId: string
  type: 'post' | 'user'
}
