import { Injectable } from '@angular/core';
import * as io from 'socket.io-client'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  socket:any;
  server = 'https://ssl.pidespeed.com';

  constructor() {
    this.socket = io(this.server)
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
