import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  errorMessage?: string;
  city$: Subscription | null = null;
  city?: ICity;

  constructor(
    private readonly cityService: CityService,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'] as number;
    this.city$ = this.cityService.getById(id).subscribe({
      next: response => (this.city = response),
      error: err => (this.errorMessage = err),
    });
  }

  update(cityId: number, pointOfInterestId: number): void {
    console.log('Update', cityId, pointOfInterestId);
  }

  remove(cityId: number, pointOfInterestId: number): void {
    console.log('Remove', cityId, pointOfInterestId);
  }

  ngOnDestroy(): void {
    this.city$?.unsubscribe();
  }
}
