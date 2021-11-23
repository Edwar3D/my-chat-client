import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  io = io("http://127.0.0.1:3000/",  {
    autoConnect : true,
  })

  constructor() {
    this.io.on("start",(msg)=>{
     console.log("---->",msg)
    });
   }

}
