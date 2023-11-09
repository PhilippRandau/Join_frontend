import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mobile-bottombar-nav',
  templateUrl: './mobile-bottombar-nav.component.html',
  styleUrls: ['./mobile-bottombar-nav.component.scss']
})
export class MobileBottombarNavComponent {
  summary: boolean = false;
  board: boolean = false;
  add_task: boolean = false;
  contacts: boolean = false;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    let navPaths = ['summary', 'board', 'add_task', 'contacts']
    navPaths.forEach(navPath => {
      if (activatedRoute.snapshot.url[0].path === navPath) {
        this[navPath] = true;
      }
    });


  }
}
