import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LaunchpadService } from './launchpad.service';
import { QueryObject } from '../model/launchpad.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MockData } from 'testing/mockData';

describe('LaunchpadService', () => {
  let service: LaunchpadService;
  let httpClient: HttpClient;
  let spy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpClient],
    });
    service = TestBed.inject(LaunchpadService);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call http client with queryobj to return launchpads results when call function queryAllLaunchpads', () => {
    const queryObject: QueryObject = { options: { page: 1, limit: 5 } };
    spy = spyOn(httpClient, 'post').and.callThrough();

    service.queryAllLaunchpads(queryObject);

    expect(spy).toHaveBeenCalledWith(
      `${environment.API_URL}/launchpads/query`,
      queryObject,
    );
  });
});
