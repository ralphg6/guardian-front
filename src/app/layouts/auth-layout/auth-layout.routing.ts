import { Routes } from '@angular/router';

import { LoginComponent } from '../../pages/auth/login/login.component';
import { LogoutComponent } from '../../pages/auth/logout/logout.component';

export const AuthLayoutRoutes: Routes = [
    { path: 'login',      component: LoginComponent },
    { path: 'logout',      component: LogoutComponent },
];
