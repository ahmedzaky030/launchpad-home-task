import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { ILaunchPad } from '../model/launchpad.model';
import { Observable } from 'rxjs';

export const LAUNCHES = 'launches';
@Injectable({
  providedIn: 'root',
})
export class LaunchpadService {
  constructor(private httpClient: HttpClient) {}

  getAllLaunchpads() : Observable<ILaunchPad[]>{
    return this.httpClient.get<ILaunchPad[]>(`${environment.API_URL}/launchpads`);
  }

  // getLaunchesList(){
  //   return this.httpClient.get<any[]>(`${environment.API_URL}/launches`)
  //   .pipe(tap((arr) => {
  //     let obj = arr.map(v => {id: v.id; name: v.name})
  //     localStorage.setItem(LAUNCHES, JSON.stringify(obj));
  //   }));
  // }

  // getLaunchNameById(id: string): string {
  //   if(!localStorage.getItem(LAUNCHES)){
  //    return this.getLaunchNameById(id);
  //   } else {
  //     const launches = JSON.parse(localStorage.getItem(LAUNCHES) || '') ;
  //     return launches.find((v: {id: string, name: string} )=> v.id == id).name;
  //   }
  // }
}
