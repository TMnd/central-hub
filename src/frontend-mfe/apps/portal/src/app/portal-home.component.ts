import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'portal-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="portal-home">
      <h1>Bem-vindo ao Portal!</h1>
      <p>Escolha um microfrontend no menu para começar.</p>
    </div>
  `,
  styles: [`
    .portal-home {
      text-align: center;
      margin-top: 40px;
    }
  `]
})
export class PortalHomeComponent {}

