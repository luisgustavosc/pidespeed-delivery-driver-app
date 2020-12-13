import { Component, OnInit, Input } from '@angular/core';
import { ActionService } from 'src/app/services/action/action.service';
import { IMAGE_SERVER } from 'src/app/services/API';

@Component({
    selector: 'app-user-row',
    templateUrl: './user-row.component.html',
})
export class UserRowComponent implements OnInit {
    @Input() private dataId?: number = null;
    @Input() private rowTitle: string;
    @Input() private rowImg: string
    @Input() private rowSubtitle: string;
    @Input() private rowStatus?: string = null;
    @Input() private hasActions: boolean = false;
    @Input() private hasModal: boolean = false;
    @Input() private EditRedirectTo?: string = null;
    @Input() private isDisabled: boolean = false;
    @Input() private deleteAction: (id: number) => void;
    @Input() private disabledAction: (id: number) => boolean;
    @Input() private editAction: (id: number) => void;
    @Input() private formType: string;
    IMAGE_SERVER = IMAGE_SERVER;
    constructor(private actionService: ActionService) { }

    ngOnInit() { }

    /**
     * @param {Number} $id
     * @return {Void}
     */
    disabled($id: number): void {
        this.isDisabled = this.disabledAction($id);
    }

    /**
     * @param {Number} $id
     * @return {Void}
     */
    delete($id: number): void {
        this.actionService.getSwalToDelete($id, this.deleteAction);
    }
}
