import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { RegistryService } from '@app/modules/registry/services/registry.service';

// primeng
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-pre-registry',
  standalone: true,
  imports: [ReactiveFormsModule, InputTextModule, ButtonModule, RippleModule],
  templateUrl: './pre-registry.component.html',
  styleUrl: './pre-registry.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PreRegistryComponent {
  // Services
  private registryService = inject(RegistryService);
  private nnfb = inject(NonNullableFormBuilder);

  // Variables
  emailControl = this.nnfb.control<string>('', [
    Validators.required,
    Validators.pattern(/^[^@]+@devtalles\.com$/),
  ]);

  get errorMail(): string {
    if (this.emailControl.hasError('required')) {
      return 'El correo electrónico es requerido';
    }

    if (this.emailControl.hasError('pattern')) {
      return 'El correo electrónico debe contener el dominio "@devtalles.com"';
    }

    return '';
  }

  registry() {
    if (this.emailControl.invalid) return this.emailControl.markAllAsTouched();

    this.registryService.preRegistry(this.emailControl.value).subscribe();
  }
}
