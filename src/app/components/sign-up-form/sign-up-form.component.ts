import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, first, takeUntil } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.css'],
})
export class SignUpFormComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  loading = false;
  submitted = false;
  errorMessage?: string;
  stop$ = new Subject<void>();

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly userService: UserService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  get username() {
    return this.form.get('username');
  }
  get password() {
    return this.form.get('password');
  }
  get confirmPassword() {
    return this.form.get('confirmPassword');
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        username: ['', Validators.required],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      {
        validator: this.passwordsMatch('password', 'confirmPassword'),
      }
    );
  }

  passwordsMatch(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
      const passwordInput = group.controls[passwordKey];
      const passwordConfirmationInput = group.controls[passwordConfirmationKey];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({ passwordMismatch: true });
      } else {
        return passwordConfirmationInput.setErrors(null);
      }
    };
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) return;

    this.loading = true;
    this.userService
      .signUp(this.username?.value, this.password?.value)
      .pipe(takeUntil(this.stop$), first())
      .subscribe({
        next: () => {
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] ?? '';
          this.router.navigateByUrl(returnUrl);
        },
        error: err => {
          this.errorMessage = this.getErrorFromServerResponse(err.error);
          this.loading = false;
        },
      });
  }

  getErrorFromServerResponse(error: { code: number; message: string }): string {
    let message = '';

    if (error.code === 1) {
      message =
        'La contraseña debe contener al menos una minúscula, una mayúscula, un dígito y un carácter especial. Su tamaño debe estar comprendido entre 6 y 10 caracteres.';
    } else if (error.code === 2) {
      message = 'El nombre de usuario se encuentra en uso.';
    } else {
      message = error.message;
    }

    return message;
  }

  ngOnDestroy(): void {
    this.stop$.next();
    this.stop$.complete();
  }
}
