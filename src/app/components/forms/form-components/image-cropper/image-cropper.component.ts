import { Component, OnInit, ChangeDetectorRef, Input, EventEmitter, Output } from '@angular/core';
import { NgxImageCompressService } from 'ngx-image-compress';
import { ImageCroppedEvent, ImageTransform } from 'ngx-image-cropper'
import { ImageCropperSettings } from 'src/app/model/imageCropperSettings';
import { ActionService } from 'src/app/services/action/action.service';

@Component({
    selector: 'app-image-cropper',
    templateUrl: './image-cropper.component.html',
})
export class ImageCropperComponent implements OnInit {
    @Input() public imageEvent: Event | null = null;
    @Input() public imageSettings: ImageCropperSettings;
    @Input() public imageURLToEdit: string = null;
    @Output() public imgResultAfterCompress: EventEmitter<string|null> = new EventEmitter();

    public imageCompressed: string;
    private canvasRotation = 0;
    private transform: ImageTransform = {};
    private rotation = 0;

    constructor(private cdRef: ChangeDetectorRef, private actionService: ActionService, private imageCompress: NgxImageCompressService) { }

    ngOnInit() {
        /*
        * - Load image when user already have one
        * NOTE: This does not allow the image to be loaded through the cropper
        * when the user already has one. Delete when deciding what to do with
        * the image when editing
        */
        this.imageURLToEdit = null;
    }

    imageCropped(event: ImageCroppedEvent, ) {
        this.imageCompress.compressFile(event.base64, 50, 50).then( result => {
                this.imageCompressed = result;
                this.imgResultAfterCompress.emit(this.imageCompressed);
            }
        );
    }

    imageLoaded() {
        // show cropper
    }

    cropperReady() {
        // cropper ready
    }

    loadImageFailed() {
        this.actionService.getSwalError('El formato no es válido', 'La imagen debe ser png, jpg o jpeg');
    }

    rotateLeft() {
        this.canvasRotation--;
        this.flipAfterRotate();
        this.cdRef.detectChanges();
    }

    rotateRight() {
        this.canvasRotation++;
        this.flipAfterRotate();
        this.cdRef.detectChanges();
    }

    flipAfterRotate() {
        const flippedH = this.transform.flipH;
        const flippedV = this.transform.flipV;
        this.transform = {
            ...this.transform,
            flipH: flippedV,
            flipV: flippedH
        };
    }
}
