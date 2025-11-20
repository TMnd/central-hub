import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nService, InternalizationPipe } from '@portal/library';

@Component({
  imports: [RouterModule, InternalizationPipe],
  selector: 'app-mf2',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'mf2';
}
