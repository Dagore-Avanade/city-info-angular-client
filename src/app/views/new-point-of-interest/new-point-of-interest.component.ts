import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import ICityWithoutPointOfInterest from 'src/app/interfaces/ICityWithoutPointOfInterest';
import { CityService } from 'src/app/services/city.service';

@Component({
  selector: 'app-new-point-of-interest',
  templateUrl: './new-point-of-interest.component.html',
  styleUrls: ['./new-point-of-interest.component.css'],
})
export class NewPointOfInterestComponent implements OnInit {
  submitted = false;
  loading = false;
  actionLoading = false;
  errorMessage?: string;
  cities: ICityWithoutPointOfInterest[] = [];
  cities$: Subscription | null = null;
  form!: FormGroup;
  createdCity$: Subscription | null = null;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly cityService: CityService,
    private readonly router: Router
  ) {}

  get name() {
    return this.form.get('name');
  }

  get city() {
    return this.form.get('city');
  }

  ngOnInit(): void {
    this.loading = true;
    this.cities$ = this.cityService.all().subscribe({
      next: response => {
        this.cities = response;
        this.form = this.formBuilder.group({
          city: ['', Validators.required],
          name: ['', Validators.required],
          description: [''],
        });
        this.loading = false;
      },
      error: err => {
        this.errorMessage = err;
        this.loading = false;
      },
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) return;

    this.actionLoading = true;
    const cityId = this.form.get('city')!.value;
    const name = this.name!.value;
    const description = this.form.get('description')?.value;
    this.createdCity$ = this.cityService
      .createPointOfInterest({
        cityId,
        name,
        description,
      })
      .subscribe({
        next: () => this.router.navigate(['/city', cityId]),
        error: err => {
          this.errorMessage = err;
          this.actionLoading = false;
        },
      });
  }
}
