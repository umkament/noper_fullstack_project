export interface UserProfile {
  avatarUrl?: string
  description?: string
  email?: string
  link?: string
  name?: string
  password?: string
  surname?: string
  typeOfSport?: string
  username?: string
}

export interface UserProfileResponse {
  message: string
  user: UserProfile
}
