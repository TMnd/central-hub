import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    computed,
    effect,
    HostListener,
    inject,
    signal
} from '@angular/core';
import {ShelveProductService} from '../../data-source/shelve-product.service';
import { SelectionModel } from '@angular/cdk/collections';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {MatTableModule} from '@angular/material/table';
import {TableService} from './table.service';
import {MatCheckbox, MatCheckboxModule} from '@angular/material/checkbox';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {SideNavService} from '../../services/side-nav.service';
import {ShelveProduct, ShelveProductTable} from '../../interface/shelve-product.interface';
import {CommonModule, NgClass} from '@angular/common';
import {MatSort, MatSortModule, Sort} from '@angular/material/sort';
import {Event} from '@angular/router';
import {MatFormField, MatInput} from '@angular/material/input';
import {MatCard} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {InternalizationPipe} from '../../pipes/i18n.pipe';

@Component({
    selector: 'app-table-component',
    templateUrl: './table.component.html',
    styleUrl: './table.component.scss',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        MatTableModule,
        MatFormFieldModule,
        MatCheckbox,
        MatCheckboxModule,
        NgClass,
        MatSortModule,
        MatInput,
        MatProgressSpinner,
        InternalizationPipe
    ],
    providers: [
        ShelveProductService
    ]
})
export class TableComponent {

    private readonly shelveProductService = inject(ShelveProductService);
    private readonly tableService = inject(TableService);
    private readonly sideNavService = inject(SideNavService);

    displayedColumns: string[] = ['select', 'Name', 'ProductId', 'BarCode', 'Code', 'InsertDate', 'ExpiryDate', 'daysLeft'];

    @HostListener('window:resize', ['$event'])
    onResize(event: Event) {
        this.setDisplayedColumn();
    }

    private compare(a: number | string, b: number | string, isAsc: boolean) {
        return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }

    private setDisplayedColumn() {
        const width = window.innerWidth;
        if (width < 768) {
            this.displayedColumns = ['select', 'Name', 'Code', 'daysLeft'];
        } else {
            this.displayedColumns = ['select', 'Name', 'ProductId', 'BarCode', 'Code', 'Description', 'InsertDate', 'ExpiryDate', 'daysLeft'];
        }
    }

    filter= signal<string>("");

    dataSource = computed(()=>{

        const shelveProducts = this.tableService.dataSource();

        if(shelveProducts == null || shelveProducts?.length === 0){
            return [];
        }

        let shelveProductsTable = shelveProducts!.map(shelveProduct =>{
            let expiryDate = shelveProduct.expiryDate;

            let shelveProductTable: ShelveProductTable =  {
                name: shelveProduct.name,
                productId: shelveProduct.productId,
                barCode: shelveProduct.barCode,
                code: shelveProduct.code,
                expiryDate: shelveProduct.expiryDate,
                date: shelveProduct.date,
                daysLeft: this.calcForRemainingDays(expiryDate),
                description: shelveProduct.description
            }

            return shelveProductTable;
        });

        const filter = this.filter();

        if(filter.trim().length == 0) {
            return shelveProductsTable;
        }

        return shelveProductsTable.filter(product =>
            Object.values(product).some(value =>
                String(value).toLowerCase().includes(filter)
            )
        );
    });

    selection = this.tableService.selection

    isLoadingResults = this.tableService.isLoadingResults;

    constructor() {
        this.setDisplayedColumn();

        this.shelveProductService.getShelveProduct()
            .then(products => {
                this.tableService.dataSource.set(products);
            })
            .finally(() => {
                this.tableService.isLoadingResults.set(false);
            });
    }

    protected isAllSelected() {
        const numSelected = this.tableService.selection().selected.length;
        const numRows = this.dataSource().length;
        return numSelected === numRows;
    }

    protected masterToggle() {
        this.isAllSelected() ? this.tableService.selection().clear() : this.dataSource().forEach((row) => this.tableService.selection().select(row));
    }

    protected editProduct(shelveProduct: ShelveProduct) {
        this.sideNavService.isEditMode.set(true);
        this.sideNavService.productSelected.set(shelveProduct);

        setTimeout(()=> {
            this.sideNavService.toggleSidenavSource.next();
        }, 0); //Microtask
    }

    protected calcForRemainingDays(expiryDate: string){
        const expiryParsedDate = new Date(expiryDate);
        const currentDate = new Date();

        const diffTime = expiryParsedDate.getTime() - currentDate.getTime();
        return Math.ceil(diffTime / (1000 * 3600 * 24));
    }

    protected applyFilter(event: KeyboardEvent) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.filter.set(filterValue.trim().toLowerCase());
    }

    protected sortData(sort: Sort) {
        const data = this.tableService.dataSource();
        if (!sort.active || sort.direction === '') {
            return;
        }

        const sortedData = [...data].sort((a, b) => {
            const isAsc = sort.direction === 'asc';
            switch (sort.active) {
                case 'ExpiryDate':
                    return this.compare(a.expiryDate, b.expiryDate, isAsc);
                default:
                    return 0;
            }
        });

        this.tableService.dataSource.set(sortedData);
    }
}
