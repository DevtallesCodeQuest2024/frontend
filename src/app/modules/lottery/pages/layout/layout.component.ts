import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '@app/shared/components/header/header.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [HeaderComponent, RouterOutlet],
  template: `
    <app-header />
    <main>
      <router-outlet />
    </main>
  `,
  styleUrl: './layout.component.scss',
})
export default class LayoutComponent {}
