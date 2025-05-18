import {
    ChangeDetectionStrategy,
    Component,
    inject,
    OnDestroy,
    signal,
    ViewChild
} from '@angular/core';
import {TableComponent} from './ui/table/table.component';
import {MatIconButton} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from '@angular/material/sidenav';
import {FormComponent} from './ui/form/form.component';
import {TableService} from './ui/table/table.service';
import {ShelveProductService} from './data-source/shelve-product.service';
import {ToastrService} from 'ngx-toastr';
import {SideNavService} from './services/side-nav.service';
import {Subscription} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmationModalComponent} from './ui/confirmation-modal/confirmation-modal.component';
import {InternalizationPipe} from './pipes/i18n.pipe';
import {I18nService} from "./services/i18n.service"
import {ApplicationConfigurations} from './services/application-configurations.service';

@Component({
    selector: 'app-root',
    imports: [
        TableComponent,
        MatIconModule,
        MatIconButton,
        MatSidenavContent,
        MatSidenavContainer,
        MatSidenav,
        FormComponent,
        InternalizationPipe
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        TableService,
        ShelveProductService,
        SideNavService
    ]
})
export class AppComponent implements OnDestroy {
    title = 'shelve-product';

    private readonly tableService = inject(TableService);
    private readonly sideNavService = inject(SideNavService);
    private readonly shelveProductService = inject(ShelveProductService);
    private readonly toastr = inject(ToastrService);
    private readonly dialog = inject(MatDialog);
    private readonly I18nService = inject(I18nService);

    @ViewChild('sidenav') sidenav!: MatSidenav;

    events: string[] = [];
    opened = false;
    private sub: Subscription;
    private subClose: Subscription;
    private subChanged: Subscription;

    deletionDisable = signal<boolean>(true);

    constructor() {
        this.sub = this.sideNavService.toggleSidenavSource.subscribe(() => {
            if(!this.sidenav.opened) {
                this.sidenav.toggle();
            }
        });
        this.subClose = this.sideNavService.toggleSidenavClose.subscribe(() => {
            if(this.sidenav.opened) {
                this.sidenav.close();
            }
        });
        this.subChanged = this.tableService.selection().changed.subscribe(() => {
            let hasValue = !this.tableService.selection().hasValue();
            this.deletionDisable.set(hasValue);
        });
    }

    protected async refreshProducts() {
        this.tableService.isLoadingResults.set(true);
        let shelveProducts = await this.shelveProductService.getShelveProduct();
        this.tableService.dataSource.set(shelveProducts);
        this.tableService.isLoadingResults.set(false);
    }

    protected addProduct(){
        this.sideNavService.isEditMode.set(false);
        this.sideNavService.productSelected.set({code: '', date: '', barCode: '', expiryDate: '', name: '', productId: '', description: ''});
        if(!this.sidenav.opened) {
            this.sidenav.toggle();
        } else {
            this.sidenav.close();
            this.sidenav.toggle();
        }
    }

    protected removeProducts() {
        let selectedProducts = this.tableService.selection().selected;

        const modalMsg = (selectedProducts?.length > 1) ?
            this.I18nService.translate("remove.multi.product", selectedProducts.map(product => product.code).join(', ')) :
            this.I18nService.translate("remove.one.product");

        const dialogRef = this.dialog.open(ConfirmationModalComponent, {
            data: {title: this.I18nService.translate("modal.title"), message: modalMsg},
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result !== undefined) {
                for (let product of selectedProducts) {
                    this.shelveProductService.removeProduct(product.code).then(
                        () => {

                            this.tableService.dataSource.set(this.tableService.dataSource().filter(shelveProduct => shelveProduct.code !== product.code));
                            this.toastr.success(`Product "${product.code}" was removed.`, '', {
                                positionClass: 'toast-bottom-left'
                            });
                        }
                    )
                }
            }
        });

    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
        this.subClose.unsubscribe();
        this.subChanged.unsubscribe();
    }

}
