import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { JobService } from '../../services/job.service';
import { Job } from '../../models/Job';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  jobs: Job[];
  page = 1;
  location = '';
  description = '';
  lastPageReached = false;
  fullTime = false;
  searchForm: FormGroup;
  loading;


  constructor(private userService: UserService, private jobService: JobService) {
  }

  ngOnInit(): void {
    this.getJobs(`${this.page}`);
    this.initSearchForm();
  }

  getJobs(page, description?, location?): void {
    this.loading = true;
    this.jobService.getJobs(description || '', `${page}`, location || '')
      .subscribe(data => {
          if (data.length < 50) {
            this.lastPageReached = true;
          }
          this.jobs = data;
        },
        () => console.log('error getting data'),
        () => {
          this.loading = false;
        }
      );
  }

  getNextPage(): void {
    this.page = this.page + 1;
    this.getJobs(`${this.page}`, this.description, this.location);
  }

  getPrevPage(): void {
    if (this.lastPageReached) {
      this.lastPageReached = false;
    }
    this.page = this.page - 1;
    this.getJobs(`${this.page}`, this.description, this.location);
  }

  initSearchForm(): void {
    this.searchForm = new FormGroup({
      search: new FormControl(''),
      location: new FormControl(''),
      fullTime: new FormControl('')
    });
  }

  handleSearch(value): void {
    this.lastPageReached = false;
    this.page = 1;
    this.location = value.location;
    this.description = value.search;
    this.getJobs(`${this.page}`, value.search, value.location);
  }

  toggle($event: boolean) {
    this.fullTime = !this.fullTime;
    console.log(this.fullTime);
  }

  backToTop(): void {
    window.scroll(0, 0);
  }
}
