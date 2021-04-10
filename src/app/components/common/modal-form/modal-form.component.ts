import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ImageCropperSettings } from 'src/app/model/imageCropperSettings';
import { FormService } from 'src/app/components/forms/services/form/form.service';

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

    constructor(private formService: FormService) { }

    ngOnInit() {
        this.isImageCropperType = this.formService.isImageCropperType(this.formType);
    }

    getImageCroppedAndCompressed(image: string): void {
        this.imgResultAfterCompress.emit(image);
    }
}
