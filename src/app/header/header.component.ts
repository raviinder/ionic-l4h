import { Component, HostListener } from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {

  constructor() {

    }

    header_variable = false;
    @HostListener("document: scroll")
    scrollFunction(){
      if(document.body.scrollTop > 0 || document.documentElement.scrollTop > 0){
        this.header_variable = true;
      }
      else{
        this.header_variable = false;
      }
    }
}