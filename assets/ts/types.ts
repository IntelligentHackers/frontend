// types.ts
export interface Response<T = any> {
    status: 'success' | 'error'
    message: string
    code?: number
    data: T
  }
  
  export interface LoginResult {
    _id: string
    token: string
  }