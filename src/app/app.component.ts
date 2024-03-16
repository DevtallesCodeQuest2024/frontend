import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { PrimeNGConfig } from 'primeng/api';
import { LoaderComponent } from '@app/shared/components/loader/loader.component';
import { LoaderService } from '@app/core/services/loader.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoaderComponent, ToastModule, ConfirmDialogModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private primengConfig = inject(PrimeNGConfig);
  public loaderService = inject(LoaderService);

  constructor() {
    this.primengConfig.ripple = true;
  }
}
