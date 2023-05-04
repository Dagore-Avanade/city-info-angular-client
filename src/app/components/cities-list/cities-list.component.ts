import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import ICityWithoutPointOfInterest from 'src/app/interfaces/ICityWithoutPointOfInterest';
import { CityService } from 'src/app/services/city.service';

@Component({
  selector: 'app-cities-list',
  templateUrl: './cities-list.component.html',
  styleUrls: ['./cities-list.component.css'],
})
export class CitiesListComponent implements OnInit, OnDestroy {
  loading = false;
  cities: ICityWithoutPointOfInterest[] = [];
  errorMessage?: string;
  stop$ = new Subject<void>();

  constructor(private readonly cityService: CityService) {}

  ngOnInit(): void {
    this.loading = true;
    this.cityService
      .all()
      .pipe(takeUntil(this.stop$))
      .subscribe({
        next: response => {
          this.cities = response;
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
