import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // import router from angular router
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';

@Component({
  selector: 'login-cmp',
  moduleId: module.id,
  templateUrl: 'login.page.html'
})
export class LoginPageComponent implements OnInit {

  constructor(private router: Router, private authService: SocialAuthService) { }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      // console.log('user', user);
      if (user != null) {
          this.router.navigate(['/dashboard']);
      }
    });
  }

  entrar() {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    // this.route.navigate(['/dashboard']);
  }

}
