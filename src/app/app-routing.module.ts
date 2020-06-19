import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    path: '',
    redirectTo: 'menu',
    pathMatch: 'full'
  },
  {path: 'menu', loadChildren: () => import('./menu/menu.module').then( m => m.MenuPageModule)},
  {path: 'register', loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)},
  {path: 'dashboard',  loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule)},
  {path: 'events', loadChildren: () => import('./events/events.module').then( m => m.EventsPageModule)},
  {path: 'login',  loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)},
  {path: 'contactus', loadChildren: () => import('./contactus/contactus.module').then( m => m.ContactusPageModule)},
  {path: 'donate', loadChildren: () => import('./donate/donate.module').then( m => m.DonatePageModule)}
]
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
