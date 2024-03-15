import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private activeRequests = 0;
  isActive = signal<boolean>(false);

  show(): void {
    if (this.activeRequests === 0) {
      this.isActive.set(true);
    }
    this.activeRequests++;
  }

  hide(): void {
    this.activeRequests--;
    if (this.activeRequests === 0) {
      this.isActive.set(false);
    }
  }
}
