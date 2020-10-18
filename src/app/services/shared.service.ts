import { Injectable } from '@angular/core';
import { BottomNavModel } from "src/app/model/bottomNav";
import Swal from "sweetalert2";

@Injectable({
    providedIn: 'root'
})
export class SharedService {
    public configBottomNavData: Array<BottomNavModel> = [
        {
            title: 'Repartidores',
            icon: 'groups',
            link: '/configuracion/repartidores'
        },
        {
            title: 'Empresas',
            icon: 'store',
            link: '/configuracion/empresas'
        },
        {
            title: 'Admins',
            icon: 'supervisor_account',
            link: '/configuracion/administradores'
        }
    ];

    public repartidoresBottomNavData: Array<BottomNavModel> = [
        {
            title: 'Repartidores',
            icon: 'groups',
            link: '/repartidores'
        },
        {
            title: 'Ubicación',
            icon: 'near_me',
            link: '/repartidores/ubicacion'
        }
    ];

    constructor() { }

    getConfigBottomNavData(): Array<BottomNavModel>  {
        return this.configBottomNavData;
    }

    getRepartidoresBottomNavData(): Array<BottomNavModel> {
        return this.repartidoresBottomNavData;
    }

    /**
     * Este metodo abre el Swal alert
     * y recibe el id del item que se quiere eliminar y
     * la funcion para borrar ese item
     *
     * @param {Number} $id
     * @param {Function} $delete
     * @returns {Void}
     */
    getSwalToDelete($id: number, $delete: Function) {
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
