
import { Injectable } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { SocialUser } from 'angularx-social-login';
import { HttpClient } from '@angular/common/http';

const
  BEGIN = '2020-11-27',
  UNTIL = false
  ;

function getUpdateDate(submission) {
  return submission.updateTime ? submission.updateTime.split('T')[0] : 'WITHOUT_DATE';
}

const isIncludedSubmission = (submission: any) => {
  const updateDate = getUpdateDate(submission);
  if (BEGIN && updateDate !== 'WITHOUT_DATE' && updateDate < BEGIN) { return false; }
  if (UNTIL && updateDate !== 'WITHOUT_DATE' && updateDate > UNTIL) { return false; }
  return true;
};

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private storage: StorageMap, private http: HttpClient) { }

  async listTasks(user: SocialUser, courseId, pageToken?: string) {
    // const classroom = await getClassroomClient();

    let resultList = [];

    // console.log('courseId', courseId);
    try {
      const params = {};

      if (pageToken) { params['pageToken'] = pageToken; }

      const result: any = (await this.http.get(`https://classroom.googleapis.com/v1/courses/${courseId}/courseWork`, {
        params,
        headers: {
          'Authorization': `Bearer ${user.authToken}`,
        }
      }).toPromise());

      const tasks = result.courseWork;
      // printTasks(tasks);

      if (tasks) { resultList = resultList.concat(tasks); }

      if (result.nextPageToken) {
        resultList = resultList.concat(await this.listTasks(user, courseId, result.nextPageToken));
      }

      return resultList;
    } catch (e) {
      console.error('Can not list tasks', e);
      throw e;
    }
  }

  async fetchTasks(user: SocialUser, course) {
    // if (isExcludedCourse(course.id)) return;
    // courseMap[course.id] = course;
    // console.log("course", course);
    const tasks = await this.listTasks(user, course.id);
    const tasksMap = {};
    // console.log("tasks", tasks);
    tasks.forEach((task) => {
      tasksMap[task.id] = task;
      // eslint-disable-next-line no-param-reassign
      task.submissions = [];
    });
    const submissions = await this.listSubmissions(user, course.id);
    submissions.forEach((submission) => {
      tasksMap[submission.courseWorkId].submissions.push(submission);
    });
    // eslint-disable-next-line no-param-reassign
    course.tasks = tasks;
  }

  async listSubmissions(user: SocialUser, courseId, pageToken?: string) {
    let resultList = [];
    // console.log('courseId', courseId);
    try {

      const params = {};

      if (pageToken) { params['pageToken'] = pageToken; }

      const result: any = (await this.http.get(`https://classroom.googleapis.com/v1/courses/${courseId}/courseWork/-/studentSubmissions`, {
        params,
        headers: {
          'Authorization': `Bearer ${user.authToken}`,
        }
      }).toPromise());

      const submissions = result.studentSubmissions;
      // printSubmissions(submissions);

      if (submissions) { resultList = resultList.concat(submissions); }

      if (result.nextPageToken) {
        resultList = resultList.concat(await this.listSubmissions(user, courseId, result.nextPageToken));
      }

      return resultList;
    } catch (e) {
      console.error('Can not list submissions', e);
      throw e;
    }
  }

  async analyzeTasks(course) {
    const tasksAnalyze = {};

    course.tasks.forEach((task) => {
      if (task.submissions.length !== 1) {
        throw new Error(`Wrong number of submissions for task ${task.id}: ${task.submissions.length}`);
      }
      const submission = task.submissions[0];
      // console.log("task", task);

      if (isIncludedSubmission(submission)) {
        const updateDate = getUpdateDate(submission);

        if (!tasksAnalyze[submission.state]) { tasksAnalyze[submission.state] = {}; }
        if (!tasksAnalyze[submission.state][updateDate]) {
          tasksAnalyze[submission.state][updateDate] = [];
        }

        tasksAnalyze[submission.state][updateDate].push(task);
      }
    });

    // console.log("tasksAnalyze", tasksAnalyze);

    // eslint-disable-next-line no-param-reassign
    course.tasksAnalyze = tasksAnalyze;
  }

  analyzesPerDate(courses) {
    const analyzesPerDateData = {};
    courses.forEach((course) => {
      Object.keys(course.tasksAnalyze).forEach((state) => {
        Object.keys(course.tasksAnalyze[state]).forEach((date) => {
          if (!analyzesPerDateData[date]) { analyzesPerDateData[date] = {}; }
          if (!analyzesPerDateData[date][state]) { analyzesPerDateData[date][state] = []; }
          analyzesPerDateData[date][state] = analyzesPerDateData[date][state]
            .concat(course.tasksAnalyze[state][date]);
        });
      });
    });


    // writeJSON('analyzesPerDateSummary.json', analyzesPerDateSummary);

    return analyzesPerDateData;
  }

  analyzesPerDateSummary(analyzesPerDateData) {
    const analyzesPerDateSummary = {};

    Object.keys(analyzesPerDateData).sort().reverse().forEach((date) => {
      analyzesPerDateSummary[date] = {};
      Object.keys(analyzesPerDateData[date]).forEach((state) => {
        analyzesPerDateSummary[date][state] = analyzesPerDateData[date][state].length;
      });
    });

    // writeJSON('analyzesPerDateSummary.json', analyzesPerDateSummary);

    return analyzesPerDateSummary;
  }

  analyzesPerState(courses) {
    const analyzesPerStateData = {};
    courses.forEach((course) => {
      Object.keys(course.tasksAnalyze).forEach((state) => {
        if (!analyzesPerStateData[state]) { analyzesPerStateData[state] = {}; }
        Object.keys(course.tasksAnalyze[state]).forEach((date) => {
          if (!analyzesPerStateData[state][date]) { analyzesPerStateData[state][date] = []; }
          analyzesPerStateData[state][date] = analyzesPerStateData[state][date]
            .concat(course.tasksAnalyze[state][date]);
        });
      });
    });

    // writeJSON('analyzesPerStateSummary.json', analyzesPerStateSummary);

    return analyzesPerStateData;
  }

  analyzesPerStateSummary(analyzesPerStateData) {
    const analyzesPerStateSummary = {};

    Object.keys(analyzesPerStateData).sort().reverse().forEach((state) => {
      analyzesPerStateSummary[state] = { total: 0, dates: {} };
      Object.keys(analyzesPerStateData[state]).forEach((date) => {
        analyzesPerStateSummary[state].total += analyzesPerStateData[state][date].length;
        analyzesPerStateSummary[state].dates[date] = analyzesPerStateData[state][date].length;
      });
    });

    // writeJSON('analyzesPerStateSummary.json', analyzesPerStateSummary);

    return analyzesPerStateSummary;
  }

}
