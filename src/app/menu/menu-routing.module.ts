import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuPage } from './menu.page';
import { AuthGuard } from '../services/auth-guard';

const routes: Routes = [
  {
    path:'',
    redirectTo:'/menu/home',
    pathMatch:'full'

  },
  {
    path: '',
    component: MenuPage,
    children:[
      {path: 'home', loadChildren: () => import('../home/home.module').then( m => m.HomePageModule)},
      {path: 'login',loadChildren: () => import('../login/login.module').then( m => m.LoginPageModule)},
      {path: 'events',loadChildren: () => import('../events/events.module').then( m => m.EventsPageModule)},
      { path: 'register',loadChildren: () => import('../register/register.module').then( m => m.RegisterPageModule)},
      { path: 'contactus',loadChildren: () => import('../contactus/contactus.module').then( m => m.ContactusPageModule)},
      {path: 'donate',loadChildren: () => import('../donate/donate.module').then( m => m.DonatePageModule)},
      {path: 'admin',loadChildren: () => import('../admin/admin.module').then( m => m.AdminPageModule)},
      {path: 'dashboard',loadChildren: () => import('../dashboard/dashboard.module').then( m => m.DashboardPageModule), canActivate: [AuthGuard]},
     
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPageRoutingModule {}
