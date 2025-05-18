import {ChangeDetectionStrategy, Component, inject, Injectable, signal} from '@angular/core';
import {ShelveProductService} from '../data-source/shelve-product.service';
import {ShelveProduct} from '../interface/shelve-product.interface';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {MatTableModule} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import {Subject} from 'rxjs';

@Injectable()
export class SideNavService {

    productSelected = signal<ShelveProduct>({code: '', date: '', barCode: '', expiryDate: '', name: '', productId: '', description: ''});

    toggleSidenavSource = new Subject<void>();
    toggleSidenavClose = new Subject<void>();

    isEditMode = signal<boolean>(false);

}
