import { Component, HostListener } from '@angular/core';
import { AuthServiceService } from './auth/auth-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'seller-app-frontend';

  private inactivityTimeout = 3.6e6; // 1 hour in milliseconds
  private inactivityTimer: any | undefined;

  constructor(private authService: AuthServiceService) {}

  @HostListener('document:mousemove', ['$event'])
  @HostListener('document:keydown', ['$event'])
  resetInactivityTimer() {
    clearTimeout(this.inactivityTimer);
    this.inactivityTimer = setTimeout(() => {
      this.authService.logout(); // Call your logout logic here
    }, this.inactivityTimeout);
  }
}
