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
}
