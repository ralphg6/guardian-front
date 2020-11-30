import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // import router from angular router
import { GoogleLoginProvider, SocialAuthService } from "angularx-social-login";

@Component({
  selector: 'login-cmp',
  moduleId: module.id,
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {

  constructor(private route: Router, private authService: SocialAuthService) { }

  ngOnInit() {

  }

  entrar() {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    // this.route.navigate(['/dashboard']);
  }

}
