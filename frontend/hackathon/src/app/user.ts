export interface User{
  username: string
  password: string
  email: string
  id: string
  role: number
}

export interface UserToken{
  user: User
  token: string
}

export interface Koordinate{
  lat: number,
  lng: number
}
