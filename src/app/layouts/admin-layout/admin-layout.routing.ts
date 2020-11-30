import { Routes } from '@angular/router';

import { DashboardPageComponent } from '../../pages/admin/dashboard/dashboard.page';
// import { UserComponent } from '../../pages/admin/user/user.component';
// // import { TableComponent } from '../../pages/admin/table/table.component';
// import { TypographyComponent } from '../../pages/admin/typography/typography.component';
// import { IconsComponent } from '../../pages/admin/icons/icons.component';
// import { MapsComponent } from '../../pages/admin/maps/maps.component';
// import { NotificationsComponent } from '../../pages/admin/notifications/notifications.component';
// import { UpgradeComponent } from '../../pages/admin/upgrade/upgrade.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardPageComponent },
    // { path: 'user',           component: UserComponent },
    // // { path: 'table',          component: TableComponent },
    // { path: 'typography',     component: TypographyComponent },
    // { path: 'icons',          component: IconsComponent },
    // { path: 'maps',           component: MapsComponent },
    // { path: 'notifications',  component: NotificationsComponent },
    // { path: 'upgrade',        component: UpgradeComponent }
];
