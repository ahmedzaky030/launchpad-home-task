import { Component, OnDestroy, OnInit } from '@angular/core';
import { LaunchpadService } from 'src/app/core/services/launchpad.service';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import {
  CustomHttpResponse,
  ILaunchPad,
  QueryObject,
} from 'src/app/core/model/launchpad.model';
import { PageEvent } from '@angular/material/paginator';
import { Subject, distinct, finalize, map, takeUntil } from 'rxjs';
import { CONFIG } from 'src/app/core/constants';

@Component({
  selector: 'app-launchpad',
  templateUrl: './launchpad.component.html',
  styleUrls: ['./launchpad.component.css'],
  providers: [MatTable],
})
export class LaunchpadComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = CONFIG.displayedColumns;
  showDetails = false;
  dataSource!: MatTableDataSource<ILaunchPad>;
  pageNumber = CONFIG.paginationInitials.pageNumber;
  queryName = '';
  queryRegion = '';
  pageSize = CONFIG.paginationInitials.pageSize;
  totalDocs = CONFIG.paginationInitials.totalDocs;
  isLoading = false;
  showMoreThreshold = CONFIG.showMoreThreshold;
  destroy$ = new Subject();
  regionOptions: string[] = [];
  searchQueryObj: QueryObject = {
    options: {
      select: { full_name: 1, region: 1, wikipedia: 1 },
      populate: { path: 'launches', select: 'name' },
      limit: this.pageSize,
      page: this.pageNumber,
    },
  };

  regionsListQueryObj: QueryObject = {
    options: {
      select: { region: 1 },
    },
  };
  constructor(private launchpadService: LaunchpadService) {}

  ngOnInit(): void {
    this.getLaunchpadList(this.searchQueryObj);
    this.loadRegionsList(this.regionsListQueryObj);
  }

  getLaunchpadList(query: QueryObject): void {
    this.isLoading = true;
    this.launchpadService
      .queryAllLaunchpads(query)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => (this.isLoading = false)),
      )
      .subscribe((v: CustomHttpResponse<ILaunchPad>) => {
        this.dataSource = new MatTableDataSource(v.docs);
        this.pageNumber = v.page;
        this.pageSize = v.limit;
        this.totalDocs = v.totalDocs;
      });
  }

  loadRegionsList(query: QueryObject): void {
    this.launchpadService
      .queryAllRegions(query)
      .pipe(
        takeUntil(this.destroy$),
        map((v: CustomHttpResponse<ILaunchPad>) => v.docs.map((e) => e.region)),
        distinct(),
      )
      .subscribe((arr) => {
        const regionSet = new Set();
        arr.forEach((v) => regionSet.add(v));
        this.regionOptions = Array.from(regionSet.values()) as string[];
      });
  }

  handlePageEvent(event: PageEvent): void {
    this.pageNumber = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.searchQueryObj.options = {
      ...this.searchQueryObj.options,
      page: this.pageNumber,
      limit: this.pageSize,
    };
    this.getLaunchpadList(this.searchQueryObj);
  }

  showMore() {
    //TODO: Implement showdetails for each element
    this.showDetails = !this.showDetails;
  }

  search(): void {
    this.searchQueryObj.query = {};
    if (this.queryName)
      this.searchQueryObj.query = {
        $text: { $search: `${this.queryName}` },
        ...this.searchQueryObj.query,
      };
    if (this.queryRegion)
      this.searchQueryObj.query = {
        region: this.queryRegion,
        ...this.searchQueryObj.query,
      };
    this.getLaunchpadList(this.searchQueryObj);
  }

  clear(): void {
    this.queryRegion = '';
    this.queryName = '';
    this.searchQueryObj.query = {};
    this.getLaunchpadList(this.searchQueryObj);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }
}
