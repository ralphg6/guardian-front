import { Component, OnInit } from '@angular/core';
import { TableData } from '../../../components/admin/table/table.component';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { CoursesService } from '../../../services/courses.service';
import { TasksService } from '../../../services/tasks.service';
import * as moment from 'moment';

@Component({
  selector: 'dashboard-cmp',
  moduleId: module.id,
  templateUrl: 'dashboard.page.html'
})
export class DashboardPageComponent implements OnInit {

  private atrasadas: any = false;
  private concluidas: any = false;
  private pendentes: any = false;

  private tableData: TableData;

  private turmasTableData: TableData;

  private atividadesPendentes: any[];

  private atividadesEntregues: any[];

  private courses: any;

  private analyzesPerState: any;

  private analyzesPerStateSummary: any;

  private analyzesPerDate: any;

  private analyzesPerDateSummary: any;


  constructor(private coursesService: CoursesService, private tasksService: TasksService, private authService: SocialAuthService) { }

  ngOnInit() {



    this.authService.authState.subscribe(async (user) => {
      if (user) {
        this.courses = await this.coursesService.fetchCourses(user);
        this.turmasTableData = {
          headerRow: ['Nome'],
          dataRows: this.courses.filter(c => c.courseState === 'ACTIVE').map(c => ([
            c.name
          ])),
        };
        await Promise.all(this.courses.map(c => this.tasksService.fetchTasks(user, c)))
        await Promise.all(this.courses.map(c => this.tasksService.analyzeTasks(c)));
        this.analyzesPerState = this.tasksService.analyzesPerState(this.courses);
        this.analyzesPerStateSummary = this.tasksService.analyzesPerStateSummary(this.analyzesPerState);
        this.analyzesPerDate = this.tasksService.analyzesPerDate(this.courses);
        this.analyzesPerDateSummary = this.tasksService.analyzesPerDateSummary(this.analyzesPerDate);

        // console.log('this.analyzesPerStateSummary', this.analyzesPerStateSummary);

        let pendentes = 0;
        if ('CREATED' in this.analyzesPerStateSummary) {
          pendentes += this.analyzesPerStateSummary['CREATED'].total;
        }
        this.pendentes = pendentes;

        let concluidas = 0;
        if ('TURNED_IN' in this.analyzesPerStateSummary) {
          concluidas += this.analyzesPerStateSummary['TURNED_IN'].total;
        }
        if ('RETURNED' in this.analyzesPerStateSummary) {
          concluidas += this.analyzesPerStateSummary['RETURNED'].total;
        }
        this.concluidas = concluidas;

        this.tableData = {
          headerRow: [],
          dataRows: [],
        };

        this.turmasTableData = {
          headerRow: [],
          dataRows: [],
        };

        this.atividadesPendentes = [];
        if ('CREATED' in this.analyzesPerStateSummary) {
          const CREATED = Object.keys(this.analyzesPerStateSummary['CREATED'].dates).map(date => ([
            date, this.analyzesPerStateSummary['CREATED'].dates[date]
          ]));
          this.atividadesPendentes = this.atividadesPendentes.concat(CREATED);
        }
        if ('NEW' in this.analyzesPerStateSummary) {
          const NEW = Object.keys(this.analyzesPerStateSummary['NEW'].dates).map(date => ([
            date, this.analyzesPerStateSummary['NEW'].dates[date]
          ]));
          this.atividadesPendentes = this.atividadesPendentes.concat(NEW);
        }

        // console.log('this.atividadesPendentes', this.atividadesPendentes);

        const today = moment().format('YYYY-MM-DD');

        this.atrasadas = this.atividadesPendentes.filter(row => row[0] < today).map(row => row[1]).reduce((p, c) => p + c, 0);

        this.atividadesEntregues = [];
        if ('TURNED_IN' in this.analyzesPerStateSummary) {
          const TURNED_IN = Object.keys(this.analyzesPerStateSummary['TURNED_IN'].dates).map(date => ([
            date, this.analyzesPerStateSummary['TURNED_IN'].dates[date]
          ]));
          this.atividadesEntregues = this.atividadesEntregues.concat(TURNED_IN);
        }
        if ('RETURNED' in this.analyzesPerStateSummary) {
          const RETURNED = Object.keys(this.analyzesPerStateSummary['RETURNED'].dates).map(date => ([
            date, this.analyzesPerStateSummary['RETURNED'].dates[date]
          ]));
          this.atividadesEntregues = this.atividadesEntregues.concat(RETURNED);
        }

        // console.log('this.atividadesEntregues', this.atividadesEntregues);

      }
    });
  }
}
