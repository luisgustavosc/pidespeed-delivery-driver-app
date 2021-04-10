import { Component, OnInit, ChangeDetectorRef, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgxImageCompressService } from 'ngx-image-compress';
import { ImageCropperSettings } from 'src/app/model/imageCropperSettings';
import { FormService } from 'src/app/components/forms/services/form/form.service';
import { IMAGE_SERVER } from 'src/app/services/API';
declare var $: any;

@Component({
    selector: 'app-input-file',
    templateUrl: './input-file.component.html',
    styleUrls: ['./input-file.component.scss'],
})
export class InputFileComponent implements OnInit {
    @Input() public form: FormGroup;
    @Input() public fieldName: string;
    @Input() public imageURLToEdit?: string = null;
    public imageChangedEvent?: Event = null;
    public fileName: string;
    public fileType = 'png';
    public formType: string = FormService.IMAGE_CROPPER_TYPE;
    public croppedImage?: string = null;

    @Input() public imageSettings: ImageCropperSettings = {
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

    openFileOption(): void {
        document.getElementById('upload_image').click();
    }

    loadFile(event): void {
        this.imageChangedEvent = event;
        this.fileName = event.target.files[0].name.replace(/ /g, '-');
        this.fileType = event.target.files[0].type;
        this.imageSettings.format = this.fileType;
        $('#AppModal').modal({ backdrop: 'static', keyboard: false }, 'show');
    }

    clearPreview(): void {
        this.imageChangedEvent = null;
        this.croppedImage = null;
        (document.getElementById('upload_image') as HTMLInputElement).value = null;
    }

    editFile(): void {
        this.imageURLToEdit = this.croppedImage;
        this.imageChangedEvent = null;
        $('#AppModal').modal({ backdrop: 'static', keyboard: false }, 'show');
    }

    getImageCroppedAndCompressed(image: string): void {
        this.imgResultAfterCompress.emit(image);
        this.croppedImage = image;
    }
}
