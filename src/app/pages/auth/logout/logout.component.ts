import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // import router from angular router


@Component({
  selector: 'logout-cmp',
  moduleId: module.id,
  templateUrl: 'logout.component.html'
})
export class LogoutComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit() {
    this.route.navigate(['/login']);
  }
}
