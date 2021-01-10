import { Component, OnInit, ChangeDetectorRef, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgxImageCompressService } from 'ngx-image-compress';
import { imageCropperSettings } from 'src/app/model/imageCropperSettings';
import { FormService } from 'src/app/services/form/form.service';
declare var $: any;

@Component({
    selector: 'app-input-file',
    templateUrl: './input-file.component.html',
    styleUrls: ['./input-file.component.scss'],
})
export class InputFileComponent implements OnInit {
    @Input() private form: FormGroup;
    @Input() private fieldName: string;
    private imageChangedEvent: Event = null;
    private imageURLToEdit: string = null;
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
        // Image URL to edit when one already exists
        // this.croppedImage = '';
        // TODO: Hablar con eduardo por el problema de cors
        // que saldra ya que viene de otro servidor las imagenes.
        // @https://stackoverflow.com/questions/43324285/cors-errors-trying-to-convert-remote-image-to-base64-data
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
