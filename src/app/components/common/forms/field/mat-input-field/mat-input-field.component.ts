import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from "@angular/forms";

@Component({
  selector: 'app-mat-input-field',
  templateUrl: './mat-input-field.component.html',
  styleUrls: ['./mat-input-field.component.scss'],
})
export class MatInputFieldComponent implements OnInit {
    @Input() private label: string;
    @Input() private fieldName: string;
    @Input() private form: FormGroup;

  constructor() { }

  ngOnInit() { }

}
