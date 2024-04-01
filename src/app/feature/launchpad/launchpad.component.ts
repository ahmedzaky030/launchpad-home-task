import { Component, OnInit } from '@angular/core';
import { LaunchpadService } from 'src/app/core/launchpad.service';

@Component({
  selector: 'app-launchpad',
  templateUrl: './launchpad.component.html',
  styleUrls: ['./launchpad.component.css'],
})
export class LaunchpadComponent implements OnInit {
  constructor(private launchpadService: LaunchpadService) {}

  ngOnInit(): void {
    this.getLaunchpadList();
  }

  getLaunchpadList() {
    this.launchpadService
      .getAllLaunchpads()
      .subscribe((v) => console.log('ss', v));
  }
}
