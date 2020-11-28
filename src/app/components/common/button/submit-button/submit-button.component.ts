import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-submit-button',
    templateUrl: './submit-button.component.html',
})
export class SubmitButtonComponent implements OnInit {
    @Input() private buttonLabel: string;
    @Input() private isDisabled: boolean = false;
    @Input() private isLoading: boolean = true;

    // TODO: Preguntar a Eduardo para revisar si se puede hacer una funcion que espere por la respuesta del submit
    // y asi poder manejar el `isLoading` desde aqui al momento que la consulta regrese algo.

    constructor() { }

    ngOnInit() { }
}
