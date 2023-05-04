import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  submitted = false;
  actionLoading = false;
  errorMessage?: string;
  form!: FormGroup;
  cityId!: number;
  pointOfInterestId!: number;
  pointOfInterest?: IPointOfInterest;
  stop$ = new Subject<void>();

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly cityService: CityService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  get name() {
    return this.form.get('name');
  }

  get description() {
    return this.form.get('description');
  }

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
          this.form = this.formBuilder.group({
            name: ['', Validators.required],
            description: [''],
          });
          this.name?.setValue(this.pointOfInterest.name);
          this.description?.setValue(this.pointOfInterest.description);
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
    const name = this.name?.value;
    const description = this.description?.value;
    this.cityService
      .updatePointOfInterest(this.cityId, {
        id: this.pointOfInterestId,
        name,
        description,
      })
      .pipe(takeUntil(this.stop$))
      .subscribe({
        next: () => this.router.navigate(['/city', this.cityId]),
        error: err => (this.errorMessage = err),
      });
  }

  ngOnDestroy(): void {
    this.stop$.next();
    this.stop$.complete();
  }
}
