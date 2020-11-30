import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // import router from angular router
import { SocialAuthService } from "angularx-social-login";

@Component({
  selector: 'logout-cmp',
  moduleId: module.id,
  templateUrl: 'logout.component.html'
})
export class LogoutComponent implements OnInit {

  constructor(private route: Router, private authService: SocialAuthService) { }

  ngOnInit() {
    this.authService.signOut();
    this.route.navigate(['/login']);
  }
}
