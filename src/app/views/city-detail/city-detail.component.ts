import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import ICity from 'src/app/interfaces/ICity';
import { CityService } from 'src/app/services/city.service';

@Component({
  selector: 'app-city-detail',
  templateUrl: './city-detail.component.html',
  styleUrls: ['./city-detail.component.css'],
})
export class CityDetailComponent implements OnInit, OnDestroy {
  loading = false;
  actionLoading = false;
  errorMessage?: string;
  actionError: {
    message: string;
    cityId: number;
    pointOfInterestId: number;
  } | null = null;
  city$: Subscription | null = null;
  city?: ICity;
  removedCity$: Subscription | null = null;

  constructor(
    private readonly cityService: CityService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  init(): void {
    this.loading = true;
    const id = this.route.snapshot.params['id'] as number;
    this.city$ = this.cityService.getById(id).subscribe({
      next: response => {
        this.city = response;
        this.loading = false;
      },
      error: err => {
        this.errorMessage = err;
        this.loading = false;
      },
    });
  }

  ngOnInit(): void {
    this.init();
  }

  update(cityId: number, pointOfInterestId: number): void {
    this.router.navigate(['/updatePointOfInterest'], {
      queryParams: { cityId, pointOfInterestId },
    });
  }

  remove(cityId: number, pointOfInterestId: number): void {
    this.actionError = null;
    this.actionLoading = true;
    this.removedCity$ = this.cityService
      .removePointOfInterest(cityId, pointOfInterestId)
      .subscribe({
        next: () => {
          this.init();
          this.actionLoading = false;
        },
        error: err => {
          this.actionError = {
            cityId,
            pointOfInterestId,
            message: err,
          };
          this.actionLoading = false;
        },
      });
  }

  ngOnDestroy(): void {
    this.city$?.unsubscribe();
    this.removedCity$?.unsubscribe();
  }
}
