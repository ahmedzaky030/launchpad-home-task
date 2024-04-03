import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaunchpadComponent } from './launchpad.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LaunchpadService } from 'src/app/core/services/launchpad.service';
import { MockLaunchPadService } from 'testing/mock/launchpadservice.mock';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('LaunchpadComponent', () => {
  let component: LaunchpadComponent;
  let service: LaunchpadService;
  let fixture: ComponentFixture<LaunchpadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LaunchpadComponent],
      imports: [
        BrowserAnimationsModule,
        HttpClientTestingModule,
        MatTableModule,
        MatProgressSpinnerModule,
        MatButtonModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
      ],
      providers: [
        { provide: LaunchpadService, useClass: MockLaunchPadService },
      ],
    });
    fixture = TestBed.createComponent(LaunchpadComponent);
    service = TestBed.inject(LaunchpadService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
