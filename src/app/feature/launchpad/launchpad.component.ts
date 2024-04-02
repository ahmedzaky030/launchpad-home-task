import { Component, OnDestroy, OnInit } from '@angular/core';
import { LaunchpadService } from 'src/app/core/services/launchpad.service';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import {
  CustomHttpResponse,
  ILaunchPad,
  QueryObject,
} from 'src/app/core/model/launchpad.model';
import { LaunchNameMapperPipe } from 'src/app/shared/pipe/launch-name-mapper.pipe';
import { PageEvent } from '@angular/material/paginator';
import { Subject, finalize, takeUntil } from 'rxjs';

@Component({
  selector: 'app-launchpad',
  templateUrl: './launchpad.component.html',
  styleUrls: ['./launchpad.component.css'],
  providers: [MatTable, LaunchNameMapperPipe],
})
export class LaunchpadComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['full_name', 'region', 'wikipedia'];
  dataSource!: MatTableDataSource<ILaunchPad>;
  pageNumber = 1;
  pageSize = 5;
  totalDocs = 100;
  isLoading = false;
  destroy$ = new Subject();
  constructor(private launchpadService: LaunchpadService) {}

  ngOnInit(): void {
    this.getLaunchpadList();
  }

  getLaunchpadList(): void {
    const queryObj: QueryObject = {
      options: {
        select: { full_name: 1, region: 1, wikipedia: 1 },
        populate: { path: 'launches', select: 'name' },
        limit: this.pageSize,
        page: this.pageNumber,
      },
    };
    this.isLoading = true;
    this.launchpadService
      .queryAllLaunchpads(queryObj)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => (this.isLoading = false)),
      )
      .subscribe((v: CustomHttpResponse<ILaunchPad>) => {
        this.dataSource = new MatTableDataSource(v.docs);
        console.log(v);
        this.pageNumber = v.page;
        this.pageSize = v.limit;
        this.totalDocs = v.totalDocs;
      });
  }

  handlePageEvent(event: PageEvent): void {
    this.pageNumber = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.getLaunchpadList();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }
}
