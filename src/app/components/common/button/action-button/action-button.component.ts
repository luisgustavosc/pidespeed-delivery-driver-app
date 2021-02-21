import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-action-button',
    templateUrl: './action-button.component.html',
})
export class ActionButtonComponent implements OnInit {
    @Input() private bgColor: string = 'red2';
    @Input() private link: string | null = null;
    @Input() private action: Function = null;
    @Input() private buttonLabel: string;

    constructor(
        private router: Router,
    ) { }

    ngOnInit() { }

    private actionButton() {
        if (this.action) {
            this.action();
        } else if (this.link) {
            this.router.navigateByUrl(this.link);
        }
        return;
    }
}
