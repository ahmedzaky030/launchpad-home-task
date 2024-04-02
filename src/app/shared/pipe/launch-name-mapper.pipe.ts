import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'launchNameMapper',
})
export class LaunchNameMapperPipe implements PipeTransform {
  transform(value: { id: string; name: string }[]): unknown {
    return value.map((v) => v.name);
  }
}
