import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from "src/app/services/shared.service";

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
    @Input() protected dataId?: number = null;
    @Input() protected cardType: number;
    @Input() protected isPidespeedOrder: boolean;
    @Input() protected cardTitle?: string = null;
    @Input() protected cardSubtitle?: string = null;
    @Input() protected titleTextSize: number = 12;
    @Input() protected hasActions: boolean = false;
    @Input() protected isCardDisabled: boolean = false;
    @Input() protected deleteAction: (id: number) => void;
    @Input() protected disabledAction: (id: number) => boolean;
    @Input() protected editAction: (id: number) => void;

    protected isDisabled: boolean = false;

    constructor(protected sharedService: SharedService) { }

    ngOnInit() {
        this.isDisabled = this.isCardDisabled;
    }

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
        this.sharedService.getSwalToDelete($id, this.deleteAction);
    }
}
