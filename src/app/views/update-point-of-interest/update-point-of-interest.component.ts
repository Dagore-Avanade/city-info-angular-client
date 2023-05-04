import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import IPointOfInterest from 'src/app/interfaces/IPointOfInterest';
import { CityService } from 'src/app/services/city.service';

@Component({
  selector: 'app-update-point-of-interest',
  templateUrl: './update-point-of-interest.component.html',
  styleUrls: ['./update-point-of-interest.component.css'],
})
export class UpdatePointOfInterestComponent implements OnInit, OnDestroy {
  loading = false;
  errorMessage?: string;
  submitted = false;
  actionLoading = false;
  cityId!: number;
  pointOfInterestId!: number;
  pointOfInterest?: IPointOfInterest;
  stop$ = new Subject<void>();

  constructor(
    private readonly cityService: CityService,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.cityId = this.route.snapshot.queryParams['cityId'] as number;
    this.pointOfInterestId = this.route.snapshot.queryParams[
      'pointOfInterestId'
    ] as number;

    this.loading = true;
    this.cityService
      .getPointOfInterest(this.cityId, this.pointOfInterestId)
      .pipe(takeUntil(this.stop$))
      .subscribe({
        next: response => {
          this.pointOfInterest = response;
          this.loading = false;
        },
        error: err => {
          this.errorMessage = err;
          this.loading = false;
        },
      });
  }

  ngOnDestroy(): void {
    this.stop$.next();
    this.stop$.complete();
  }
}
