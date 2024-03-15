import {ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
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
import {MessageService} from "primeng/api";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-pre-registry',
  standalone: true,
  imports: [ReactiveFormsModule, InputTextModule, ButtonModule, RippleModule, RouterLink],
  templateUrl: './pre-registry.component.html',
  styleUrl: './pre-registry.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PreRegistryComponent {

  isButtonDisabled: boolean = false;
  wasSubmittedEmail: boolean = false;

  // Services
  private registryService = inject(RegistryService);
  private nnfb = inject(NonNullableFormBuilder);
  private messageService = inject(MessageService);
  private cdr = inject(ChangeDetectorRef);

  // Variables
  emailControl = this.nnfb.control<string>('', [
    Validators.required,
    // Validators.pattern(/^[^@]+@devtalles\.com$/),
    Validators.pattern(/^[^@]+@gmail\.com$/),
  ]);

  get errorMail(): string {
    if (this.emailControl.hasError('required')) {
      this.isButtonDisabled = false;
      return 'El correo electrónico es requerido';
    }

    if (this.emailControl.hasError('pattern')) {
      this.isButtonDisabled = false;
      return 'El correo electrónico debe contener el dominio "@devtalles.com"';
    }

    return '';
  }

  preRegistry() {
    this.isButtonDisabled = true;

    if (this.emailControl.invalid) {
      this.isButtonDisabled = false;
      return this.emailControl.markAllAsTouched()
    }

    this.registryService.preRegistry(this.emailControl.value).subscribe(
      {
        next: (response) => {

          this.wasSubmittedEmail = true;
          this.isButtonDisabled = false;
          this.cdr.markForCheck();

          this.messageService.add({
            key: 'toast',
            severity: 'success',
            summary: 'Pre-registro listo!',
            detail: "Revisa tu correo electrónico para continuar con el registro. Puede cerrar esta ventana.",
          });

        },
        error: (error) => {
          this.isButtonDisabled = false;
          this.cdr.markForCheck();
          return error;
        },
      }
    );
  }
}
