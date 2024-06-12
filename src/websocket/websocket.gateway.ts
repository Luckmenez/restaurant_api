import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  MessageBody,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: '*' })
export class WebsocketGateway implements OnGatewayInit {
  @WebSocketServer()
  server: Server;

  afterInit(server: Server) {
    // console.log(server, 'Initialized!');
  }

  @SubscribeMessage('message')
  handleMessage(@MessageBody() payload: any) {
    console.log('payload', payload);
  }

  @SubscribeMessage('newMessage')
  onNewMessage(@MessageBody() payload: any) {
    return 'teste';
  }
}
