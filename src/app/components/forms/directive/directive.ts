import { Directive, ViewContainerRef } from '@angular/core';

@Directive({ selector: '[appFormComponent]' })
export class AppFormDirective {
    constructor(public viewContainerRef: ViewContainerRef) {}
}
