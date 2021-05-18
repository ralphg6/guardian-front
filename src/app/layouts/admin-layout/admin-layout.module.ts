import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdminLayoutRoutes } from './admin-layout.routing';

import { DashboardPageComponent } from '../../pages/admin/dashboard/dashboard.page';
// import { UserComponent } from '../../pages/admin/user/user.component';
// // import { TableComponent } from '../../pages/admin/table/table.component';
// import { TypographyComponent } from '../../pages/admin/typography/typography.component';
// import { IconsComponent } from '../../pages/admin/icons/icons.component';
// import { MapsComponent } from '../../pages/admin/maps/maps.component';
// import { NotificationsComponent } from '../../pages/admin/notifications/notifications.component';
// import { UpgradeComponent } from '../../pages/admin/upgrade/upgrade.component';

import { CardStatsComponent } from '../../components/admin/card-stats/card-stats.component';
import { TableComponent } from '../../components/admin/table/table.component';
import { ChartBarsComponent } from '../../components/admin/charts/bars/bars.component';


import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { YearPartialsPageComponent } from 'app/pages/admin/yearpartials/year-partials.page';
import { MatCardModule } from '@angular/material/card';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MatTableModule } from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {MatRippleModule} from '@angular/material/core';
import {MatDividerModule} from '@angular/material/divider';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    NgbModule,
    MatCardModule,
    NgxSkeletonLoaderModule,
    MatTableModule,
    MatCheckboxModule,
    MatButtonModule,
    MatRippleModule,
    MatDividerModule,
  ],
  declarations: [
    DashboardPageComponent,
    YearPartialsPageComponent,
    // UserComponent,
    // UpgradeComponent,
    // TypographyComponent,
    // IconsComponent,
    // MapsComponent,
    // NotificationsComponent,
    CardStatsComponent,
    TableComponent,
    ChartBarsComponent,
  ]
})

export class AdminLayoutModule { }
