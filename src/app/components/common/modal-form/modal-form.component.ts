import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ImageCropperSettings } from 'src/app/model/imageCropperSettings';

@Component({
    selector: 'app-modal-form',
    templateUrl: './modal-form.component.html',
})
export class ModalFormComponent implements OnInit {
    @Input() public formType: string;
    @Input() public isHeaderVisible = true;
    public isImageCropperType: boolean;
    public modalTitle: string;
    public modalDescription: string;

    // Only for ImageCropperType
    @Input() public imageEvent: Event | null = null; // when a new image is loaded
    @Input() public imageURLToEdit: string | null = null; // when loading an image that comes from our db
    @Input() public imageSettings: ImageCropperSettings;
    @Output() public imgResultAfterCompress: EventEmitter<string|null> = new EventEmitter();

    constructor() { }

    ngOnInit() {
        this.isImageCropperType = true; // necesita actualizar a dynamic component
    }

    getImageCroppedAndCompressed(image: string): void {
        this.imgResultAfterCompress.emit(image);
    }
}
