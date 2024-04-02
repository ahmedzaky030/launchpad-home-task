import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LaunchpadComponent } from './launchpad/launchpad.component';
import { MaterialModule } from '../shared/material/material.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [LaunchpadComponent],
  exports: [LaunchpadComponent],
  imports: [
    CommonModule,
    //TODO: should be shared module or replace shared module
    MaterialModule,
    SharedModule,
  ],
})
export class LaunchpadModule {}
