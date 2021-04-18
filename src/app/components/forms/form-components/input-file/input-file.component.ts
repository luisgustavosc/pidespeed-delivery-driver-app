import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ImageCropperSettings } from 'src/app/model/imageCropperSettings';
import { IMAGE_SERVER } from 'src/app/services/API';
import { ResolveFormComponentService } from '../../services/resolve-component/resolveFormComponent.service';
declare var $: any;

@Component({
    selector: 'app-input-file',
    templateUrl: './input-file.component.html',
    styleUrls: ['./input-file.component.scss'],
})
export class InputFileComponent implements OnInit {
    @Input() public form: FormGroup;
    @Input() public fieldName: string;

    /**
     * For now we will only allow the user to upload another image,
     * not edit the current one but this property is for that end, maybe a future feature
     *
     *    if (this.imageURLToEdit) {
     *      this.croppedImage = this.imageURLToEdit = IMAGE_SERVER + '/' + this.imageURLToEdit;
     *    }
     */
    @Input() public imageURLToEdit?: string = null;

    public imageChangedEvent?: Event = null;
    public fileName: string;
    public fileType = 'png';
    public formType: string = ResolveFormComponentService.IMAGE_CROPPER_TYPE;
    public croppedImage?: string = null;

    @Input() public imageSettings: ImageCropperSettings = {
        aspectRatio: 1 / 1,
        resizeToWidth: '800',
        resizeToHeight: '800',
        format: this.fileType,
    };

    @Output() private imgResultAfterCompress: EventEmitter<string> = new EventEmitter();

    constructor() { }

    ngOnInit() {
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
