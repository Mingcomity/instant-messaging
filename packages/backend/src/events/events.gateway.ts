import {
  SubscribeMessage,
  WebSocketGateway,
  MessageBody,
  ConnectedSocket,
  WebSocketServer
} from '@nestjs/websockets'
import { Socket } from 'net'
@WebSocketGateway(4499, { cors: true })
export class EventsGateway {
  @SubscribeMessage('events')
  handleEvent(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket
  ): string {
    return data
  }
}
