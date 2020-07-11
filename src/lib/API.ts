import { Auth } from './Auth'
import Axios from 'axios'

export class API {
  private auth: Auth

  constructor() {
    this.auth = new Auth()
  }

  async login(email: string, password: string): Promise<any> {
    try {
      const res = await Axios.post('http://localhost:5500/api/v1/login', { email, password }, { withCredentials: true })
      this.auth.set(res.data)
      return res.data
    } catch (err) {
      console.log(err)
      return err
    }
  }

  async refresh(): Promise<boolean> {
    try {
      const res = await Axios.post('http://localhost:5500/api/v1/refresh', null, { withCredentials: true })
      this.auth.set(res.data)
      return true
    } catch (err) {
      console.log(err)
      return false
    }
  }
}
