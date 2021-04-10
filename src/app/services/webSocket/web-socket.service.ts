import { Injectable } from '@angular/core';
import * as io from 'socket.io-client'
import { Observable } from 'rxjs'
import { AuthService } from '../../components/auth/services/auth/auth.service';
@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  socket:any;
  server = 'http://localhost:5000';

  constructor(authService: AuthService) {
    this.socket = io(this.server, {
      path: '/socket.io',
      query: {
        authorization: authService.getAccessToken(),
      },
    })
  }

  listen(eventName:string) {
    return new Observable((Subscriber) =>{
      this.socket.on(eventName, (data) => {
        Subscriber.next(data);
      })
    })
  }

  emit(eventName:string, data: any){
    this.socket.emit(eventName, data);
  }
}
