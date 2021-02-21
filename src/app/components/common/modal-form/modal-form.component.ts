import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { imageCropperSettings } from 'src/app/model/imageCropperSettings';
import { FormService } from 'src/app/components/forms/services/form/form.service';

@Component({
    selector: 'app-modal-form',
    templateUrl: './modal-form.component.html',
})
export class ModalFormComponent implements OnInit {
    @Input() private formType: string;
    @Input() private isHeaderVisible: boolean = true;
    private isImageCropperType: boolean;
    private modalTitle: string;
    private modalDescription: string;

    // Only for ImageCropperType
    @Input() private imageEvent: Event | null = null; // when a new image is loaded
    @Input() private imageURLToEdit: string | null = null; // when loading an image that comes from our db
    @Input() private imageSettings: imageCropperSettings;
    @Output() private imgResultAfterCompress: EventEmitter<string|null> = new EventEmitter();

    constructor(private formService: FormService) { }

    ngOnInit() {
        this.isImageCropperType = this.formService.isImageCropperType(this.formType);
    }

    private getImageCroppedAndCompressed(image: string): void {
        this.imgResultAfterCompress.emit(image);
    }
}
