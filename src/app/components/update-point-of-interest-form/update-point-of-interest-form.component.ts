import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import IPointOfInterest from 'src/app/interfaces/IPointOfInterest';
import { CityService } from 'src/app/services/city.service';

@Component({
  selector: 'app-update-point-of-interest-form',
  templateUrl: './update-point-of-interest-form.component.html',
  styleUrls: ['./update-point-of-interest-form.component.css'],
})
export class UpdatePointOfInterestFormComponent implements OnInit, OnDestroy {
  @Input() pointOfInterest!: IPointOfInterest;
  @Input() cityId!: number;
  errorMessage?: string;
  actionLoading = false;
  submitted = false;
  form!: FormGroup;
  stop$ = new Subject<void>();

  constructor(
    private readonly cityService: CityService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router
  ) {}

  get name() {
    return this.form.get('name');
  }

  get description() {
    return this.form.get('description');
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
    });
    this.name?.setValue(this.pointOfInterest.name);
    this.description?.setValue(this.pointOfInterest.description);
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) return;

    this.actionLoading = true;
    const name = this.name?.value;
    const description = this.description?.value;
    this.cityService
      .updatePointOfInterest(this.cityId, {
        id: this.pointOfInterest.id,
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
