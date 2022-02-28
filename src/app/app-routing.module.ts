import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapViewComponent } from './map-view/map-view.component';
import { AuthGuard } from './helpers/auth.gaurd';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { NotFoundComponent } from './not-found/not-found.component';

import { EditCrashComponent } from './edit-crash/edit-crash.component';

const routes: Routes = [
  {
    path: "",
    component: MapViewComponent,
    canActivate: [AuthGuard],
    data: { roles:["R","RW"]}
  }, {
    path: "admin",
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: { roles:["ADMIN"]}
  },
  {
    path: "crash",
    component: EditCrashComponent,
    canActivate: [AuthGuard],
    data: { roles:["R","RW"]}
  },
  {
    path: "login",
    component: LoginComponent
  },

  // otherwise redirect to home
  { path: '**',
  component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
