import { ChangeDetectionStrategy, Component, inject, model } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { InternalizationPipe, MF_FRONTEND } from '@portal/library';

export interface DialogData {
    title: string;
    message: string;
}

@Component({
    selector: 'app-confirmation-modal-component',
    templateUrl: './confirmation-modal.component.html',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        MatDialogContent,
        MatButton,
        MatDialogTitle,
        MatDialogActions,
        FormsModule,
        MatDialogClose,
        InternalizationPipe
    ],
    providers: [
        { provide: MF_FRONTEND, useValue: 'shelveProducts' }
    ]
})
export class ConfirmationModalComponent {
    readonly dialogRef = inject(MatDialogRef<ConfirmationModalComponent>);
    readonly data = inject<DialogData>(MAT_DIALOG_DATA);
    readonly product = model(this.data.message);

    onNoClick(): void {
        this.dialogRef.close();
    }
}
