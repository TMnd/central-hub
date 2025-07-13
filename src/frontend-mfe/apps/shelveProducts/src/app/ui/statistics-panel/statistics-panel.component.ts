import {
    ChangeDetectionStrategy,
    Component,
    computed,
    effect,
    ElementRef,
    HostListener,
    inject,
    signal
} from '@angular/core';
import {MatFormField, MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule, DatePipe} from '@angular/common';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import {ShelveProductService} from '../../data-source/shelve-product.service';
import {ShelveProduct, ShelveProductCount} from '../../interface/shelve-product.interface';
import {TableService} from '../table/table.service';
import {ToastrService} from 'ngx-toastr';
import {SideNavService} from '../../services/side-nav.service';
import {InternalizationPipe} from '../../pipes/i18n.pipe';
import {
    MatAccordion, MatExpansionModule,
    MatExpansionPanel,
    MatExpansionPanelDescription,
    MatExpansionPanelHeader, MatExpansionPanelTitle
} from '@angular/material/expansion';
import {StatisticsPanelService} from './statistics-panel.service';

@Component({
    selector: 'app-statistics-panel-component',
    templateUrl: './statistics-panel.component.html',
    styleUrl: './statistics-panel.component.scss',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        MatExpansionModule,
        InternalizationPipe
    ],
    providers: []
})
export class StatisticsPanelComponent {

    private readonly statisticsPanelService = inject(StatisticsPanelService);

    readonly panelOpenState = signal(false);

    statistics = computed(() => {
        return this.statisticsPanelService.statistics()
    });

    constructor() {
        this.statisticsPanelService.getStatistics();
    }

}
