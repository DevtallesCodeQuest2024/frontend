import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RegistryService } from '@app/modules/registry/services/registry.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [],
  providers: [RegistryService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  changeDetection: ChangeDetectionStrategy.Default,
})
export default class RegisterComponent {
  private registryService = inject(RegistryService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  public token: string | null = null;

  constructor() {
    this.token = this.route.snapshot.queryParamMap.get('token');

    if (this.token) {
      this.verifyToken();
    } else {
      this.router.navigate(['/']);
    }
  }

  verifyToken() {
    this.registryService.verifyToken(this.token!).subscribe({
      next: (response) => {
        localStorage.setItem('token', this.token!)
        return this.router.navigate(['/sorteos']);
      },
      error: (error) => {
        return this.router.navigate(['/']);
      },
    });
  }
}
