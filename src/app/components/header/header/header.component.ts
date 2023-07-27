import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})

export class HeaderComponent {
  activeStatus: boolean = false;

  changeActive() {
    this.activeStatus = !this.activeStatus;
  }

  closeMenu() {
    this.activeStatus = false;
  }

}
