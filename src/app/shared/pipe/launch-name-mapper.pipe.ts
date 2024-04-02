import { Pipe, PipeTransform } from '@angular/core';
import { LaunchpadService } from 'src/app/core/services/launchpad.service';

@Pipe({
  name: 'launchNameMapper'
})
export class LaunchNameMapperPipe implements PipeTransform {
  constructor(private launchpadService: LaunchpadService){}

  transform(value: string[]): unknown {
    // console.log(value);
    // debugger;
    // const names = value.map(v => this.launchpadService.getLaunchNameById(v));
    return value;
  }

}
