import { Auth } from './Auth'
import Axios, { AxiosResponse, AxiosRequestConfig } from 'axios'

const minute = 1000 * 60
const APIURL = 'http://localhost:5500/api/v1'

export interface APIError {
  code: number
  source: string
  cause: 'short' | 'long' | 'forbidden' | 'missing' | 'invalid' | 'incorrect'
  expected: number
}

export class API {
  private auth: Auth

  constructor() {
    this.auth = new Auth()
  }

  get isAuthenticated(): boolean {
    return this.auth.isAuthenticated
  }

  async login(email: string, password: string): Promise<any> {
    try {
      const res = await Axios.post(`${APIURL}/login`, { email, password }, { withCredentials: true })
      this.auth.set(res.data)
      return res.data
    } catch (err) {
      throw err
    }
  }

  async register(email: string, username: string, password: string): Promise<any> {
    try {
      const res = await Axios.post(`${APIURL}/register`, { email, username, password }, { withCredentials: true })
      this.auth.set(res.data)
      return res.data
    } catch (err) {
      throw err
    }
  }

  async refresh(): Promise<boolean> {
    try {
      const res = await Axios.post(`${APIURL}/refresh`, null, { withCredentials: true })
      this.auth.set(res.data)
      return true
    } catch (err) {
      console.log(err)
      return false
    }
  }

  async logout(): Promise<any> {
    this.auth.clear()
    console.log(this.auth)
    Axios.delete(`${APIURL}/logout`, { withCredentials: true })
  }

  async ensureCredentials(): Promise<boolean> {
    if (this.auth.expiresIn === undefined || !this.auth.isAuthenticated) return false

    if (this.auth.expiresIn + minute > Date.now() && this.auth.isAuthenticated) return true
    else if (this.auth.isAuthenticated) {
      return await this.refresh()
    } else return false
  }

  async get(path: string): Promise<AxiosResponse<any>> {
    await this.ensureCredentials()
    const config: AxiosRequestConfig = {
      headers: {
        authorization: `Bearer ${this.auth.accessToken}`,
      },
    }
    return await Axios.get(`${APIURL}/${path}`, config)
  }

  async post(path: string, payload: any): Promise<AxiosResponse<any>> {
    await this.ensureCredentials()
    const config: AxiosRequestConfig = {
      headers: {
        authorization: `Bearer ${this.auth.accessToken}`,
      },
    }
    return await Axios.post(`${APIURL}/${path}`, payload, config)
  }

  async patch(path: string, payload: any): Promise<AxiosResponse<any>> {
    await this.ensureCredentials()
    const config: AxiosRequestConfig = {
      headers: {
        authorization: `Bearer ${this.auth.accessToken}`,
      },
    }
    return await Axios.patch(`${APIURL}/${path}`, payload, config)
  }

  async delete(path: string): Promise<AxiosResponse<any>> {
    await this.ensureCredentials()
    const config: AxiosRequestConfig = {
      headers: {
        authorization: `Bearer ${this.auth.accessToken}`,
      },
    }
    return await Axios.delete(`${APIURL}/${path}`, config)
  }
}

const api = new API()

export function useAPI(): API {
  return api
}
