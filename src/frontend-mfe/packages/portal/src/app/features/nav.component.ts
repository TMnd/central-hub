import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nService } from '@portal/library';

@Component({
  imports: [RouterModule],
  selector: 'portal-nav-bar',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent {
  protected title = 'portal';

  private readonly i18n = inject(I18nService);

  constructor() {
    console.log(this.i18n.translate('portal', 'hello-world'));
  }
}
