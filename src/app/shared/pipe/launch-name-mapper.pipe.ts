import { Pipe, PipeTransform } from '@angular/core';
import { CONFIG } from 'src/app/core/constants';

@Pipe({
  name: 'launchesFormatter',
})
export class LaunchesFormatterPipe implements PipeTransform {
  transform(
    value: { id: string; name: string }[],
    showDetails: boolean,
  ): string {
    return showDetails
      ? value.map((v) => v.name).join(' &nbsp; ')
      : value
          .slice(0, CONFIG.showMoreThreshold)
          .map((v) => v.name)
          .join(' &nbsp; ');
  }
}
