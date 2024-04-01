import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class LaunchpadService {
  constructor(private httpClient: HttpClient) {}

  getAllLaunchpads() {
    return this.httpClient.get('https://api.spacexdata.com/v4/landpads');
  }
}
