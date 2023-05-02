import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { HomeComponent } from './views/home/home.component';
import { canActivateAuthGuard } from './helpers/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  // { path: 'signUp' },
  // { path: 'newCity' },
  // { path: 'newPointOfInterest' },
  // { path: 'updatePointOfInterest' },
  // { path: 'city/:id' },
  { path: '', component: HomeComponent, canActivate: [canActivateAuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
