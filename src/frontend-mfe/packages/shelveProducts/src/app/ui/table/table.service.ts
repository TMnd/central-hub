import { Injectable, signal } from '@angular/core';
import { ShelveProduct } from '../../interface/shelve-product.interface';
import { SelectionModel } from '@angular/cdk/collections';

@Injectable()
export class TableService {

    isLoadingResults = signal<boolean>(true);

    dataSource = signal<ShelveProduct[]>([]);

    selection = signal<SelectionModel<ShelveProduct>>(new SelectionModel<ShelveProduct>(true, []));

}
