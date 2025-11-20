import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavComponent } from './features/nav.component';

@Component({
  imports: [RouterModule, NavComponent],
  selector: 'ng-mf-root',
  templateUrl: './portal.component.html',
  styleUrl: './portal.component.scss',
})
export class PortalComponent {
  protected title = 'CentralHub';

  constructor() {
  }
}
