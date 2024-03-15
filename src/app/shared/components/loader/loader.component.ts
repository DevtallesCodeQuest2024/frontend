import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [],
  template: `
    <div class="container__spinner">
      <div class="spinner"></div>
    </div>
  `,
  styleUrl: './loader.component.scss',
})
export class LoaderComponent  implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    document.querySelector("body")!.style.overflow = "unset"
  }

  ngOnInit(): void {
    document.querySelector("body")!.style.overflow = "hidden"
  }
}
