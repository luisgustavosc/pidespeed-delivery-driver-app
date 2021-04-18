import { Directive, ViewContainerRef } from '@angular/core';

@Directive({ selector: '[AppFormComponent]' })
export class AppFormDirective {
    constructor(public viewContainerRef: ViewContainerRef) {}
}
