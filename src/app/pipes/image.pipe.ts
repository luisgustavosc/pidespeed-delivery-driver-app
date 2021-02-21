import { Pipe, PipeTransform } from '@angular/core';
import { IMAGE_SERVER } from 'src/app/services/API';

@Pipe({
    name: 'image_from_server'
})
export class ImagePipe implements PipeTransform {
    transform(value: string, args?: any): any {
        return `${ IMAGE_SERVER }/${ value }`;
    }
}
