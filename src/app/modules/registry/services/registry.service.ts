import { Injectable, inject } from '@angular/core';
import { RegistryApiService } from '@app/core/api/registry-api.service';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { IResponse } from "@app/core/models/apiResponse";
import { getFirstMessageOfError } from "@app/shared/utils/message-values";

@Injectable()
export class RegistryService {
  private registryApiService = inject(RegistryApiService);

  preRegistry(email: string): Observable<IResponse> {
    return this.registryApiService.preRegistry(email).pipe(
      tap((response) => {
        return response;
      }),
      catchError(({ error }) => {
        return throwError( () => getFirstMessageOfError(error.message));
      })
    );
  }

  verifyToken(token: string): Observable<IResponse> {
    return this.registryApiService.verifyToken(token).pipe(
      tap((response) => {
        return response;
      }),
      catchError(( error ) => {
        return throwError( () => getFirstMessageOfError(error));
      })
    );
  }

  registry(dataRegistry: {password: string}, token: string): Observable<IResponse> {
    return this.registryApiService.registry(dataRegistry, token).pipe(
      tap((response) => {
        return response;
      }),
      catchError(( error ) => {
        return throwError( () => getFirstMessageOfError(error));
      })
    );
  }
}
