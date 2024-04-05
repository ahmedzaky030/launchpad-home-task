import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { LaunchesFormatterPipe } from './pipe/launch-name-mapper.pipe';

@NgModule({
  declarations: [LaunchesFormatterPipe],
  imports: [CommonModule, MaterialModule],
  exports: [MaterialModule, LaunchesFormatterPipe],
})
export class SharedModule {}
