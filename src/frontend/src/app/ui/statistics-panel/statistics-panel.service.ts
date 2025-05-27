import {ChangeDetectionStrategy, Component, inject, Injectable, signal} from '@angular/core';
import {ShelveProductService} from '../../data-source/shelve-product.service';
import {ShelveProduct, ShelveProductCount} from '../../interface/shelve-product.interface';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {MatTableModule} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import {Subject} from 'rxjs';

@Injectable()
export class StatisticsPanelService {
    private readonly shelveProductService = inject(ShelveProductService);

    statistics = signal<ShelveProductCount[]>([]);

    getStatistics() {
        this.shelveProductService.getStatistics().then( (data: ShelveProductCount[]) => {
            this.statistics.set(data);
        })
    }
}
