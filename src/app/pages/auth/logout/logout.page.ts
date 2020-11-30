import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // import router from angular router
import { SocialAuthService } from "angularx-social-login";

@Component({
  selector: 'logout-cmp',
  moduleId: module.id,
  templateUrl: 'logout.page.html'
})
export class LogoutPageComponent implements OnInit {

  constructor(private route: Router, private authService: SocialAuthService) { }

  async ngOnInit() {
    await this.authService.signOut();
    this.route.navigate(['/login']);
  }
}
