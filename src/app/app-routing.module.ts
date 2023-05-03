import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { HomeComponent } from './views/home/home.component';
import { canActivateAuthGuard } from './helpers/auth.guard';
import { CityDetailComponent } from './views/city-detail/city-detail.component';
import { NewPointOfInterestComponent } from './views/new-point-of-interest/new-point-of-interest.component';
import { UpdatePointOfInterestComponent } from './views/update-point-of-interest/update-point-of-interest.component';
import { SignUpComponent } from './views/sign-up/sign-up.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signUp', component: SignUpComponent },
  // { path: 'newCity' },
  {
    path: 'newPointOfInterest',
    component: NewPointOfInterestComponent,
    canActivate: [canActivateAuthGuard],
  },
  {
    path: 'updatePointOfInterest',
    component: UpdatePointOfInterestComponent,
    canActivate: [canActivateAuthGuard],
  },
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
