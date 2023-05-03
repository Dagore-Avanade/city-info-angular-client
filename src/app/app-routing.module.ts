import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { HomeComponent } from './views/home/home.component';
import { canActivateAuthGuard } from './helpers/auth.guard';
import { CityDetailComponent } from './views/city-detail/city-detail.component';
import { NewPointOfInterestComponent } from './views/new-point-of-interest/new-point-of-interest.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  // { path: 'signUp' },
  // { path: 'newCity' },
  {
    path: 'newPointOfInterest',
    component: NewPointOfInterestComponent,
    canActivate: [canActivateAuthGuard],
  },
  // { path: 'updatePointOfInterest' },
  {
    path: 'city/:id',
    component: CityDetailComponent,
    canActivate: [canActivateAuthGuard],
  },
  { path: '', component: HomeComponent, canActivate: [canActivateAuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
