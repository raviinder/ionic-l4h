import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  currentUrl: string;
  constructor(private router: Router) {}

  ngOnInit() {
    this.currentUrl = this.router.url;
  }

  buttons = [
    {title: 'Home', url: '/menu/home'},
    {title: 'Events', url: '/menu/events'},
    {title: 'Donate', url: '/menu/donate'},
  ]

}