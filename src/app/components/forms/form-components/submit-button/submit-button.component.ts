import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-submit-button',
    templateUrl: './submit-button.component.html',
})
export class SubmitButtonComponent implements OnInit {
    @Input() public buttonLabel: string;
    @Input() public isDisabled = false;
    @Input() public isFormLoading = true;

    // TODO: Preguntar a Eduardo para revisar si se puede hacer una funcion que espere por la respuesta del submit
    // y asi poder manejar el `isFormLoading` desde aqui al momento que la consulta regrese algo.

    constructor() { }

    ngOnInit() { }
}
