import { Observable, of } from 'rxjs';
import {
  CustomHttpResponse,
  ILaunchPad,
  QueryObject,
} from 'src/app/core/model/launchpad.model';
import { MockData } from 'testing/mockData';

export class MockLaunchPadService {
  queryAllLaunchpads(
    query: QueryObject,
  ): Observable<CustomHttpResponse<ILaunchPad>> {
    return of(MockData);
  }

  queryAllRegions(
    query: QueryObject,
  ): Observable<CustomHttpResponse<ILaunchPad>> {
    return of(MockData);
  }
}
