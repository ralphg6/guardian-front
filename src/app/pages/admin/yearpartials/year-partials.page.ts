import { Component, OnInit } from '@angular/core';
import { TableData } from '../../../components/admin/table/table.component';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { CoursesService } from '../../../services/courses.service';
import { TasksService } from '../../../services/tasks.service';
import * as moment from 'moment';
import { Partial, YearPartialsService } from 'app/services/year-partials.service';

@Component({
  selector: 'year-partials-cmp',
  moduleId: module.id,
  templateUrl: 'year-partials.page.html'
})
export class YearPartialsPageComponent implements OnInit {

  private partials: Partial[];

  private partialsTableData: TableData;

  constructor(private yearPartialsService: YearPartialsService, private authService: SocialAuthService) { }

  ngOnInit() {
    this.authService.authState.subscribe(async (user) => {
      if (user) {
        this.partials = await this.yearPartialsService.listPartials(user);
        this.partialsTableData = {
          headers: ['Nome', 'Início', 'Fim'],
          rows: this.partials,
          id: 'uuid',
          cols: [
            'title', 'begin', 'until',
          ],
        };
      }
    });
  }

  excluir(row: Partial): boolean {
    if (confirm(`Você deseja realmente excluir o '${row.title}'?`)) {
      alert('Excluir!!!');
    }
    return false;
  }

  editar(row: Partial): boolean {
    alert(`Editar '${row.title}'!!!`);
    return false;
  }
}
