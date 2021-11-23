import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import {ChatService} from '../_services/chat.service';
import { UserService } from '../_services/user.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { DomSanitizer } from '@angular/platform-browser';

import { HostListener } from "@angular/core";
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {


  msg: any = {
    text: null,
  };

  iniMessages : any;

  contact :any;

  userId = null;
  userImage : any;


  flag = true;
  isSmallWidth = false
  scrWidth:any;

  btnshell = false;

  @HostListener('window:resize', ['$event'])
  getScreenSize(_event?: any) {

        this.scrWidth = window.innerWidth;

        if(this.scrWidth > 767)
          this.isSmallWidth = false
        else
        this.isSmallWidth = true
  }

  @ViewChild('scrollMe')
  private myScrollContainer!: ElementRef;

  constructor( private socket:ChatService , private userService :UserService,
     private tokenStorageService: TokenStorageService, private domSanitizer :DomSanitizer ) {
  }

  ngOnInit(): void {
    this.userId = this.tokenStorageService.getUser()._id
    this.userImage =  this.domSanitizer.bypassSecurityTrustUrl(this.tokenStorageService.getUser().photo);

    this.contact = this.userService.getUser(this.tokenStorageService.getUser().contacts[0], this.tokenStorageService.getToken() ).subscribe({
      next: (res) => {
       /*  console.log(res.dataUser) */
      this.contact =res.dataUser;
      this.contact.photo =  this.domSanitizer.bypassSecurityTrustUrl(this.contact.photo);
       },
      error: (e) => {
        console.error(e.error)
      },
      complete: () => {
        this.toggleContact()
      }
    });

    this.socket.loadMessages().subscribe({
      next: (res) => {
         this.iniMessages= res;
        },
    })


  }

  ngAfterViewChecked() {
    this.scrollToBottom();
}


  scrollToBottom(): void {
    try {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }
}


  /**
   * sendMessage
   */
  public sendMessage() {
    console.log('=>>>')
    this.socket.sendMessage({
      text: this.msg.text,
      user_id: this.userId
    }).subscribe(
      { next: (res) => {
        this.iniMessages.push(res);
       },
      }
    )
    this.iniMessages.push({
      text: this.msg.text,
      user_id: this.userId});
    this.msg.text = ""
  }

  toggleContact(){
    if(this.isSmallWidth)
    this.flag = false
    else
      this.flag = !this.flag;
  }

  toggleContact2(){
    this.btnshell= true
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }


}
