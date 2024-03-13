import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-not-found-page',
  standalone: true,
  imports: [NgOptimizedImage, RouterLink, ButtonModule],
  templateUrl: './not-found-page.component.html',
  styles: ``,
})
export default class NotFoundPageComponent {}
