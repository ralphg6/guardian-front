import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // import router from angular router

@Component({
  selector: 'login-cmp',
  moduleId: module.id,
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit() {

  }

  entrar() {
    this.route.navigate(['/dashboard']);
  }

}
