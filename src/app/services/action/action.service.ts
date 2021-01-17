import { Injectable } from '@angular/core';
import Swal from "sweetalert2";

@Injectable({
    providedIn: 'root'
})
export class ActionService {

    constructor() { }

    /**
     * This method call the Swal alert and receives the id of the
     * item to be removed and the function to delete that item
     *
     * @param {Number} $id
     * @param {Function} $delete
     * @returns {Void}
     */
    public getSwalToDelete($id: number, $delete: Function): void {
        Swal.fire({
            title: "¿Seguro que quieres hacerlo?",
            text: "Esta acción no se puede deshacer.",
            showCancelButton: true,
            confirmButtonText: "Aceptar",
            cancelButtonText: "Cancelar"
        }).then(result => {
            if (result.value) {
                // Delete action.
                $delete($id);
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                // Cancel action.
            }
        });
    }

    /**
     * @param {String|Null} $title
     * @param {String|Null} $message
     * @returns {Void}
     */
    public getSwalError($title: string = 'Ha ocurrido un error inesperado', $message: string = 'Inténtelo de nuevo más tarde'): void {
        Swal.fire({
            title: $title,
            text: $message,
            icon: "error",
            confirmButtonText: "Aceptar"
        });
    }
}
