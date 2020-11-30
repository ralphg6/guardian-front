import { Routes } from '@angular/router';

import { LoginComponent } from '../../pages/login/login.component';
import { LogoutComponent } from '../../pages/logout/logout.component';

export const AuthLayoutRoutes: Routes = [
    { path: 'login',      component: LoginComponent },
    { path: 'logout',      component: LogoutComponent },
];
