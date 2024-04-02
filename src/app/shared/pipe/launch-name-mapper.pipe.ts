import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'launchNameMapper',
})
export class LaunchNameMapperPipe implements PipeTransform {
  transform(value: { id: string; name: string }[], showDetails: boolean): unknown {
    console.log(showDetails);
    return showDetails ? value.map((v) => v.name).join(' \n\n'): value.slice(0, 20).map((v) => v.name).join(' \n\n');
  }
}
