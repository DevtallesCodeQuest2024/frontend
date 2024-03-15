import {Component, ChangeDetectorRef, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ButtonModule} from "primeng/button";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule, ValidationErrors,
  Validators
} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {RippleModule} from "primeng/ripple";
import {RegistryService} from "@app/modules/registry/services/registry.service";
import {MessageService} from "primeng/api";
import {NgIf, NgStyle} from "@angular/common";

@Component({
  selector: 'app-verify',
  standalone: true,
  imports: [
    ButtonModule,
    FormsModule,
    InputTextModule,
    RippleModule,
    ReactiveFormsModule,
    NgStyle,
    NgIf
  ],
  templateUrl: './verify.component.html',
  styleUrl: './verify.component.scss'
})
export default class VerifyComponent implements OnInit {

  tokenSendByEmail: string | null = null;
  userEmail: string | null = null;
  isButtonDisabled: boolean = false;

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private registryService = inject(RegistryService);
  private messageService = inject(MessageService);
  private cdr = inject(ChangeDetectorRef);
  private fb = inject(FormBuilder);

  myForm: FormGroup = this.fb.group({
      emailControl: [{value: '', disabled: true}, [Validators.required]],
      passwordControl: ['', [Validators.required, Validators.minLength(8)]],
      passwordRepeatControl: ['', [Validators.required]],
    },
    {
      validators: [ this.isFieldOneEqualToFieldTwo('passwordControl', 'passwordRepeatControl') ]
    });

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const tokenFromQuery = params['token'];

      if (!tokenFromQuery) {
        this.router.navigate(['/admin']);
      }

      this.tokenSendByEmail = tokenFromQuery;
      this.verifyToken(tokenFromQuery);

    });
  }

  verifyToken(token: string) {
    this.registryService.verifyToken(token).subscribe(
      {
        next: (response) => {
          this.userEmail = response.data.email;
          this.myForm.controls['emailControl'].setValue(response.data.email);
          this.cdr.markForCheck();

          this.messageService.add({
            key: 'toast',
            severity: 'success',
            summary: 'Token verificado!',
            detail: 'Continue con el registro',
          });

        },
        error: (error) => {
          setTimeout(() => {
            this.router.navigate(['/admin/registro']);
          }, 600);
          return error;
        },
      }
    );
  }

  onSubmit() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    const { passwordControl } = this.myForm.value;

    const body: {password: string} = {
      password: passwordControl,
    }

    this.registerUser(body, this.tokenSendByEmail!);
  }

  registerUser(body: {password: string}, tokenFromQuery: string) {
    this.registryService.registry(body, tokenFromQuery).subscribe(
      {
        next: (response) => {
          this.messageService.add({
            key: 'toast',
            severity: 'success',
            summary: 'Usuario registrado exitosamente!',
            detail: response.message,
          });

          setTimeout(() => {
            this.router.navigate(['/admin']);
          }, 600);
        },
        error: (error) => {
          return error;
        },
      }
    );
  }

  isFieldOneEqualToFieldTwo(field1: string, field2: string) {

    return ( formGroup: AbstractControl ): ValidationErrors | null => {
      const pass1 = formGroup.get(field1)?.value;
      const pass2 = formGroup.get(field2)?.value;

      if ( pass1 !== pass2 ) {
        formGroup.get(field2)?.setErrors({ noEqual: true });
        return { noEqual: true };
      }

      formGroup.get(field2)?.setErrors(null);
      return null;
    }
  }

  isValidField(myForm: FormGroup, field: string): boolean | null {
    return myForm.controls[field].errors && myForm.controls[field].touched;
  }

  getFieldError(myForm: FormGroup, field: string): string | null {

    if ( !myForm.controls[field] ) return null;

    const errors = myForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `Este campo debe tener al menos ${errors['minlength'].requiredLength} caracteres`;
        case 'min':
          return 'El valor mínimo es 0';
        case 'pattern':
          return field === 'email' ? 'Ingrese un email válido' : 'El campo no es válido';
        case 'noEqual':
          return 'Las contraseñas no coinciden';
        default:
          return 'Error desconocido';
      }
    }

    return null;
  }

}


