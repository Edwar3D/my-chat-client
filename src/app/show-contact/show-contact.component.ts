import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../_services/user.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Location } from '@angular/common';


@Component({
  selector: 'app-show-contact',
  templateUrl: './show-contact.component.html',
  styleUrls: ['./show-contact.component.css']
})
export class ShowContactComponent implements OnInit {
  expand = false;

  dataContact: any;

  constructor(private rutaActiva: ActivatedRoute, private userService :UserService,
    private tokenStorage: TokenStorageService,
    private domSanitizer: DomSanitizer, private _location: Location) { }


  ngOnInit(): void {
    this.rutaActiva.params.subscribe(
      (params: Params) => {
        this.dataContact = this.userService.getUser(params['id'], this.tokenStorage.getToken() ).subscribe({
          next: (res) => {
           /*  console.log(res.dataUser) */
          this.dataContact =res.dataUser;
          this.dataContact.photo =  this.domSanitizer.bypassSecurityTrustUrl(this.dataContact.photo);
           },
          error: (e) => {
            console.error(e.error)
          },
          complete: () => {

          }
        });
      }
    );
  }

  public fnExpand() {
    this.expand = !this.expand;
  }

  goBack(){
    this._location.back();
  }


}
