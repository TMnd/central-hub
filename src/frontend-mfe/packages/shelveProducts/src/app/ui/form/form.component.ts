import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { MatFormField, MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepicker, MatDatepickerInput, MatDatepickerToggle } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { ShelveProductService } from '../../data-source/shelve-product.service';
import { ShelveProduct } from '../../interface/shelve-product.interface';
import { TableService } from '../table/table.service';
import { ToastrService } from 'ngx-toastr';
import { SideNavService } from '../../services/side-nav.service';
import { StatisticsPanelService } from '../statistics-panel/statistics-panel.service';
import { InternalizationPipe } from '@portal/library';

@Component({
    selector: 'app-form-component',
    templateUrl: './form.component.html',
    styleUrl: './form.component.scss',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        MatFormField,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatButton,
        MatIconModule,
        MatDatepickerInput,
        MatDatepickerToggle,
        MatDatepicker,
        InternalizationPipe
    ],
    providers: [
        ShelveProductService,
        provideNativeDateAdapter(),
        DatePipe
    ]
})
export class FormComponent {

    private readonly fb = inject(FormBuilder);
    private readonly shelveProductService = inject(ShelveProductService);
    private readonly datePipe = inject(DatePipe);
    private readonly tableService = inject(TableService);
    private readonly sideNavService = inject(SideNavService);
    private readonly toastr = inject(ToastrService);
    private readonly statisticsPanelService = inject(StatisticsPanelService);

    protected today: Date = new Date();

    isEditMode = this.sideNavService.isEditMode;

    constructor() {
        effect(() => {
            let shelveProduct = this.sideNavService.productSelected();
            this.myForm.patchValue(shelveProduct);
        });

        effect(() => {
            if(this.isEditMode()){
                this.myForm.controls["code"].disable();
            } else {
                this.myForm.controls["code"].enable();
            }
        });
    }

    protected myForm = this.fb.group({
        name: ['', Validators.required],
        productId: ['', Validators.required],
        barCode: ['', Validators.required],
        code: ['', Validators.required],
        expiryDate: ['', Validators.required],
        description: ['']
    });

    protected submitForm() {
        this.myForm.markAllAsTouched();

        if(this.myForm.valid) {

            this.tableService.isLoadingResults.set(true);

            const payload: ShelveProduct = {
                name: this.myForm.value.name ?? '',
                productId: this.myForm.value.productId ?? '',
                barCode: this.myForm.value.barCode ?? '',
                code: this.myForm.value.code ?? '',
                expiryDate: this.datePipe.transform(this.myForm.value.expiryDate, 'yyyy-MM-dd') ?? '',
                date: this.datePipe.transform(new Date(), 'yyyy-MM-dd') ?? '',
                description: this.myForm.value.description ?? '',
            }

            this.shelveProductService.saveShelveProduct(payload)
                .then( (shelveProduct: ShelveProduct) => {
                    let shelveProducts = this.tableService.dataSource();
                    if(shelveProducts == null){
                        shelveProducts = [];
                    }
                    const updatedShelveProducts = [...shelveProducts, shelveProduct];
                    this.tableService.dataSource.set(updatedShelveProducts);
                    this.statisticsPanelService.getStatistics();
                    this.toastr.success(`Product "${shelveProduct.code}" was added successfully.`, '', {
                        positionClass: 'toast-bottom-left'
                    });
                })
                .catch( (error) => {
                    this.toastr.error(error.statusText, '', {
                        positionClass: 'toast-bottom-left'
                    });
                })
                .finally(() => {
                    this.tableService.isLoadingResults.set(false);
                });
        }
    }

    protected clearForm() {
        this.sideNavService.isEditMode.set(false);
        this.myForm.controls["code"].enable();
        this.myForm.reset();
    }

    protected updateProduct() {
        const code = this.myForm.getRawValue().code;

        this.tableService.isLoadingResults.set(true);

        const payload: ShelveProduct = {
            name: this.myForm.value.name ?? '',
            productId: this.myForm.value.productId ?? '',
            barCode: this.myForm.value.barCode ?? '',
            code: code!,
            expiryDate: this.datePipe.transform(this.myForm.value.expiryDate, 'yyyy-MM-dd') ?? '',
            date: this.datePipe.transform(new Date(), 'yyyy-MM-dd') ?? '',
            description: this.myForm.value.description ?? ''
        }

        this.shelveProductService.updateProduct(code!, payload)
            .then( () => {
                this.tableService.dataSource.set(this.tableService.dataSource().map(product =>
                    product.code === code ? { ...product, ...payload } : product
                ));

                this.toastr.success(`Product "${code}" was updated successfully.`, '', {
                    positionClass: 'toast-bottom-left'
                });
            })
            .catch( (error) => {
                this.toastr.error(error.statusText, '', {
                    positionClass: 'toast-bottom-left'
                });
            })
            .finally(() => {
                this.tableService.isLoadingResults.set(false);
            });

    }
}
