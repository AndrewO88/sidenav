import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'arrayNotHidden'})
export class VisiblePipe implements PipeTransform {
  transform(arr: Array<any>, path?: string): Array<any> {

    if (path) {
      return Array.isArray(arr) ? arr.filter(t => !t[path].hidden) : [];
    }

    return Array.isArray(arr) ? arr.filter(t => !t.hidden) : [];
  }
}
