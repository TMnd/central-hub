import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NxWelcome } from './nx-welcome';

@Component({
  imports: [CommonModule, NxWelcome],
  selector: 'ng-mf-video_games_catalog-entry',
  template: `<ng-mf-nx-welcome></ng-mf-nx-welcome>`,
})
export class RemoteEntry {}
