import { Component, OnInit, Input } from '@angular/core';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
    selector: 'app-admin-row',
    templateUrl: './admin-row.component.html',
})
export class AdminRowComponent implements OnInit {
    @Input() public dataId?: number = null;
    @Input() public rowTitle: string;
    @Input() public rowImg: string
    @Input() public rowSubtitle: string;
    @Input() public rowStatus?: string = null;
    @Input() public hasActions = false;
    @Input() public hasModal = false;
    @Input() public EditRedirectTo?: string = null;
    @Input() public isDisabled = false;
    @Input() private deleteAction: (id: number) => void;
    @Input() private disabledAction: (id: number) => boolean;
    @Input() private editAction: (id: number) => void;
    @Input() public formType: string;

    constructor(private utils: UtilsService) { }

    ngOnInit() { }

    disabled($id: number): void {
        this.isDisabled = this.disabledAction($id);
    }

    delete($id: number): void {
        this.utils.getSwalToDelete($id, this.deleteAction);
    }
}
