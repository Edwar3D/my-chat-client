import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  io = io("https://shrouded-spire-31378.herokuapp.com/",  {
    autoConnect : true,
  })

  constructor() {
    this.io.on("start",(msg)=>{
     console.log("---->",msg)
    });
   }

}
