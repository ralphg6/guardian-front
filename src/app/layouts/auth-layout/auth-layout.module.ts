import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AuthLayoutRoutes } from './auth-layout.routing';

import { LoginPageComponent } from '../../pages/auth/login/login.page';
import { LogoutPageComponent } from '../../pages/auth/logout/logout.page';


import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AuthLayoutRoutes),
    FormsModule,
    NgbModule,
  ],
  declarations: [
    LoginPageComponent,
    LogoutPageComponent,
  ]
})

export class AuthLayoutModule { }
