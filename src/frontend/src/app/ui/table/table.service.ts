import {ChangeDetectionStrategy, Component, inject, Injectable, signal} from '@angular/core';
import {ShelveProductService} from '../../data-source/shelve-product.service';
import {ShelveProduct} from '../../interface/shelve-product.interface';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {MatTableModule} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import {Subject} from 'rxjs';

@Injectable()
export class TableService {

    isLoadingResults = signal<boolean>(true);

    dataSource = signal<ShelveProduct[]>([]);

    selection = signal<SelectionModel<ShelveProduct>>(new SelectionModel<ShelveProduct>(true, []));

}
