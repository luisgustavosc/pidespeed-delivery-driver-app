import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from "src/app/services/shared.service";

@Component({
    selector: 'app-user-row',
    templateUrl: './user-row.component.html',
    styleUrls: ['./user-row.component.scss'],
})
export class UserRowComponent implements OnInit {
    @Input() protected dataId?: number = null;
    @Input() protected rowTitle: string;
    @Input() protected rowSubtitle: string;
    @Input() protected rowStatus?: string = null;
    @Input() protected hasActions: boolean = false;
    @Input() protected isRowDisabled: boolean = false;
    @Input() protected deleteAction: (id: number) => void;
    @Input() protected disabledAction: (id: number) => boolean;
    @Input() protected editAction: (id: number) => void;

    protected isDisabled: boolean = false;

    constructor(protected sharedService: SharedService) { }

    ngOnInit() {
        this.isDisabled = this.isRowDisabled;
    }

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
        this.sharedService.getSwalToDelete($id, this.deleteAction);
    }
}
