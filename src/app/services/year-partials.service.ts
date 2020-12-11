
import { Injectable } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { SocialUser } from 'angularx-social-login';
import { v4 as uuidv4 } from 'uuid';
import * as moment from 'moment';

export interface Partial {
  begin: string;
  title: string;
  until: string;
  uuid: string;
}

@Injectable({
  providedIn: 'root'
})
export class YearPartialsService {

  constructor(private storage: StorageMap) { }

  async listPartials(user: SocialUser): Promise<Partial[]> {
    try {
      const partials: Partial[] = await this.storage.get(`partials-${user.id}`).toPromise() as Partial[] || [];
      if (partials.length === 0) {
        partials.push({
          begin: '2020-02-10',
          title: '1º Bimestre',
          until: '2020-08-05',
          uuid: uuidv4(),
        });
        partials.push({
          begin: '2020-08-06',
          title: '2º Bimestre',
          until: '2020-09-25',
          uuid: uuidv4(),
        });
        partials.push({
          begin: '2020-10-05',
          title: '3º Bimestre',
          until: '2020-11-26',
          uuid: uuidv4(),
        });
        partials.push({
          begin: '2020-11-27',
          title: '4º Bimestre',
          until: '2021-01-28',
          uuid: uuidv4(),
        });
        await this.storage.set(`partials-${user.id}`, partials).toPromise();
      }
      return partials;
    } catch (e) {
      console.error('Can not list tasks', e);
      throw e;
    }
  }

  async getCurrentPartial(user: SocialUser): Promise<Partial> {
    const partials = await this.listPartials(user);
    const today = moment().format('YYYY-MM-DD');
    return partials.find((p) => p.begin <= today && p.until >= today)
  }

  async getPartial(user: SocialUser, uuid: string): Promise<Partial> {
    const partials = await this.listPartials(user);
    return partials.find((p) => p.uuid === uuid)
  }

}
