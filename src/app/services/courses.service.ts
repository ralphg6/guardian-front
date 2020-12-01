
import { Injectable } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { SocialUser } from 'angularx-social-login';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private storage: StorageMap, private http: HttpClient) {}

  async listCourses(user: SocialUser, pageToken: string = null) {

    // const classroom = await getClassroomClient(user);
    let resultList = [];

    try {

      const params = {
        pageSize: '10',
      };

      if (pageToken) { params['pageToken'] = pageToken; }

      const result: any = (await this.http.get('https://classroom.googleapis.com/v1/courses', {
        params,
        headers: {
          'Authorization': `Bearer ${user.authToken}`,
        }
      }).toPromise());

      // console.log('result', result);

      const courses = result.courses; // .filter((c) => !isExcludedCourse(c.id));

      if (courses) { resultList = resultList.concat(courses); }

      if (result.nextPageToken) {
        resultList = resultList.concat(await this.listCourses(user, result.nextPageToken));
      }

      return resultList;
    } catch (e) {
      console.error('Can not list courses', e);
      throw e;
    }
  }

  async fetchCourses(user: SocialUser): Promise<any> {
    // if (boolean(UPDATE) || !existsJSON(COURSES_PATH)) {
    try {
      // console.log('Fecth Courses in ONLINE mode');

      const courses = (await this.listCourses(user)); // .filter((c) => !isExcludedCourse(c.id));

      // await Promise.all(courses.map((course) => fetchTasks(course)));

      // writeJSON(COURSES_PATH, courses);

      return courses;
    } catch (e) {
      console.error('erro in init', e);
      throw e;
    }
    // } else {
    //   console.log('Fecth Courses in OFFLINE mode');
    //   const content = readJSON(COURSES_PATH);
    //   return JSON.parse(content);
    // }
  }
}
