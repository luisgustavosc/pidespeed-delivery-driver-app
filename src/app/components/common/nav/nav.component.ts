import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
    @Input() private pageTitle: string;
    @Input() private isVisibleGoBackButton: boolean = false;
    @Input() private goBackUrl?: string = null

    constructor() { }

    ngOnInit() { }

    toggleNav() {
        const nav = document.getElementById('menuMovil');
        const hamburgerMenu = document.querySelector('.hamburger_menu');
        const navChild = document.querySelector('#menuMovil > div');
        if (nav.classList.contains('d-none')) {
            nav.classList.remove('d-none');
            navChild.classList.add('fade-animation-in-right');
            navChild.classList.remove('fade-animation-out-right');
            hamburgerMenu.classList.add('open');
        } else {
            setTimeout(() => {
                nav.classList.add('d-none');
            }, 200);
            hamburgerMenu.classList.remove('open');
            navChild.classList.add('fade-animation-out-right');
            navChild.classList.remove('fade-animation-in-right');
        }
    }
}
