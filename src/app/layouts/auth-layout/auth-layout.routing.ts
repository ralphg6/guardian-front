import { Routes } from '@angular/router';

import { LoginPageComponent } from '../../pages/auth/login/login.page';
import { LogoutPageComponent } from '../../pages/auth/logout/logout.page';

export const AuthLayoutRoutes: Routes = [
    { path: 'login',      component: LoginPageComponent },
    { path: 'logout',      component: LogoutPageComponent },
];
