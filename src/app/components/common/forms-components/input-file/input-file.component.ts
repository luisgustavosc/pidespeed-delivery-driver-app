import { Component, OnInit, ChangeDetectorRef, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgxImageCompressService } from 'ngx-image-compress';
import { imageCropperSettings } from 'src/app/model/imageCropperSettings';
import { FormService } from 'src/app/services/form/form.service';
import { IMAGE_SERVER } from 'src/app/services/API';
declare var $: any;

@Component({
    selector: 'app-input-file',
    templateUrl: './input-file.component.html',
    styleUrls: ['./input-file.component.scss'],
})
export class InputFileComponent implements OnInit {
    @Input() private form: FormGroup;
    @Input() private fieldName: string;
    @Input() private imageURLToEdit: string = null;
    private imageChangedEvent: Event = null;
    private fileName: string;
    private fileType: string = 'png';
    private formType: string = this.formService.getImageCropperType();
    private croppedImage: string = null;
    private imageSettings: imageCropperSettings = {
        aspectRatio: 1 / 1,
        resizeToWidth: '800',
        resizeToHeight: '800',
        format: this.fileType,
    };

    @Output() private imgResultAfterCompress: EventEmitter<string> = new EventEmitter();


    constructor(private imageCompress: NgxImageCompressService, private cdRef: ChangeDetectorRef, private formService: FormService,) { }

    ngOnInit() {
        /*
        * - Load image when user already have one
        * NOTE: Commented for now due to CORS errors. For now we will only allow
        * the user to upload another image, not edit the current one
        if (this.imageURLToEdit) {
            this.croppedImage = this.imageURLToEdit = IMAGE_SERVER + '/' + this.imageURLToEdit;
        }*/
        if (this.imageURLToEdit) this.croppedImage = IMAGE_SERVER + '/' + this.imageURLToEdit;
    }

    private openFileOption(): void {
        document.getElementById('upload_image').click();
    }

    private loadFile(event): void {
        this.imageChangedEvent = event;
        this.fileName = event.target.files[0].name.replace(/ /g, '-');
        this.fileType = event.target.files[0].type;
        this.imageSettings.format = this.fileType;
        $('#AppModal').modal({ backdrop: 'static', keyboard: false }, 'show');
    }

    private clearPreview(): void {
        this.imageChangedEvent = null;
        this.croppedImage = null;
        (<HTMLInputElement>document.getElementById('upload_image')).value = null;
    }

    private editFile(): void {
        this.imageURLToEdit = this.croppedImage;
        this.imageChangedEvent = null;
        $('#AppModal').modal({ backdrop: 'static', keyboard: false }, 'show');
    }

    private getImageCroppedAndCompressed(image: string): void {
        this.imgResultAfterCompress.emit(image);
        this.croppedImage = image;
    }
}
