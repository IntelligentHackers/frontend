// utils.ts
export function byteArrayToHex(buffer: Uint8Array): string {
    return Array.from(buffer)
      .map(byte => byte.toString(16).padStart(2, '0'))
      .join('')
  }