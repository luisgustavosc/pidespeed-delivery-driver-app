import { Component, OnInit, ChangeDetectorRef, Input, EventEmitter, Output } from '@angular/core';
import { NgxImageCompressService } from 'ngx-image-compress';
import { ImageCroppedEvent, ImageTransform } from "ngx-image-cropper"
import { imageCropperSettings } from 'src/app/model/imageCropperSettings';
import { ActionService } from "src/app/services/action/action.service";

@Component({
    selector: 'app-image-cropper',
    templateUrl: './image-cropper.component.html',
})
export class ImageCropperComponent implements OnInit {
    @Input() private imageEvent: Event | null = null;
    @Input() private imageSettings: imageCropperSettings;
    @Input() private imageURLToEdit: string = null;
    @Output() private croppedImage: EventEmitter<string|null> = new EventEmitter();
    @Output() private imgResultAfterCompress: EventEmitter<string|null> = new EventEmitter();

    private imageCompressed: string;
    private canvasRotation: number = 0;
    private transform: ImageTransform = {};
    private rotation: number = 0;

    constructor(private cdRef: ChangeDetectorRef, private actionService: ActionService, private imageCompress: NgxImageCompressService) { }

    ngOnInit() { }

    private imageCropped(event: ImageCroppedEvent, ) {
        this.croppedImage.emit(event.base64);
        this.imageCompress.compressFile(event.base64, 50, 50).then( result => {
                this.imageCompressed = result;
                this.imgResultAfterCompress.emit(this.imageCompressed);
            }
        );
    }

    private imageLoaded() {
        // show cropper
    }

    private cropperReady() {
        // cropper ready
    }

    private loadImageFailed() {
        this.actionService.getErrorSwal('El formato no es válido', 'La imagen debe ser png, jpg o jpeg');
    }

    private rotateLeft() {
        this.canvasRotation--;
        this.flipAfterRotate();
        this.cdRef.detectChanges();
    }

    private rotateRight() {
        this.canvasRotation++;
        this.flipAfterRotate();
        this.cdRef.detectChanges();
    }

    private flipAfterRotate() {
        const flippedH = this.transform.flipH;
        const flippedV = this.transform.flipV;
        this.transform = {
            ...this.transform,
            flipH: flippedV,
            flipV: flippedH
        };
    }
}
