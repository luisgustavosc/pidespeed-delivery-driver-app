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
    @Input() public titleTextSize = 12;
    @Input() public hasActions = false;
    @Input() public isDisabled = false;
    @Input() private deleteAction: (id: number) => void;
    @Input() private disabledAction: (id: number) => boolean;
    @Input() public editAction: (id: number) => void;
    @Input() public formType: string;
    @Input() public EditRedirectTo?: string = null;
    @Input() public hasModal = false;

    constructor(private actionService: ActionService) { }

    ngOnInit() { }

    disabled($id: number): void {
        this.isDisabled = this.disabledAction($id);
    }

    delete($id: number): void {
        this.actionService.getSwalToDelete($id, this.deleteAction);
    }
}
