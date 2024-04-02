import { Component, OnInit } from '@angular/core';
import { LaunchpadService } from 'src/app/core/services/launchpad.service';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import {
  CustomHttpResponse,
  ILaunchPad,
  QueryObject,
} from 'src/app/core/model/launchpad.model';
import { LaunchNameMapperPipe } from 'src/app/shared/pipe/launch-name-mapper.pipe';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-launchpad',
  templateUrl: './launchpad.component.html',
  styleUrls: ['./launchpad.component.css'],
  providers: [MatTable, LaunchNameMapperPipe],
})
export class LaunchpadComponent implements OnInit {
  displayedColumns: string[] = ['full_name', 'region', 'wikipedia'];
  dataSource!: MatTableDataSource<ILaunchPad>;
  pageNumber = 1;
  pageSize = 5;
  totalDocs = 100;
  constructor(private launchpadService: LaunchpadService) {}

  ngOnInit(): void {
    this.getLaunchpadList();
  }

  getLaunchpadList() {
    const queryObj: QueryObject = {
      options: {
        select: { full_name: 1, region: 1, wikipedia: 1 },
        populate: { path: 'launches', select: 'name' },
        limit: this.pageSize,
        page: this.pageNumber,
      },
    };
    return this.launchpadService
      .queryAllLaunchpads(queryObj)
      .subscribe((v: CustomHttpResponse<ILaunchPad>) => {
        this.dataSource = new MatTableDataSource(v.docs);
        this.pageNumber = v.page;
        this.pageSize = v.limit;
        this.totalDocs = v.totalDocs;
      });
  }

  handlePageEvent(event: PageEvent) {
    this.pageNumber = event.pageIndex + 1;
    this.getLaunchpadList();
  }
}
