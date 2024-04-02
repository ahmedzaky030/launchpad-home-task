import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { LaunchNameMapperPipe } from './pipe/launch-name-mapper.pipe';




@NgModule({
  declarations: [
    LaunchNameMapperPipe
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports:[MaterialModule, LaunchNameMapperPipe]
})
export class SharedModule { }
