import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import { LaunchpadComponent } from './launchpad.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LaunchpadService } from 'src/app/core/services/launchpad.service';
import { MockLaunchPadService } from 'testing/mock/launchpadservice.mock';
import {
  MatSelectModule,
} from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs/internal/observable/of';
import { MockData, MockRegionsList } from 'testing/mockData';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PageEvent } from '@angular/material/paginator';

describe('LaunchpadComponent', () => {
  let component: LaunchpadComponent;
  let service: LaunchpadService;
  let fixture: ComponentFixture<LaunchpadComponent>;
  let spy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LaunchpadComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
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

  it('should call loadLaunchPadList and regionList data', () => {
    spyOn(component, 'loadLaunchpadList');
    spyOn(component, 'loadRegionsList');

    component.ngOnInit();

    expect(component.loadLaunchpadList).toHaveBeenCalledWith(
      component.searchQueryObj,
    );
    expect(component.loadRegionsList).toHaveBeenCalledWith(
      component.regionsListQueryObj,
    );
  });

  it('should call queryAllLaunchpads service method when call loadLaunchPadList', () => {
    spy = spyOn(service, 'queryAllLaunchpads').and.returnValue(of(MockData));

    component.loadLaunchpadList(component.searchQueryObj);

    expect(spy).toHaveBeenCalledWith(component.searchQueryObj);
    expect(component.isLoading).toBeFalsy();
    expect(component.pageSize).toEqual(MockData.limit);
    expect(component.pageNumber).toEqual(MockData.page);
    expect(component.totalDocs).toEqual(MockData.docs.length);
  });

  it('should call queryAllRegions service method when call loadRegionsList', () => {
    spy = spyOn(service, 'queryAllRegions').and.returnValue(of(MockData));

    component.loadRegionsList(component.regionsListQueryObj);

    expect(spy).toHaveBeenCalledWith(component.regionsListQueryObj);
    expect(component.regionOptions.length).toEqual(MockRegionsList.length);
  });

  it('should fill searchQueryObj with filter values and call loadLaunchPadList with the new query object', fakeAsync(() => {
    const searchName = 'Name 1';

    spyOn(component, 'loadLaunchpadList').and.callThrough();
    spyOn(component, 'search').and.callThrough();
    const nameInputEl = fixture.nativeElement.querySelector('#nameInput');
    const searchBtn = fixture.nativeElement.querySelector('#searchBtn');

    component.queryName = searchName;
    nameInputEl.dispatchEvent(new Event('input'));
    searchBtn.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    tick();

    fixture.whenStable().then((v) => {
      expect(component.search).toHaveBeenCalled();
      expect(component.loadLaunchpadList).toHaveBeenCalled();
      expect(component.searchQueryObj.query).toEqual({
        $text: { $search: searchName },
      });
    });
  }));

  it('should clear all filter values in searchQueryObj and call loadLaunchPadList with the new query object', () => {
    component.searchQueryObj.query = {
      region: 'region 1',
      $text: { $search: 'query' },
    };
    spyOn(component, 'loadLaunchpadList');

    component.clear();

    expect(component.loadLaunchpadList).toHaveBeenCalledWith(
      component.searchQueryObj,
    );
    expect(component.searchQueryObj.query).toEqual({});
  });

  it('should process page event to call correct page', () => {
    component.searchQueryObj.options = { limit: 5, page: 1 };
    const event = new PageEvent();
    event.pageSize = 10;
    event.pageIndex = 0;

    component.handlePageEvent(event);

    expect(component.searchQueryObj.options.limit).toEqual(event.pageSize);
    expect(component.searchQueryObj.options.page).toEqual(event.pageIndex + 1);
  });
});
