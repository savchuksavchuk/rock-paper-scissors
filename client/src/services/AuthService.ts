import { AxiosResponse } from 'axios'
import { $api } from '../api/axios'
import { AuthResponseType } from '../types/auth'

export class AuthService {
  static registration = async (
    username: string,
    email: string,
    password: string
  ): Promise<AxiosResponse<AuthResponseType>> => {
    return $api.post('/user/registration', {
      username,
      email,
      password,
    })
  }

  static login = async (
    email: string,
    password: string
  ): Promise<AxiosResponse<AuthResponseType>> => {
    return $api.post('/user/login', {
      email,
      password,
    })
  }
}
