import {Injectable, signal} from '@angular/core';
import {ShelveProduct} from '../interface/shelve-product.interface';
import {Subject} from 'rxjs';

@Injectable()
export class SideNavService {

    productSelected = signal<ShelveProduct>({code: '', date: '', barCode: '', expiryDate: '', name: '', productId: '', description: ''});

    toggleSidenavSource = new Subject<void>();
    toggleSidenavClose = new Subject<void>();

    isEditMode = signal<boolean>(false);

}
