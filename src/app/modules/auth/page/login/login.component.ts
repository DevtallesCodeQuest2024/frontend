import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

//interfaces
import { ILogin } from "@app/core/models/auth";

//services
import { AuthService } from '@app/core/auth/auth.service';

// components prime
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';

// services prime
import { RouterLink } from "@angular/router";

type controlType = 'email' | 'password';

const primeComponents = [
  InputTextModule,
  ButtonModule,
  PasswordModule,
  DividerModule,
  ToastModule,
  RippleModule
];

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, ...primeComponents],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LoginComponent {
  // Services
  private authService = inject(AuthService);
  private nnfb = inject(NonNullableFormBuilder);

  loginForm = this.nnfb.group({
    email: this.nnfb.control<string>('', [Validators.required]),
    password: this.nnfb.control<string>('', [Validators.required]),
  });

  inputValid(control: controlType): boolean {
    return (
      !!this.loginForm.get(control)?.invalid &&
      !!this.loginForm.get(control)?.touched
    );
  }

  login() {
    if (this.loginForm.invalid) return this.loginForm.markAllAsTouched();

    this.authService.login(this.loginForm.value as ILogin).subscribe();
  }
}
