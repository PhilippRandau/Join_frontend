import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sidebar-nav',
  templateUrl: './sidebar-nav.component.html',
  styleUrls: ['./sidebar-nav.component.scss']
})
export class SidebarNavComponent {
  legal_notice: boolean = false;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    if (activatedRoute.snapshot.url[0].path === 'legal_notice') {
      this.legal_notice = true;
    }
  }
}
