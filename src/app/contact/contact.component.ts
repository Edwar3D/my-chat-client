import { Component, OnInit,Input,Inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';



@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  @Input() dataContact: any;
  expand = false;

  constructor(private domSanitizer: DomSanitizer ) {
  }


  ngOnInit(): void {

  }

  /**
   * expand
   */
  public fnExpand() {
    this.expand = !this.expand;
  }
}
