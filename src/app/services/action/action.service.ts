import { Injectable } from '@angular/core';
import Swal from "sweetalert2";
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common'
import { Router, NavigationEnd } from '@angular/router'

@Injectable({
    providedIn: 'root'
})
export class ActionService {
    private history: string[] = [];

    constructor(
        private _snackBar: MatSnackBar,
        private router: Router, private location: Location
    ) {
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.history.push(event.urlAfterRedirects)
            }
        })
    }

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

    /**
     * @param {String} message
     * @param {String|Null} action
     * @param {Number} durationInSeconds
     * @returns {Void}
     */
    public openSnackBar(message: string, action: string = null, durationInSeconds: number = 2) {
        this._snackBar.open(message, action, {
            duration: durationInSeconds * 1000,
        });
    }

    /**
     * @param {Array} val
     * @param {Array} array
     * @param {String} position
     */
    public getIndex(val: Array<any>, array: Array<any>, position: string) {
        return array.findIndex(item => item[position] === val[position])
    }

    /**
     * @param {Array} array
     * @param {String} id
     */
    public findItemInArrayById(array: Array<any>, id: string) {
        return array.find(item => item._id === id);
    }

    public back(): void {
        this.history.pop()
        if (this.history.length > 0) {
            this.location.back()
        } else {
            this.router.navigateByUrl('/')
        }
    }
}
