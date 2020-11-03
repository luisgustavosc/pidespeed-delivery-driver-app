import { Injectable } from '@angular/core';
import Swal from "sweetalert2";

@Injectable({
    providedIn: 'root'
})
export class ActionService {

    constructor() { }

    /**
     * Este metodo abre el Swal alert
     * y recibe el id del item que se quiere eliminar y
     * la funcion para borrar ese item
     *
     * @param {Number} $id
     * @param {Function} $delete
     * @returns {Void}
     */
    public getSwalToDelete($id: number, $delete: Function) {
        Swal.fire({
            title: "¿Seguro que quieres hacerlo?",
            text: "Esta acción no se puede deshacer.",
            showCancelButton: true,
            confirmButtonText: "Aceptar",
            cancelButtonText: "Cancelar"
        }).then(result => {
            if (result.value) {
                // Accion para eliminar.
                $delete($id);
            } else if (result.dismiss === Swal.DismissReason.cancel) {
            }
        });
    }

    /**
     * Este metodo abre el Swal alert para notificar un error.
     * recibe el mensaje que se quiera mostrar al usuario (opcional)
     *
     * @param {String} $title
     * @param {String} $message
     * @returns {Void}
     */
    public getErrorSwal($title: string = 'Ha ocurrido un error inesperado', $message: string = 'Inténtelo de nuevo más tarde') {
        Swal.fire({
            title: $title,
            text: $message,
            icon: "error",
            confirmButtonText: "Aceptar"
        });
    }
}
