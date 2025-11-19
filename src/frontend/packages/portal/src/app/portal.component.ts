import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nService } from '@portal/library';
import { NavComponent } from './features/nav.component';

@Component({
  imports: [RouterModule, NavComponent],
  selector: 'ng-mf-root',
  templateUrl: './portal.component.html',
  styleUrl: './portal.component.scss',
})
export class PortalComponent {
  protected title = 'CentralHub';

  private readonly i18n = inject(I18nService);

  constructor() {
    console.log(this.i18n.translate('portal', 'hello-world'));
  }
}
