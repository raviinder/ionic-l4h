import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DonatePageRoutingModule } from './donate-routing.module';

import { DonatePage } from './donate.page';
import { HeaderComponent } from '../header/header.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DonatePageRoutingModule
  ],
  declarations: [DonatePage,
    HeaderComponent
  ]
})
export class DonatePageModule {}
