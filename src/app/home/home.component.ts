import { Component, OnInit } from '@angular/core';
import { HostListener } from "@angular/core";
import { Router } from '@angular/router';
import { TokenStorageService } from '../_services/token-storage.service';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  content?: string;
  isLoggedIn = false;
  username?: string;

  contact : any;


  scrWidth:any;

  isSmallWidth = false

  @HostListener('window:resize', ['$event'])
  getScreenSize(_event?: any) {

        this.scrWidth = window.innerWidth;

        if(this.scrWidth > 767)
          this.isSmallWidth = false
        else
        this.isSmallWidth = true
  }


  constructor(private router: Router,private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.username = user.username;
      this.content = 'wellcome';

    } else {
      this.content = 'registrate'
      this.router.navigate(['/login']);
    }

    this.getScreenSize()
  }

}
