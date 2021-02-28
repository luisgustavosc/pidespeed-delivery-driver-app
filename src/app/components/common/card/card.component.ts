import { Component, OnInit, Input } from '@angular/core';
import { ActionService } from 'src/app/services/action/action.service';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
})
export class CardComponent implements OnInit {
    // All cards
    @Input() public cardType: number;
    @Input() public cardTitle?: string = null;
    @Input() public cardSubtitle?: string = null;

    // Card type 2
    @Input() public isPidespeedOrder: boolean;

    // Card type 3
    @Input() public dataId?: number = null;
    @Input() public titleTextSize: number = 12;
    @Input() public hasActions: boolean = false;
    @Input() public isDisabled: boolean = false;
    @Input() private deleteAction: (id: number) => void;
    @Input() private disabledAction: (id: number) => boolean;
    @Input() public editAction: (id: number) => void;
    @Input() public formType: string;
    @Input() public EditRedirectTo?: string = null;
    @Input() public hasModal: boolean = false;

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
