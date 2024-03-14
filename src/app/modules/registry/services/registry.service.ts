import { Injectable, inject } from '@angular/core';
import { RegistryApiService } from '@app/core/api/registry-api.service';
import { IRegistry } from '@app/core/models/registry';
import { MessageService } from 'primeng/api';
import { EMPTY, Observable, switchMap, tap } from 'rxjs';

@Injectable()
export class RegistryService {
  private messageService = inject(MessageService);
  private registryApiService = inject(RegistryApiService);

  preRegistry(email: string): Observable<void> {
    return this.registryApiService.preRegistry(email).pipe(
      tap((response) => {
        /* this.messageService.add({
          key: 'toast',
          severity: 'success',
          summary: 'Listo!',
          detail: response.message,
        }); */
      }),
      switchMap(() => EMPTY)
    );
  }

  registry(dataRegistry: IRegistry): Observable<void> {
    return this.registryApiService.registry(dataRegistry).pipe(
      tap((response) => {
        this.messageService.add({
          key: 'toast',
          severity: 'success',
          summary: 'Listo!',
          detail: response.message,
        });
      }),
      switchMap(() => EMPTY)
    );
  }
}
