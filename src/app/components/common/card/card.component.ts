import { Component, OnInit, Input } from '@angular/core';
import { ActionService } from "src/app/services/action/action.service";

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
    // All cards
    @Input() private cardType: number;
    @Input() private cardTitle?: string = null;
    @Input() private cardSubtitle?: string = null;

    // Card type 2
    @Input() private isPidespeedOrder: boolean;

    // Card type 3
    @Input() private dataId?: number = null;
    @Input() private titleTextSize: number = 12;
    @Input() private hasActions: boolean = false;
    @Input() private isDisabled: boolean = false;
    @Input() private deleteAction: (id: number) => void;
    @Input() private disabledAction: (id: number) => boolean;
    @Input() private editAction: (id: number) => void;
    @Input() private formType: string;

    constructor(private actionService: ActionService) { }

    ngOnInit() { }

    /**
     * Accion para Desactivar:
     * ej: <app-card [disabledAction]='disableActionComponentParent'>
     * Este metodo ejecutara al accion (disableActionComponentParent) que se ha
     * creado en el componente padre
     *
     * @param {Number} $id
     * @return {Void}
     */
    disabled($id: number): void {
        this.isDisabled = this.disabledAction($id);
    }

    /**
     * Accion para Eliminar:
     * ej: <app-card [deleteAction]='deleteActionComponentParent'>
     * Este metodo ejecutara al accion (deleteActionComponentParent) que se ha
     * creado en el componente padre
     *
     * @param {Number} $id
     * @return {Void}
     */
    delete($id: number): void {
        this.actionService.getSwalToDelete($id, this.deleteAction);
    }
}
