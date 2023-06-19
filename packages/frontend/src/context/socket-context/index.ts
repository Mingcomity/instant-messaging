import React from 'react'
import { Socket } from 'socket.io-client'
// 1.创建一个Context
const SocketContext = React.createContext<Socket | null>(null)
export default SocketContext
