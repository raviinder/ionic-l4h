import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventdetailsPageRoutingModule } from './eventdetails-routing.module';
import { SharedModule } from '../shared/shared.module';
import { EventdetailsPage } from './eventdetails.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventdetailsPageRoutingModule
  ],
  declarations: [EventdetailsPage, SharedModule]
})
export class EventdetailsPageModule {

}
