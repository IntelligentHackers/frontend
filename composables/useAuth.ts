// composables/useAuth.ts
import axios from 'axios'
import type { Response, LoginResult } from '@/assets/ts/types'
import { ElNotification } from 'element-plus'
import { byteArrayToHex } from '@/composables/utils'
import { encryptData, importPublicKey } from '@/composables/crypto'

const baseurl = 'https://gensyncapi.7086cmd.me/api'

export async function getRSAPublicCert(): Promise<string> {
  const result = (await axios(baseurl+'/cert', {
    method: 'GET',
    params: { type: 'public', method: 'RSA' }
  })).data as Response<string>
  if (result.status === 'error') {
    ElNotification({ title: '获取公钥失败', message: result.message, type: 'error' })
    return ''
  }
  return result.data
}

async function UserLogin(user: string, password: string) {
  const payload = JSON.stringify({ password, time: Date.now() })
  const publicKey = await importPublicKey(await getRSAPublicCert())
  const credential = await encryptData(publicKey, payload)
  const hex = byteArrayToHex(new Uint8Array(credential))
  const result = (await axios(baseurl+'/users', {
    method: 'POST',
    data: { email: user, credential: hex }
  })) as Response<LoginResult>
  if (result.status === 'error') {
    ElNotification({ title: '登录失败', message: result.message, type: 'error' })
    return
  }
  localStorage.setItem('token', result.data.token)
  localStorage.setItem('_id', result.data._id)
  return result.data
}

export { UserLogin as useLongTermAuth }