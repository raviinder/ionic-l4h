import { NgModule } from "@angular/core";
import { HeaderComponent } from './header.component'
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        RouterModule
    ],
    declarations: [HeaderComponent],
    exports: [HeaderComponent]
})

export class SharedModule{

constructor(){

    }
}