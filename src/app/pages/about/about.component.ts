import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  id: any = '';

  accordion(ids: any) {
    if (this.id == ids) {
      this.id = '';
    } else {
      this.id = ids;
    }
  }

}
