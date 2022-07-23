export interface User{
  username: string
  password: string
  email: string
  id: string
}

export interface UserToken{
  user: User
  token: string
}
