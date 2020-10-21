import { Component, OnInit, Input } from '@angular/core';
import { ActionService } from "src/app/services/action/action.service";

@Component({
    selector: 'app-user-row',
    templateUrl: './user-row.component.html',
    styleUrls: ['./user-row.component.scss'],
})
export class UserRowComponent implements OnInit {
    @Input() private dataId?: number = null;
    @Input() private rowTitle: string;
    @Input() private rowSubtitle: string;
    @Input() private rowStatus?: string = null;
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
     * ej: <app-user-row [disabledAction]='disableActionComponentParent'>
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
     * ej: <app-user-row [deleteAction]='deleteActionComponentParent'>
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
