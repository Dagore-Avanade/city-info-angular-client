import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  get username() {
    return this.userService.userValue?.username;
  }

  links: Link[] = [
    { display: 'Nuevo punto de interés', path: '/newPointOfInterest' },
  ];

  constructor(private readonly userService: UserService) {}

  logout() {
    this.userService.logout();
  }
}

interface Link {
  path: string;
  display: string;
}
