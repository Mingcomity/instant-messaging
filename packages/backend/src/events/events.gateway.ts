import {
  SubscribeMessage,
  WebSocketGateway,
  MessageBody,
  ConnectedSocket,
  WebSocketServer
} from '@nestjs/websockets'
import { Socket } from 'dgram'
import { Server } from 'net'
import { WsResponse } from '@nestjs/websockets'
@WebSocketGateway(4499, { cors: true })
export class EventsGateway {
  @WebSocketServer()
  server: any

  @SubscribeMessage('message')
  handleEvent(
    @MessageBody() data: string,
    @ConnectedSocket() client: any
  ): any {
    client.broadcast.emit('message', data)
  }
}
