const minute = 1000 * 60

export class Auth {
  isAuthenticated = false
  accessToken?: string
  expiresIn?: number

  set(data: { accessToken: string; refreshToken: string }): void {
    const { accessToken } = data
    this.accessToken = accessToken
    this.expiresIn = Date.now() + minute * 15
    this.isAuthenticated = true
  }

  clear(): void {
    this.isAuthenticated = false
    this.accessToken = undefined
    this.expiresIn = undefined
  }
}
