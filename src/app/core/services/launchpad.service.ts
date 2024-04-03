import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import {
  CustomHttpResponse,
  ILaunchPad,
  QueryObject,
} from '../model/launchpad.model';
import { Observable } from 'rxjs';

export const LAUNCHES = 'launches';

@Injectable({
  providedIn: 'root',
})
export class LaunchpadService {
  constructor(private httpClient: HttpClient) {}

  queryAllLaunchpads(
    query: QueryObject,
  ): Observable<CustomHttpResponse<ILaunchPad>> {
    return this.httpClient.post<CustomHttpResponse<ILaunchPad>>(
      `${environment.API_URL}/launchpads/query`,
      query,
    );
  }

  queryAllRegions(
    query: QueryObject,
  ): Observable<CustomHttpResponse<ILaunchPad>> {
    return this.httpClient.post<CustomHttpResponse<ILaunchPad>>(
      `${environment.API_URL}/launchpads/query`,
      query,
    );
  }
}
