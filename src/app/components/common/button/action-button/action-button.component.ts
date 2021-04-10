import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-action-button',
    templateUrl: './action-button.component.html',
})
export class ActionButtonComponent implements OnInit {
    @Input() public bgColor = 'red2';
    @Input() public link: string | null = null;
    @Input() public action: () => void = null;
    @Input() public buttonLabel: string;
    @Input() public isDisabled = false;

    constructor(
        private router: Router,
    ) { }

    ngOnInit() { }

    actionButton() {
        if (this.action) {
            this.action();
        } else if (this.link) {
            this.router.navigateByUrl(this.link);
        }
        return;
    }
}
