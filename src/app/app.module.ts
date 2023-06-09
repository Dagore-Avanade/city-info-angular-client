import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login.component';
import { HomeComponent } from './views/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CitiesListComponent } from './components/cities-list/cities-list.component';
import { CityDetailComponent } from './views/city-detail/city-detail.component';
import { NewPointOfInterestComponent } from './views/new-point-of-interest/new-point-of-interest.component';
import { UpdatePointOfInterestComponent } from './views/update-point-of-interest/update-point-of-interest.component';
import { SignUpComponent } from './views/sign-up/sign-up.component';
import { ContainerComponent } from './components/container/container.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { SignUpFormComponent } from './components/sign-up-form/sign-up-form.component';
import { UpdatePointOfInterestFormComponent } from './components/update-point-of-interest-form/update-point-of-interest-form.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    CitiesListComponent,
    CityDetailComponent,
    NewPointOfInterestComponent,
    UpdatePointOfInterestComponent,
    SignUpComponent,
    ContainerComponent,
    LoginFormComponent,
    SignUpFormComponent,
    UpdatePointOfInterestFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
