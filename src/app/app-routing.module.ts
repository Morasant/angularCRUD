import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BodyComponent } from './layout/body/body.component';
import { HomeComponent } from './pages/home/home.component';


const routes: Routes = [

  {
    path:'',
    redirectTo: 'home',
    pathMatch: 'full',
  },

  {
    path: '',
    component: BodyComponent,
    children: [
      {
        path: '',
        loadChildren: './pages/pages.module#PagesModule'
      }
    ]
  },

  {
    path: '**',
    redirectTo: 'home',
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: false})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
