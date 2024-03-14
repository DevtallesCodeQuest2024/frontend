import { Injectable, inject } from '@angular/core';
import { RegistryApiService } from '@app/core/api/registry-api.service';
import { IRegistry } from '@app/core/models/registry';
import { MessageService } from 'primeng/api';
import { catchError, EMPTY, Observable, switchMap, tap, throwError } from 'rxjs';
import { IResponse } from "@app/core/models/apiResponse";
import { getFirstMessageOfError } from "@app/shared/utils/message-values";

@Injectable()
export class RegistryService {
  private messageService = inject(MessageService);
  private registryApiService = inject(RegistryApiService);

  preRegistry(email: string): Observable<IResponse> {
    return this.registryApiService.preRegistry(email).pipe(
      tap((response) => {
        return response;
      }),
      catchError(({ error }) => {
        return throwError( () => getFirstMessageOfError(error.messages));
      })
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
