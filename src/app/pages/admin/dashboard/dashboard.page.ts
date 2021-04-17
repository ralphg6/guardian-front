import { Component, OnInit } from '@angular/core';
import { TableData } from '../../../components/admin/table/table.component';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { CoursesService } from '../../../services/courses.service';
import { TasksService } from '../../../services/tasks.service';
import * as moment from 'moment';
import { Partial, YearPartialsService } from 'app/services/year-partials.service';
import { StorageMap } from '@ngx-pwa/local-storage';

@Component({
  selector: 'dashboard-cmp',
  moduleId: module.id,
  templateUrl: 'dashboard.page.html',
  styleUrls: ['./dashboard.page.css']
})
export class DashboardPageComponent implements OnInit {

  private atrasadas: any = false;
  private concluidas: any = false;
  private pendentes: any = false;

  private pendentesTableData: TableData;

  private turmasTableData: TableData;

  private atividadesPendentes: any[];

  private atividadesEntregues: any[];

  private courses: any;

  private analyzesPerState: any;

  private analyzesPerStateSummary: any;

  private analyzesPerDate: any;

  private analyzesPerDateSummary: any;

  private partials: Partial[];
  private selectedPartial = '';
  partial: Partial;
  user: SocialUser;
  private selectedCourses: string[] = [];

  private showFilters = false;

  constructor(
    private storage: StorageMap,
    private coursesService: CoursesService,
    private tasksService: TasksService,
    private authService: SocialAuthService,
    private yearPartialsService: YearPartialsService,
  ) { }

  ngOnInit() {
    this.clear();
    this.authService.authState.subscribe(async (user) => {
      if (user) {
        this.user = user;
        this.courses = await this.coursesService.fetchCourses(this.user);
        console.log('this.courses', this.courses);
        this.partials = await this.yearPartialsService.listPartials(this.user);
        console.log('this.partials', this.partials);
        this.selectedPartial = (await this.yearPartialsService.getCurrentPartial(this.user)).uuid;
        await this.getLoadSelectedCourses();
        await this.fetchData();
      }
    });
  }

  async getLoadSelectedCourses(): Promise<void> {
    this.selectedCourses = (await this.storage.get(`selected-courses-${this.user.id}`).toPromise()) as string[] || [];
    if (this.selectedCourses.length === 0) {
      this.selectedCourses = this.courses.map((c) => c.id);
      await this.persistSelectedCourses();
    }
  }

  private async persistSelectedCourses() {
    await this.storage.set(`selected-courses-${this.user.id}`, this.selectedCourses).toPromise();
  }

  clear() {
    this.atrasadas = false;
    this.concluidas = false;
    this.pendentes = false;
  }

  private async fetchData() {
    this.clear();
    const courses = this.courses.filter((c) => this.selectedCourses.includes(c.id));
    this.partial = await this.yearPartialsService.getPartial(this.user, this.selectedPartial) || {
      uuid: null,
      begin: null,
      until: null,
      title: null,
    };

    this.turmasTableData = {
      headers: ['Nome'],
      cols: ['name'],
      rows: courses.filter(c => c.courseState === 'ACTIVE'),
      id: 'id',
    };
    await Promise.all(courses.map(c => this.tasksService.fetchTasks(this.user, c)));
    await Promise.all(courses.map(c => this.tasksService.analyzeTasks(c, this.partial.begin, this.partial.until)));
    this.analyzesPerState = this.tasksService.analyzesPerState(courses);
    this.analyzesPerStateSummary = this.tasksService.analyzesPerStateSummary(this.analyzesPerState);
    this.analyzesPerDate = this.tasksService.analyzesPerDate(courses);
    this.analyzesPerDateSummary = this.tasksService.analyzesPerDateSummary(this.analyzesPerDate);

    // console.log('this.analyzesPerStateSummary', this.analyzesPerStateSummary);
    let pendentes = 0;
    if ('CREATED' in this.analyzesPerStateSummary) {
      pendentes += this.analyzesPerStateSummary['CREATED'].total;
    }
    if ('NEW' in this.analyzesPerStateSummary) {
      pendentes += this.analyzesPerStateSummary['NEW'].total;
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

    this.pendentesTableData = {
      headers: ['Nome', 'Data'],
      id: 'id',
      cols: ['title', 'dueDateDate'],
      rows: [],
    };

    let atividadesPendentes = [];
    if ('CREATED' in this.analyzesPerStateSummary) {
      const CREATED = Object.keys(this.analyzesPerStateSummary['CREATED'].dates).map(date => ([
        date, this.analyzesPerStateSummary['CREATED'].dates[date]
      ]));
      atividadesPendentes = atividadesPendentes.concat(CREATED);
      Object.keys(this.analyzesPerState['CREATED']).forEach(date => {
        this.analyzesPerState['CREATED'][date].forEach(task => {
          // console.log('task created', task);
          this.pendentesTableData.rows.push(task);
        });
      });
      // this.pendentesTableData.dataRows = ;
    }
    if ('NEW' in this.analyzesPerStateSummary) {
      const NEW = Object.keys(this.analyzesPerStateSummary['NEW'].dates).map(date => ([
        date, this.analyzesPerStateSummary['NEW'].dates[date]
      ]));
      Object.keys(this.analyzesPerState['NEW']).forEach(date => {
        this.analyzesPerState['NEW'][date].forEach(task => {
          // console.log('task new', task);
          this.pendentesTableData.rows.push(task);
        });
      });
      atividadesPendentes = atividadesPendentes.concat(NEW);
    }
    this.atividadesPendentes = atividadesPendentes.sort((a, b) => a[0] > b[0] ? 1 : -1);

    // console.log('this.atividadesPendentes', this.atividadesPendentes);
    const today = moment().format('YYYY-MM-DD');

    this.atrasadas = this.atividadesPendentes.filter(row => row[0] < today).map(row => row[1]).reduce((p, c) => p + c, 0);

    let atividadesEntregues = [];
    if ('TURNED_IN' in this.analyzesPerStateSummary) {
      const TURNED_IN = Object.keys(this.analyzesPerStateSummary['TURNED_IN'].dates).map(date => ([
        date, this.analyzesPerStateSummary['TURNED_IN'].dates[date]
      ]));
      atividadesEntregues = atividadesEntregues.concat(TURNED_IN);
    }
    if ('RETURNED' in this.analyzesPerStateSummary) {
      const RETURNED = Object.keys(this.analyzesPerStateSummary['RETURNED'].dates).map(date => ([
        date, this.analyzesPerStateSummary['RETURNED'].dates[date]
      ]));
      atividadesEntregues = atividadesEntregues.concat(RETURNED);
    }
    this.atividadesEntregues = atividadesEntregues.sort((a, b) => a[0] > b[0] ? 1 : -1);
    // console.log('this.atividadesEntregues', this.atividadesEntregues);
    // console.log('teste');

  }

  async changePartial(e: any) {
    this.selectedPartial = e.target.value;
    await this.fetchData();
  }

  async onCheckboxCourseChange(e: any) {
    console.log('e.target', e.target);
    if (e.target.checked) {
      this.selectedCourses.push(e.target.value);
    } else {
      this.selectedCourses.splice(this.selectedCourses.indexOf(e.target.value));
    }
    console.log('this.selectedCourses', this.selectedCourses);
    // this.selectedCourses = e.target.value;
    await this.persistSelectedCourses();
    await this.fetchData();
  }

  changeShowFilters(show) {
    this.showFilters = show;
  }

}
