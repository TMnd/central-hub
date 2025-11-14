import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { StatisticsPanelService } from './statistics-panel.service';
import { InternalizationPipe } from '@portal/library';

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
