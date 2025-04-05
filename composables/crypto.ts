// crypto.ts
export async function importPublicKey(pem: string): Promise<CryptoKey> {
    const binaryDerString = window.atob(pem.replace(/-----(BEGIN|END) PUBLIC KEY-----/g, '').replace(/\s+/g, ''))
    const binaryDer = str2ab(binaryDerString)
  
    return crypto.subtle.importKey(
      'spki',
      binaryDer,
      { name: 'RSA-OAEP', hash: 'SHA-256' },
      false,
      ['encrypt']
    )
  }
  
  export async function encryptData(publicKey: CryptoKey, data: string): Promise<ArrayBuffer> {
    const encoder = new TextEncoder()
    const encodedData = encoder.encode(data)
    return crypto.subtle.encrypt({ name: 'RSA-OAEP' }, publicKey, encodedData)
  }
  
  function str2ab(str: string): ArrayBuffer {
    const buf = new ArrayBuffer(str.length)
    const bufView = new Uint8Array(buf)
    for (let i = 0; i < str.length; i++) {
      bufView[i] = str.charCodeAt(i)
    }
    return buf
  }