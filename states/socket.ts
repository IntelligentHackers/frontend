// stores/socket.ts
import { defineStore } from 'pinia'
import { io, Socket } from 'socket.io-client'

let socket: Socket

export const useSocketStore = defineStore('socket', {
  state: () => ({
    isConnected: false,
    socket: null as Socket | null,
  }),

  actions: {
    connect() {
      if (!socket) {
        socket = io('wss://gensyncapi.7086cmd.me', {
          path: '/socket.io/',
          transports: ['websocket'], // 强制使用 WebSocket，如果不确定可以删掉这行
          auth: {
            token: localStorage.getItem('token')
          }
        })

        socket.on('connect', () => {
          this.isConnected = true
          console.log('Socket connected')
        })

        socket.on('disconnect', () => {
          this.isConnected = false
          console.log('Socket disconnected')
        })

        this.socket = socket
      }
    },

    send(event: string, data: any) {
      if (this.socket?.connected) {
        this.socket.emit(event, data)
      }
    },

    listen(event: string, callback: (...args: any[]) => void) {
      this.socket?.on(event, callback)
    }
  },
})