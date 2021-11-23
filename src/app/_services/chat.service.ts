import { Injectable } from "@angular/core";
import { SocketService } from "./socket.service";
import { Observable, Observer } from "rxjs";
import { TokenStorageService } from "./token-storage.service";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  messages = []


  constructor(private Socket: SocketService, private tokenStorage: TokenStorageService) {
    this.Socket.io.emit('online', tokenStorage.getUser()._id)
  }


  public loadMessages() {
    return new Observable(observer => {
      this.Socket.io.on('load-messages', (data) => {
        console.log("load messages ")
        observer.next(data);
      })
      return () => {
        this.Socket.io.disconnect();
      }
    });
  }


  /**
   * sendMessage
   */

  public sendMessage(msg: any) {
    this.Socket.io.emit('send-message', msg)
    return this.receiveMenssages();
  }

  /**
   * receiveMenssagesreceive-message-other
   */

   public receiveMenssages() {
    return new Observable(observer => {
      this.Socket.io.on('receive-message', (data) => {
        //console.log("Received message",data)
        observer.next(data);
      })
      return () => {
        this.Socket.io.disconnect();
      }
    });
  }

}
