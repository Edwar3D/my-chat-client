import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    username= null;
    telephone= null;
    image : any;
  constructor(private tokenStorageService: TokenStorageService,private domSanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.image = this.domSanitizer.bypassSecurityTrustUrl(this.tokenStorageService.getUser().photo);
    this.username =  this.tokenStorageService.getUser().username;
    this.telephone = this.tokenStorageService.getUser().telephone;
  }

}
