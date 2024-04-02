import { Component, OnInit } from '@angular/core';
import { LaunchpadService } from 'src/app/core/services/launchpad.service';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { ILaunchPad } from 'src/app/core/model/launchpad.model';
import { LaunchNameMapperPipe } from 'src/app/shared/pipe/launch-name-mapper.pipe';

@Component({
  selector: 'app-launchpad',
  templateUrl: './launchpad.component.html',
  styleUrls: ['./launchpad.component.css'],
  providers:[MatTable, LaunchNameMapperPipe],
  
})
export class LaunchpadComponent implements OnInit {
  displayedColumns: string[] = ['full_name', 'region', 'wikipedia'];
  dataSource!: MatTableDataSource<ILaunchPad>;
  constructor(private launchpadService: LaunchpadService) {}

  ngOnInit(): void {
   // this.getLaunchesList().pipe(flatMap(v => v.),concatMap(() => this.getLaunchpadList()))
   this.getLaunchpadList();
  }

  getLaunchpadList() {
   return this.launchpadService.getAllLaunchpads().subscribe((v: ILaunchPad[]) =>{
    this.dataSource = new MatTableDataSource(v);
});
  }
}
