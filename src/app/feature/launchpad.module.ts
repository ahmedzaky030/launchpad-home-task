import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LaunchpadComponent } from './launchpad/launchpad.component';
import { MaterialModule } from '../shared/material/material.module';
import { SharedModule } from '../shared/shared.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [LaunchpadComponent],
  exports: [LaunchpadComponent],
  imports: [
    CommonModule,
    //TODO: should be shared module or replace shared module
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MaterialModule,
    SharedModule,
  ],
})
export class LaunchpadModule {}
